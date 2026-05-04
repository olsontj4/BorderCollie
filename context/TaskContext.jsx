import { createContext, useState } from 'react';

// Create the context
export const TaskContext = createContext();

// Context provider component
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([
        {
            id: '1',
            name: 'Design Mockups',
            timerLength: 25,
            checkInFrequency: 5,
            contact: 'john@example.com',
            progress: 45,
            isActive: false,
        },
        {
            id: '2',
            name: 'Write Documentation',
            timerLength: 15,
            checkInFrequency: 3,
            contact: null,
            progress: 20,
            isActive: false,
        },
    ]);

    // Add a new task
    const addTask = (taskData) => {
        const newTask = {
            id: Date.now().toString(),
            ...taskData,
            progress: 0,
            isActive: false,
        };
        setTasks([...tasks, newTask]);
    };

    // Update an existing task
    const updateTask = (id, updates) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
    };

    // Delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // Get a single task by ID
    const getTask = (id) => {
        return tasks.find(task => task.id === id);
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTask }}>
            {children}
        </TaskContext.Provider>
    );
}