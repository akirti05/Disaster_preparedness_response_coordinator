import React, { useEffect, useState } from 'react';
import './EmergencyScenarios.css'; // Import the CSS file

function EmergencyScenarios() {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [scenarios, setScenarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/emergency-scenarios')
            .then(response => response.json())
            .then(data => setScenarios(data))
            .catch(error => console.error('Error fetching scenarios:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newScenario = { type, description };

        fetch('http://localhost:8080/api/emergency-scenarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newScenario),
        })
        .then(response => response.json())
        .then(data => {
            setScenarios([...scenarios, data]);
            setType('');
            setDescription('');
        })
        .catch(error => console.error('Error adding scenario:', error));
    };

    return (
        <div className="emergency-scenarios-page">
            <div className="emergency-scenarios-description">
                <h1>Emergency Scenarios</h1>
                <p>
                    Documenting different emergency scenarios helps in preparing effective response plans and ensures that the team is ready for various types of emergencies.
                </p>
            </div>
            <div className="emergency-scenarios-form-container">
                <form className="emergency-scenarios-form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Type:
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">Add Scenario</button>
                </form>
                <ul className="emergency-scenarios-list">
                    {scenarios.map((scenario, index) => (
                        <li key={index}>
                            Type: {scenario.type}, Description: {scenario.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EmergencyScenarios;
