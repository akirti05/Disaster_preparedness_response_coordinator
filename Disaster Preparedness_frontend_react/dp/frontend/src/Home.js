import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file for styling

function Home() {
    useEffect(() => {
        console.log('Home component has been rendered');

        return () => {
            console.log('Home component is being unmounted');
        };
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to Disaster Preparedness and Response Coordinator</h1>
                <p>Your one-stop solution for managing risks, resources, and volunteers during disasters.</p>
                {console.log('Rendering header')}
            </header>
            <nav className="home-nav">
                <ul>
                    <li><Link to="/risk-assessment">Risk Assessment</Link></li>
                    <li><Link to="/resources">Resources</Link></li>
                    <li><Link to="/volunteers">Volunteers</Link></li>
                    <li><Link to="/tasks">Tasks</Link></li>
                    <li><Link to="/communications">Communications</Link></li>
                    <li><Link to="/emergency-scenarios">Emergency Scenarios</Link></li>
                    <li><Link to="/members">Members</Link></li>
                </ul>
                {console.log('Rendering navigation')}
            </nav>
            <section className="home-content">
                <img src="https://www.shutterstock.com/image-photo/concept-emergency-preparedness-planbusinessman-touching-600nw-2296161259.jpg" alt="Disaster Management" className="home-image" />
                <p>Our platform helps you to:</p>
                <ul>
                    <li>Assess and manage risks associated with various types of disasters.</li>
                    <li>Keep track of available resources and manage inventory efficiently.</li>
                    <li>Register and coordinate volunteers for disaster response tasks.</li>
                </ul>
                {console.log('Rendering content section')}
            </section>
            <footer className="home-footer">
                <p>&copy; 2024 Disaster Preparedness and Response Coordinator. All rights reserved.</p>
                {console.log('Rendering footer')}
            </footer>
        </div>
    );
}

export default Home;
