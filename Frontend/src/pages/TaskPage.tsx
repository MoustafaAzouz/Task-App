import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchAllTasks } from '../redux/slices/taskSlice';
import TaskCard from '../components/TaskCard';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import CreateTaskModal from '../components/CreateTaskModal';
import SearchCategory from '../components/SearchCategory';
import { Box, Button, Typography, IconButton, Grid, Container } from '@mui/material'; // Added Container
import Logout from '../components/Logout'; 
import LinkedInIcon from '@mui/icons-material/LinkedIn'; 
import { ToastContainer } from 'react-toastify';

interface DecodedToken {
    id: number;
    name: string;
}

const TaskPage = () => {
    const dispatch = useAppDispatch();
    const { tasks } = useAppSelector((state) => state.tasks);
    const navigate = useNavigate(); 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(token);
                const userId = decodedToken.id;
                setUsername(decodedToken.name);
                dispatch(fetchAllTasks(userId));
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            console.error('No token found');
        }
    }, [dispatch]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).classList.contains('completion-box')) {
            
            e.preventDefault();

        }
    };

    const handleLinkedInClick = () => {
        navigate('/linkedin-profile'); 
    };

    return ( 



  
        <Container maxWidth="lg" sx={{ mx: 'auto', py: 2 }}> {/* Main container centered */}
            {/* Header box containing the title and buttons */}
            <Box 
                display="flex" 
                justifyContent="space-between" 
                alignItems="center" 
                mb={4} 
                px={2} 
                py={1} 
                sx={{ borderBottom: '1px solid lightgray' }} 
            >
                <Typography 
                    sx={{ color: 'rgba(59, 130, 246, var(--tw-bg-opacity))' }} 
                    variant="h4" 
                    component="h1" 
                >
                    Your Tasks
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <IconButton 
                        onClick={handleLinkedInClick} 
                        sx={{ mr: 2 }} 
                    >
                        <LinkedInIcon sx={{ color: '#0e76a8' }} /> 
                    </IconButton>

                    <Logout />
                </Box>
            </Box>

            <Box mb={4}>
                <SearchCategory />
            </Box>

            {/* Task Cards grid */}
            <Grid container spacing={3} justifyContent="center"> {/* Increased spacing */}
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id}>
                            <Link to={`/TaskDetail/${task.id}`} className="task-card-link">
                                <TaskCard task={task} onClick={handleCardClick} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography className="text-gray-600 text-center">
                            No tasks available
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {/* Create Task Modal */}
            {isModalOpen && (
                <CreateTaskModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    username={username}
                    
                />
            )}

            {/* Create Task Button */}
            <Button
                variant="contained"
                onClick={handleOpenModal}
                sx={{
                    position: 'fixed',
                    bottom: 20, 
                    right: 20,  
                    borderRadius: '50%', 
                    width: 50,  
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(59, 130, 246)', 
                    color: 'white', 
                }}
            >
                Add
            </Button>

            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar 
                newestOnTop 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
            />
        </Container>
    );
};

export default TaskPage;
