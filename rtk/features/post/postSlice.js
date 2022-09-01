const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const { fetchRelatedPosts } = require("./relatedPostSlice");
const store = require("../../app/store.js");
// initial state
const initialState = {
  loading: false,
  post: {},
  error: "",
};
// create async thunk
const fetchPosts = createAsyncThunk("post/fetchPosts", async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();
  store.dispatch(fetchRelatedPosts(post));
  return post;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.post = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.post = {};
    });
  },
});

module.exports = postSlice.reducer;

store.dispatch(fetchPosts(5));
