import React, { useContext, useState } from 'react';
import './Members.css';
import { TasksContext } from './Tasks'; // Import the context

function Members() {
    const { tasks, setTasks } = useContext(TasksContext); // Use the context
    const [searchId, setSearchId] = useState('');
    const [assignedTasks, setAssignedTasks] = useState([]);
    const [completionMessage, setCompletionMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Added for error messages

    const handleSearch = () => {
        if (!searchId) {
            setErrorMessage('Please enter the necessary details.');
            setCompletionMessage('');
            return;
        }

        const parsedId = parseInt(searchId, 10);
        if (isNaN(parsedId)) {
            setErrorMessage('Invalid search ID.');
            setCompletionMessage('');
            return;
        }

        const tasksForVolunteer = tasks.filter(task => task.volunteerId === parsedId);
        // Default status to 'In Progress' if not assigned
        const tasksWithStatus = tasksForVolunteer.map(task => ({
            ...task,
            status: task.status || 'In Progress'
        }));
        setAssignedTasks(tasksWithStatus);
        setCompletionMessage(''); // Reset completion message on new search
        setErrorMessage(''); // Reset error message
        console.log('Tasks for volunteer ID', searchId, ':', tasksWithStatus);
    };

    const handleStatusChange = (index) => {
        if (assignedTasks[index].status === 'Done') {
            console.log('Task is already done.');
            return;
        }

        const updatedTasks = assignedTasks.map((task, i) =>
            i === index ? { ...task, status: 'Done' } : task
        );

        const updatedAllTasks = tasks.map(task =>
            updatedTasks.find(updatedTask => updatedTask.volunteerId === task.volunteerId && updatedTask.description === task.description) || task
        );

        setTasks(updatedAllTasks);
        setAssignedTasks(updatedTasks);
        setCompletionMessage('Thank you for completing your work!');
        setErrorMessage(''); // Reset error message
        console.log('Task updated:', updatedTasks[index]);
    };

    return (
        <div className="members-container">
            <h1>Members</h1>
            <p>
                Efficiently managing tasks ensures each member knows their responsibilities and can perform their duties effectively. This aids in organized and timely task execution.
            </p>
            <div className="search-container">
                <h2>Search Tasks</h2>
                <div>
                    <label>
                        Enter Volunteer ID:
                        <input
                            type="number"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                    </label>
                    <button onClick={handleSearch}>Search</button>
                </div>
                {completionMessage && <p className="message">{completionMessage}</p>}
                {errorMessage && <p className="error">{errorMessage}</p>}
                <ul>
                    {assignedTasks.map((task, index) => (
                        <li key={index}>
                            <p>Description: {task.description}</p>
                            <p>Status: {task.status || 'In Progress'}</p>
                            {task.status !== 'Done' && (
                                <button onClick={() => handleStatusChange(index)}>Mark as Done</button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Members;
