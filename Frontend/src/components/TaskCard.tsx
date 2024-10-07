import React from 'react';
import { Task } from '../Types/task';
import { useAppDispatch } from '../redux/hooks';
import { updateTask } from '../redux/slices/taskSlice';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { toast } from 'react-toastify'; // Import toast

interface TaskCardProps {
    task: Task;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
    const dispatch = useAppDispatch();

    const handleToggleComplete = () => {
        if (task.id !== undefined) {
            const updatedTask = { ...task, isCompleted: !task.isCompleted };
            dispatch(updateTask({ id: task.id, taskData: updatedTask }));

            // Show toast notification based on task completion state
            if (updatedTask.isCompleted) {
                toast.success('Task completed successfully!'); // Completed notification
            } else {
                toast.error('Task not completed.'); // Incomplete notification
            }
        } else {
            console.error("Task ID is undefined.");
        }
    };

    const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        handleToggleComplete();
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                height: 300,
                position: 'relative',
                border: '1px solid lightgray',
                borderRadius: 3,
                padding: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
            onClick={onClick}
            className="task-card"
        >
            <CardContent>
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        border: 1,
                        padding: '4px 8px',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: 'white',
                        borderTopLeftRadius: 8,
                        color: '#3b82f6',
                        fontWeight: 500,
                    }}
                >
                    {task.category}
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#1e293b',
                        marginBottom: 1,
                    }}
                >
                    {task.title}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: '#64748b',
                        marginBottom: 2,
                    }}
                >
                    {task.description}
                </Typography>
            </CardContent>

            {task.dueDate && (
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        fontSize: '0.5rem',
                        color: '#475569',
                    }}
                >
                    Date: {formatDate(task.dueDate)}
                </Typography>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                    onClick={handleIconClick}
                    sx={{
                        color: task.isCompleted ? 'green' : 'red',
                        transition: 'color 0.3s ease',
                        '&:hover': {
                            color: task.isCompleted ? 'darkgreen' : 'darkred',
                        },
                    }}
                    title={
                        task.isCompleted
                            ? 'Click to mark as incomplete'
                            : 'Click to mark as complete'
                    }
                >
                    {task.isCompleted ? (
                        <CheckCircle />
                    ) : (
                        <Cancel />
                    )}
                </IconButton>
            </Box>
        </Card>
    );
};

export default TaskCard;
