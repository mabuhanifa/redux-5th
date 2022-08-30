const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");
const postReducer = require("../features/post/postSlice");
const logger = createLogger();

// configure store
const store = configureStore({
  reducer: {
    post: postReducer,
  },
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(logger),
});

module.exports = store;
