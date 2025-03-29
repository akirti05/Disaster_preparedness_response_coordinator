import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext';
import Communications from './Communications';
import EmergencyScenarios from './EmergencyScenarios';
import Home from './Home';
import Members from './Members';
import PrivateRoute from './PrivateRoute';
import Resources from './Resources';
import RiskAssessment from './RiskAssessment';
import SignUpLoginPage from './SignUpLoginPage';
import Tasks, { TasksProvider } from './Tasks';
import Volunteers from './Volunteers';

function App() {
    return (
        <AuthProvider>
            <Router>
                <TasksProvider> {/* Wrap the Routes component with TasksProvider */}
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<SignUpLoginPage />} />
                            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                            <Route path="/risk-assessment" element={<PrivateRoute element={<RiskAssessment />} />} />
                            <Route path="/resources" element={<PrivateRoute element={<Resources />} />} />
                            <Route path="/volunteers" element={<PrivateRoute element={<Volunteers />} />} />
                            <Route path="/tasks" element={<PrivateRoute element={<Tasks />} />} />
                            <Route path="/communications" element={<PrivateRoute element={<Communications />} />} />
                            <Route path="/emergency-scenarios" element={<PrivateRoute element={<EmergencyScenarios />} />} />
                            <Route path="/members" element={<PrivateRoute element={<Members />} />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </TasksProvider>
            </Router>
        </AuthProvider>
    );
}

export default App;
