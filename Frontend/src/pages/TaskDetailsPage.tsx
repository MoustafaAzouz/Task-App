import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks'; 
import { fetchTaskById, deleteTask, updateTask } from '../redux/slices/taskSlice'; 
import { useParams, useNavigate } from 'react-router-dom';
import { Task } from '../Types/task';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selectedTask, loading, error } = useAppSelector(state => state.tasks);
  const [updatedData, setUpdatedData] = useState<Partial<Task>>({});

  useEffect(() => {
    const user = { token: 'your-token' }; 
    if (id) {
      dispatch(fetchTaskById({ id: Number(id), user })); 
    }
  }, [dispatch, id]);

  const handleEdit = () => {
    if (updatedData.title || updatedData.description || updatedData.category) {
      dispatch(updateTask({ id: Number(id), taskData: updatedData }));
      alert("Task updated successfully!");
    } else {
      alert("No changes made to the task.");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(Number(id))); 
      alert("Task deleted successfully!");
      navigate('/');
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!selectedTask) return <p className="text-center">No task found.</p>;

  return (
    <div className="p-6 bg-gray-50  max-w-xl mx-auto">
   

      <h3 className="text-xl font-semibold mb-2 text-center mb- ">Edit Task</h3>
      <input
        type="text"
        placeholder={selectedTask.title || "Enter task title"}
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
          <button onClick={handleDelete} className="bg-red-500 text-white p-[6px] rounded ">Delete</button>
         </div>
     
    </div>
  );
};

export default TaskDetails;
