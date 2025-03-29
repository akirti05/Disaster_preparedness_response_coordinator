import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Communications from './Communications'; // Import the Communications component
import EmergencyScenarios from './EmergencyScenarios';
import Home from './Home';
import Members from './Members'; // Import the Members component
import Resources from './Resources';
import RiskAssessment from './RiskAssessment';
import SignUpLoginPage from './SignUpLoginPage'; // Import SignUpLoginPage
import Tasks, { TasksProvider } from './Tasks'; // Import the Tasks component
import Volunteers from './Volunteers';

function App() {
    return (
        <Router>
            <TasksProvider>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<SignUpLoginPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/risk-assessment" element={<RiskAssessment />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/volunteers" element={<Volunteers />} />
                        <Route path="/tasks" element={<Tasks />} /> {/* Route for Tasks */}
                        <Route path="/communications" element={<Communications />} /> {/* Route for Communications */}
                        <Route path="/emergency-scenarios" element={<EmergencyScenarios />} /> {/* Route for Emergency Scenarios */}
                        <Route path="/members" element={<Members />} />
                        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for undefined routes */}
                    </Routes>
                </div>
            </TasksProvider>
        </Router>
    );
}

export default App;
