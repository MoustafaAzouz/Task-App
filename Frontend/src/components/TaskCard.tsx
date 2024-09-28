import React from 'react';
import { Task } from '../Types/task';
import { useAppDispatch } from '../redux/hooks';
import { updateTask } from '../redux/slices/taskSlice';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

interface TaskCardProps {
    task: Task;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void; 
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
    const dispatch = useAppDispatch();

    const handleToggleComplete = () => {
        if (task.id !== undefined) {
            const updatedTask = { ...task, isCompleted: !task.isCompleted };
            console.log(task.dueDate);

            dispatch(updateTask({ id: task.id, taskData: updatedTask }));
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
            }} 
            onClick={onClick}
            className="task-card"
        >
            <CardContent>
                <Typography variant="body2" sx={{
                     position: 'absolute', top: 0, left: 0,  border: 1, 
                    padding: 0.5, 
                    borderColor: 'gray',
                    borderTopLeftRadius: 8,  
                   }}>
                    {task.category} 
                </Typography>
                <Typography variant="h5"  align="center">
                    {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" >
                    {task.description}
                </Typography>
                <Typography variant="body2" align="center"     sx={{
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                }} >
                    {task.isCompleted ? 'Completed' : 'Not Completed'}
                </Typography>
            </CardContent>

            {task.dueDate && (
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        fontSize: '0.75rem',                    }}
                >
                    Date: {formatDate(task.dueDate)}
                </Typography>
            )}

            <IconButton
                onClick={handleIconClick} 
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,

                    color: task.isCompleted ? 'green' : 'red',
                }}
                title={task.isCompleted ? 'Click to mark as incomplete' : 'Click to mark as complete'}
            >
                {task.isCompleted ? (
                    <CheckCircle />
                ) : (
                    <Cancel />
                )}
            </IconButton>
        </Card>
    );
};

export default TaskCard;
