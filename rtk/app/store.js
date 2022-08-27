const configureStore = require("@reduxjs/toolkit").configureStore;
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
    },
    middleware: (getDefaultMiddlewares) =>
        getDefaultMiddlewares().concat(logger),
});

module.exports = store;