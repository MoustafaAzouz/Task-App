import { useState } from "react";
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
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This will point the error to the confirmPassword field
});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
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
            confirmPassword: '', // Default value for confirm password
        },
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        setError(null);
      
        try {
            const response = await api.post('/signup', data);
            const { token } = response.data;

            localStorage.setItem('token', token);
      
            dispatch(login({ token }));
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
                <TextField
                    label="Confirm Password"
                    {...register('confirmPassword')}
                    error={!!errors.confirmPassword && touchedFields.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    variant="outlined"
                    type="password"
                    placeholder='Confirm your password'
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
