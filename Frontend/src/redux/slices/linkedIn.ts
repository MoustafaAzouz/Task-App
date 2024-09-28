import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface LinkedInProfile {
    name: string;
    location: string;
    url: string;
    image: string;
}

interface LinkedInState {
    profile: LinkedInProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: LinkedInState = {
    profile: null,
    loading: false,
    error: null,
};

export const scrapeLinkedInProfile = createAsyncThunk<
    LinkedInProfile,
    string,
    { rejectValue: string }
>(
    'linkedin/scrapeLinkedInProfile',
    async (url, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/MyLinkedin?url=${url}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch LinkedIn profile');
            }

            const data = await response.json();
            return data as LinkedInProfile;  // 
        } catch (error: any) {
            const message = error.message || 'An error occurred';
            return rejectWithValue(message);
        }
    }
);

const linkedinSlice = createSlice({
    name: 'linkedin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(scrapeLinkedInProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(scrapeLinkedInProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(scrapeLinkedInProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default linkedinSlice.reducer;
