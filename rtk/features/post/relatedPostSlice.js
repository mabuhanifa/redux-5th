const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

// create async thunk
const fetchRelatedPosts = createAsyncThunk(
  "relatedPosts/fetchPosts",
  async (post) => {
    const queryString = post.title.split(" ");
    let response =
      "https://jsonplaceholder.typicode.com/posts?" +
      queryString.join("&title_like=");
    const final = await fetch(response);
    const posts = await final.json();
    return posts;
  }
);

const relatedPostSlice = createSlice({
  name: "relatedPost",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPosts.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.posts = action.payload;
    });

    builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.posts = [];
    });
  },
});

module.exports = relatedPostSlice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
