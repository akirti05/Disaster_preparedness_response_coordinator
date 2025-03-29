import React, { createContext, useContext, useState } from 'react';
import './Tasks.css'; // Import the CSS file

// Create a context
export const TasksContext = createContext();

// Create a provider component
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { description: 'Distribute supplies', volunteerId: 1, status: 'In Progress' },
        { description: 'Setup emergency shelter', volunteerId: 2, status: 'Done' },
        { description: 'Assist with first aid', volunteerId: 1, status: 'In Progress' }
    ]);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

// Tasks Component
function Tasks() {
    const { tasks, setTasks } = useContext(TasksContext); // Use the context
    const [description, setDescription] = useState('');
    const [volunteerId, setVolunteerId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // List of pre-assigned descriptions
    const predefinedDescriptions = [
        'Distribute supplies',
        'Setup emergency shelter',
        'Assist with first aid',
        'Clean up debris',
        'Manage communication'
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(''); // Reset error message on submit

        // Validate inputs
        if (!description || !volunteerId) {
            setErrorMessage('Please enter the necessary details.');
            return;
        }

        if (!predefinedDescriptions.includes(description)) {
            setErrorMessage('Please select a valid task description.');
            return;
        }

        const newTask = { description, volunteerId: parseInt(volunteerId) };

        // Check if a task with the same volunteerId already exists and is not done
        const existingTask = tasks.find(task => task.volunteerId === newTask.volunteerId && task.status !== 'Done');
        if (existingTask) {
            setErrorMessage('Only one task can be assigned to one ID at a time until their work is done.');
            return;
        }

        setTasks([...tasks, newTask]);
        setDescription('');
        setVolunteerId('');
    };

    return (
        <div className="tasks-page">
            <div className="task-description">
                <h1>Tasks</h1>
                <p>
                    Managing tasks effectively ensures that each volunteer knows their responsibilities and can perform their duties efficiently during a disaster. This helps in the organized and timely execution of tasks.
                </p>
            </div>
            <div className="task-form-container">
                <form className="task-form" onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Description:
                            <select
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                                <option value="">Select Description</option>
                                {predefinedDescriptions.map((desc, index) => (
                                    <option key={index} value={desc}>{desc}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Volunteer ID:
                            <input
                                type="number"
                                value={volunteerId}
                                onChange={(e) => setVolunteerId(e.target.value)}
                            />
                        </label>
                    </div>
                    <button type="submit">Add Task</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default Tasks;
