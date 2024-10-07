import  { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks'; 
import { fetchTaskById, deleteTask, updateTask } from '../redux/slices/taskSlice'; 
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../Types/task';
import { Typography } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedTask, loading, error } = useAppSelector(state => state.tasks);
  const [updatedData, setUpdatedData] = useState<Partial<Task>>({});

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskById(Number(id))); 
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    if (updatedData.title || updatedData.description || updatedData.category) {
      dispatch(updateTask({ id: Number(id), taskData: updatedData }));
      toast.success("Task updated successfully!"); 
    } else {
      toast.info("No changes made to the task.");
    }
  };

  const handleDelete = () => {
    dispatch(deleteTask(Number(id)));
    toast.success("Task deleted successfully!"); 
    setTimeout(() => {
      navigate('/');
    }, 1000); 
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!selectedTask) return <p className="text-center">No task found.</p>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <ToastContainer /> 
      <Typography
        sx={{ color: 'rgba(59, 130, 246, var(--tw-bg-opacity))', textAlign: "center" }}
        variant="h4"
        component="h1"
      >
        Edit Task
      </Typography>

      <div className='mt-14'>
        <input
          type="text"
          placeholder={selectedTask.title}
          value={updatedData.title || ""}
          onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />

        <textarea
          placeholder={selectedTask.description || "Enter task description"} 
          value={updatedData.description || ""}
          onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />

        <select
          value={updatedData.category || ""}
          onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        >
          <option value="">Select Category</option>
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

        <div className='text-center mt-2'>
          <button onClick={handleEdit} className="bg-blue-500 text-white p-[6px] rounded mr-2">Update</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-[6px] rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
