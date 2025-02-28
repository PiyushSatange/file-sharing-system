import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchApi = createAsyncThunk("auth/login", async (payload)=>{
    const response = await fetch("http://localhost:8000/api/auth/login",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
            credentials: "include"
        }
    );
    const data = await response.json();
    return data;
})

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState:{
        isAuthenticated: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApi.pending, (state, action) => {
            state.isLoading = true;
            console.log("inside pending state", state.value);
        });
        builder.addCase(fetchApi.fulfilled, (state, action) => {
            state.isLoading = false;
            state.value = action.payload;
            console.log("inside fulfilled state", action.payload);
            if(state.value.success == true){
                state.isAuthenticated = true;
            }
            else{
                state.isAuthenticated = false;
            }
            console.log(state.isAuthenticated);
        })
        builder.addCase(fetchApi.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            console.log("inside rejected state", state.value);

        })
    }
})

export const {checkAuthenticated, makeAuthenticated, makeUnauthenticated} = authenticationSlice.actions

export default authenticationSlice.reducer