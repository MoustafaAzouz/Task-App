import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks'; 
import { fetchTasksByCategory } from '../redux/slices/taskSlice';
import jwtDecode from 'jwt-decode';

const SearchCategory: React.FC = () => {
    const dispatch = useAppDispatch(); 
    const [category, setCategory] = useState('');
    const [userId, setUserId] = useState<number | null>(null); 

    const handleSearch = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<{ id: number }>(token); 
                setUserId(decodedToken.id); 
                dispatch(fetchTasksByCategory({ category, userId: decodedToken.id })); 
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('No token found');
        }
    };

    return (
        <div className="search-category mb-4">
            <input
                type="text"
                placeholder="Enter category..."
                value={category}
                onChange={(e) => setCategory(e.target.value)} 
                className="border rounded p-2"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white py-2 px-4 rounded shadow-md ml-2"
            >
                Search
            </button>
        </div>
    );
};

export default SearchCategory;
