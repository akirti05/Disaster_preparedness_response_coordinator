import React, { useEffect, useState } from 'react';

function RiskAssessmentForm() {
    const [riskTypes, setRiskTypes] = useState([]);
    const [selectedRiskType, setSelectedRiskType] = useState('');
    const [riskLevel, setRiskLevel] = useState('');
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showAssessments, setShowAssessments] = useState(false);

    useEffect(() => {
        // Fetch available risk types
        fetch('http://localhost:8080/api/risk')
            .then(response => response.json())
            .then(data => setRiskTypes(data))
            .catch(error => {
                console.error('Error fetching risk types:', error);
                setError('Failed to fetch risk types. Please check the console for more details.');
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!selectedRiskType || !riskLevel) {
            setError('Please provide both risk type and risk level.');
            return;
        }

        const newAssessment = { 
            predefinedRisk: { type: selectedRiskType }, 
            riskLevel: parseInt(riskLevel) 
        };

        fetch('http://localhost:8080/api/risk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAssessment),
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`HTTP error! status: ${response.status}, ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            setAssessments([...assessments, data]);
            setSelectedRiskType('');
            setRiskLevel('');
            setError('');
            setSuccess('Risk assessment added successfully.');
        })
        .catch(error => {
            console.error('Error adding risk assessment:', error);
            setError(`Failed to add risk assessment: ${error.message}`);
        });
    };

    const fetchAssessments = () => {
        // Fetch existing risk assessments
        fetch('http://localhost:8080/api/risk/assessments')
            .then(response => response.json())
            .then(data => setAssessments(data))
            .catch(error => {
                console.error('Error fetching risk assessments:', error);
                setError('Failed to fetch risk assessments. Please check the console for more details.');
            });
    };

    const toggleAssessments = () => {
        if (showAssessments) {
            // If currently showing assessments, just hide them
            setShowAssessments(false);
        } else {
            // If currently not showing, fetch and show assessments
            fetchAssessments();
            setShowAssessments(true);
        }
    };

    return (
        <div>
            <h1>Risk Assessment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Risk Type:
                        <select
                            value={selectedRiskType}
                            onChange={(e) => setSelectedRiskType(e.target.value)}
                        >
                            <option value="">Select Risk Type</option>
                            {riskTypes.map(risk => (
                                <option key={risk.type} value={risk.type}>{risk.type}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Risk Level:
                        <input
                            type="number"
                            value={riskLevel}
                            onChange={(e) => setRiskLevel(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Risk Assessment</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
            <button onClick={toggleAssessments}>
                {showAssessments ? 'Hide Existing Risk Assessments' : 'Show Existing Risk Assessments'}
            </button>
            {showAssessments && (
                <div>
                    <h2>Existing Risk Assessments</h2>
                    <ul>
                        {assessments.map((assessment) => (
                            <li key={assessment.id}>
                                Risk Type: {assessment.predefinedRisk.type}, Risk Level: {assessment.riskLevel}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default RiskAssessmentForm;
