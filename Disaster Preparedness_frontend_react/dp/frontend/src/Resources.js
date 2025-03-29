import React, { useEffect, useState } from 'react';

function Resources() {
    const [resourceName, setResourceName] = useState('');
    const [resourceQuantity, setResourceQuantity] = useState('');
    const [resources, setResources] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/resources')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setResources(data))
            .catch(error => {
                console.error('Error fetching resources:', error);
                setError('Failed to fetch resources. Please check the console for more details.');
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!resourceName || !resourceQuantity) {
            setError('Please provide both resource name and quantity.');
            return;
        }

        const newResource = { name: resourceName, quantity: resourceQuantity };

        fetch('http://localhost:8080/api/resources', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newResource),
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
            setResources([...resources, data]);
            setResourceName('');
            setResourceQuantity('');
            setError('');
        })
        .catch(error => {
            console.error('Error adding resource:', error);
            setError(`Failed to add resource: ${error.message}`);
        });
    };

    return (
        <div>
            <h1>Resources</h1>
            <p>
                Resources are essential for managing and mitigating the impacts of disasters. They include items such as first aid kits, water, food, shelter materials, and medical supplies. Proper resource management ensures that we are prepared for emergencies, reduces response times, and supports recovery efforts.
            </p>
            <p>
                <strong>Benefits of Effective Resource Management:</strong>
                <ul>
                    <li><strong>Ensures Readiness:</strong> Properly managed resources allow us to respond effectively to various disaster scenarios.</li>
                    <li><strong>Reduces Response Time:</strong> Quick access to resources can significantly improve response times, saving lives and minimizing damage.</li>
                    <li><strong>Optimizes Utilization:</strong> Tracking and utilizing resources efficiently reduces waste and ensures resources are used where needed most.</li>
                    <li><strong>Facilitates Coordination:</strong> Knowing what resources are available helps in better coordination among response teams and agencies.</li>
                    <li><strong>Supports Recovery Efforts:</strong> Resources play a critical role in rebuilding and restoring normalcy after a disaster.</li>
                </ul>
            </p>
            <p>
                <strong>Useful Websites for Accurate Information on Resources:</strong>
                <ul>
                    <li><a href="https://www.redcross.org" target="_blank" rel="noopener noreferrer">American Red Cross</a></li>
                    <li><a href="https://www.fema.gov" target="_blank" rel="noopener noreferrer">FEMA</a></li>
                    <li><a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer">Centers for Disease Control and Prevention (CDC)</a></li>
                    <li><a href="https://www.who.int" target="_blank" rel="noopener noreferrer">World Health Organization (WHO)</a></li>
                </ul>
            </p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Resource Name:
                        <input
                            type="text"
                            value={resourceName}
                            onChange={(e) => setResourceName(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Resource Quantity:
                        <input
                            type="text"
                            value={resourceQuantity}
                            onChange={(e) => setResourceQuantity(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">Add Resource</button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>{resource.name}: {resource.quantity}</li>
                ))}
            </ul>
        </div>
    );
}

export default Resources;
