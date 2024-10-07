
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks'; 
import { scrapeLinkedInProfile } from '../redux/slices/linkedIn';
import { Box, Button, Card, CardContent, CardMedia, TextField, Typography, CircularProgress } from '@mui/material';

const LinkedInProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { profile, loading, error } = useAppSelector((state: any) => state.linkedin); 

    const [linkedinUrl, setLinkedinUrl] = useState("");

    const handleFetchProfile = () => {
        if (linkedinUrl) {
            dispatch(scrapeLinkedInProfile(linkedinUrl)); 
        }
    };

    return (
        <Box className="linkedin-profile-page p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <Typography variant="h4" component="h1" className="font-bold mb-6 text-center ">
                LinkedIn Profile Fetcher
            </Typography>

            <Box className="flex justify-center mb-6 w-full" maxWidth="sm">
                <TextField
                    label="Enter LinkedIn Profile URL"
                    variant="outlined"
                    fullWidth
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-2/3"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchProfile}
                    className="ml-2"
                >
                    Get
                </Button>
            </Box>

            {loading && (
                <CircularProgress className="mt-4" />
            )}

            {error && (
                <Typography color="error" className="mt-4 text-center">
                    {error}
                </Typography>
            )}

            {profile && (
                <Card className="mt-6 w-full max-w-md shadow-lg">
                    <CardMedia
                        component="img"
                        alt={profile.name}
                        height="200"
                        image={profile.image}
                        className="object-cover"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {profile.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Location:</strong> {profile.location}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href={profile.url}
                            target="_blank"
                            className="mt-4"
                            fullWidth
                        >
                            View LinkedIn Profile
                        </Button>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default LinkedInProfilePage;
