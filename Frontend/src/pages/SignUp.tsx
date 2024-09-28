import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authsSlice";
import { useNavigate, Link } from "react-router-dom";
import { TextField, InputAdornment, Button, Alert, Box } from "@mui/material";
import { Key, Loader2Icon, Mail, User } from "lucide-react";
import api from '../lib/api'; 
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const RegisterForm: React.FC = () => {
    const {
        handleSubmit,
        formState: { errors, touchedFields },
        register,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
      
        try {
            const response = await api.post('/signup', data);
            const { token, user } = response.data;
      
            // Store token in local storage
            localStorage.setItem('token', token);
      
            dispatch(login({ user, token }));
            navigate("/");
        } catch (error: any) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
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
            <form className="flex flex-col gap-6 items-center" onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Alert severity="error" className='w-full'>
                        {error}
                    </Alert>
                )}
                <TextField
                    label="Name"
                    variant="outlined"
                    placeholder='Enter your name'
                    fullWidth
                    disabled={loading}
                    {...register('name')}
                    error={!!errors.name && touchedFields.name}
                    helperText={errors.name?.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <User />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    placeholder='Enter your email'
                    fullWidth
                    disabled={loading}
                    {...register('email')}
                    error={!!errors.email && touchedFields.email}
                    helperText={errors.email?.message}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Mail />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Password"
                    {...register('password')}
                    error={!!errors.password && touchedFields.password}
                    helperText={errors.password?.message}
                    variant="outlined"
                    type="password"
                    placeholder='Enter your password'
                    fullWidth
                    disabled={loading}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Key />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type='submit'
                    fullWidth
                    disabled={loading}
                    className='flex items-center gap-2'
                >
                    {loading && <Loader2Icon className='animate-spin' size={24} />}
                    Register
                </Button>
                <Link to="/login" className='underline'>
                    Login instead?
                </Link>
            </form>
        </Box>
    );
};

export default RegisterForm;
