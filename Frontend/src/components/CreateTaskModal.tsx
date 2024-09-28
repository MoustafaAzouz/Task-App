import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { createTask } from '../redux/slices/taskSlice';
import { Task } from '../Types/task';

const CreateTaskModal: React.FC<{ onClose: () => void; isOpen: boolean; username: string }> = ({ onClose, isOpen, username }) => {
    const dispatch = useAppDispatch();

    const [taskData, setTaskData] = useState<Task>({
        title: '',
        description: '',
        category: 'personal',
        isCompleted: false,
        userName: username,
        dueDate: '' 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskData.title && taskData.description && taskData.category) {
            await dispatch(createTask(taskData));
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-blue-500">Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={taskData.title}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            value={taskData.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={taskData.category}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        >
                             <option value="personal">Personal</option>
                             <option value="work">Work</option>
                             <option value="shopping">Shopping</option>
                             <option value="health">Health</option>
                             <option value="fitness">Fitness</option>
                              <option value="education">Education</option>
                              <option value="finance">Finance</option>
                              <option value="travel">Travel</option>
                             <option value="family">Family</option>
                             <option value="home">Home</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={taskData.dueDate}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-slate-800 p-2 rounded">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
