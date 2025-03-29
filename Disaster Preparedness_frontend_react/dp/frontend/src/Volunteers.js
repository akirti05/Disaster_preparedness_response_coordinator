import React, { useEffect, useState } from 'react';
import './Volunteer.css'; // Import the CSS file

function Volunteers() {
    const [volunteerName, setVolunteerName] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [showVolunteers, setShowVolunteers] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch volunteers from the backend
        fetch('http://localhost:8080/api/volunteers')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setVolunteers(data))
            .catch(error => {
                console.error('Error fetching volunteers:', error);
                setError('Failed to fetch volunteers. Please check the console for more details.');
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newVolunteer = { name: volunteerName };

        fetch('http://localhost:8080/api/volunteers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVolunteer),
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
            setVolunteers([...volunteers, data]);
            setVolunteerName('');
            setMessage('Volunteer added!');
            setError('');
        })
        .catch(error => {
            console.error('Error adding volunteer:', error);
            setMessage('');
            setError(`Failed to add volunteer: ${error.message}`);
        });
    };

    const handleListVolunteers = () => {
        setShowVolunteers(prevState => !prevState);
        setMessage(showVolunteers ? 'Volunteer list hidden' : 'Displaying volunteer list');
    };

    return (
        <div>
            <h1>Volunteers</h1>
            <form className="volunteer-form" onSubmit={handleSubmit}>
                <div>
                    <label>
                        Volunteer Name:
                        <input
                            type="text"
                            value={volunteerName}
                            onChange={(e) => setVolunteerName(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" disabled={!volunteerName}>Add Volunteer</button>
            </form>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <button className="list-volunteers-button" onClick={handleListVolunteers}>
                {showVolunteers ? 'Hide Volunteers' : 'List Volunteers'}
            </button>
            {showVolunteers && (
                <div>
                    <h2>Volunteer List</h2>
                    <ul className="volunteer-list">
                        {volunteers.map((volunteer) => (
                            <li key={volunteer.id}>
                                ID {volunteer.id}: {volunteer.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Volunteers;
