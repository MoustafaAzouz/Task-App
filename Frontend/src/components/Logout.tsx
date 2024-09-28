import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'; 

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/login');
    };

    return (
        <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleLogout} 
            startIcon={<LogoutIcon />} 
        >
            Logout
        </Button>
    );
};

export default Logout;
