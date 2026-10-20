import { createSlice } from "@reduxjs/toolkit";

// This data is accessble throut the entire application so 
// there is no need to pass data between state and components
const initialState = {
    mode: "light", // value for web dark mode or light mode
    user: null,
    token: null,
    posts: [],
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        // if you logout we will reset the user and token to null
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends non-existent ");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
