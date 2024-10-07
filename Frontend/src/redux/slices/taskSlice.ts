import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../Types/task'; 
import api from '../../lib/api';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  selectedTask: Task | null; 
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  selectedTask: null,
};

export const fetchAllTasks = createAsyncThunk('tasks/fetch', async (userId: number) => {
  const response = await api.get(`/task/${userId}`); 
  console.log(response.data);
  return response.data;
});
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchById',
  async ({ id, user }: { id: number; user: any }) => {
    const response = await api.get(`/task/find/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
    return response.data as Task; 
  }
)

export const createTask = createAsyncThunk('tasks/create', async (taskData: Task) => {
  console.log(taskData);

  const response = await api.post('/task', taskData);
  return response.data;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }: { id: number; taskData: Partial<Task> }) => {
    const response = await api.put(`/task/${id}`, taskData); 
    return response.data; 
  }
);

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  await api.delete(`/task/${id}`);
  return id; 
});


export const fetchTasksByCategory = createAsyncThunk(
  'tasks/fetchByCategory',
  async ({ category, userId }: { category: string; userId: number }) => {
    const response = await api.get(`/task/${category}/${userId}`); 
    return response.data; // 
  }
)

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.error = null ;
      state.selectedTask = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.selectedTask = action.payload; 
        state.error = null;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch task';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.map(task => (task.id === action.payload.id ? action.payload : task));
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })

      .addCase(fetchAllTasks.pending, (state) => {
        state.loading = true; 
    })

      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.loading = false; 
        state.tasks = action.payload; 
    })
    .addCase(fetchAllTasks.rejected, (state, action) => {
        state.loading = false; 
    })



    .addCase(fetchTasksByCategory.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchTasksByCategory.fulfilled, (state, action: PayloadAction<Task[]>) => {
      state.loading = false;
      state.tasks = action.payload; 
    })
    .addCase(fetchTasksByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch tasks by category';
    })
},


  },
);

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
