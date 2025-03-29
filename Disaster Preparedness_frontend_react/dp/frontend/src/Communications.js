import React, { useEffect, useState } from 'react';
import './Communications.css'; // Import the CSS file

function Communications() {
    const [message, setMessage] = useState('');
    const [communications, setCommunications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/communications')
            .then(response => response.json())
            .then(data => setCommunications(data))
            .catch(error => console.error('Error fetching communications:', error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMessage = { message, timestamp: new Date().toISOString() };

        fetch('http://localhost:8080/api/communications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMessage),
        })
        .then(response => response.json())
        .then(data => {
            setCommunications([...communications, data]);
            setMessage('');
        })
        .catch(error => console.error('Error adding message:', error));
    };

    return (
        <div className="communications-page">
            <div className="communications-description">
                <h1>Communications</h1>
                <p>
                    Keeping a record of communications during a disaster is crucial for coordination and ensuring that all relevant information is shared among team members.
                </p>
            </div>
            <div className="communications-form-container">
                <form className="communications-form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Message:
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">Add Message</button>
                </form>
                <ul className="communications-list">
                    {communications.map((communication) => (
                        <li key={communication.id}>
                            {new Date(communication.timestamp).toLocaleString()}: {communication.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Communications;
