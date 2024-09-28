import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../lib/api';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authsSlice';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Alert, InputAdornment, Box } from '@mui/material';
import { Mail, Key } from 'lucide-react';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await api.post('/login', data);
  
      // Store token in local storage
      localStorage.setItem('token', response.data.token);
  
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor="#f0f0f0" 
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-center" style={{ width: '300px' }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message as React.ReactNode}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Mail /></InputAdornment>,
          }}
        />
        <TextField
          label="Password"
          {...register('password')}
          type="password"
          error={!!errors.password}
          helperText={errors.password?.message as React.ReactNode}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Key /></InputAdornment>,
          }}
        />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
