const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// create async thunk
const fetchRelatedPosts = createAsyncThunk("post/fetchPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const post = await res.json();
  const queryString = post.title.split(" ");
  let response =
    "https://jsonplaceholder.typicode.com/posts?" +
    queryString.join("&title_like=");
  // const response2 = await fetch("https://jsonplaceholder.typicode.com/posts/2");
  // const posts2 = await response2.json();
  const final = await fetch(response);
  const posts = await final.json();
  return posts;
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
      state.posts = action.payload;
    });

    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = [];
    });
  },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
