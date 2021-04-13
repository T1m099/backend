
//middleware to catch all errors, that might not have been caught in the corresponding function itself, so that the app doesnt ust shut down

module.exports = function () {
//logging an uncaught exception instead of shutting down the application
    process.on('uncaughtException', ex => {
        console.log(ex);
    });
//logging an unhandled promise rejection instead of shutting down the application
    process.on('unhandledRejection', ex => {
        console.log(ex);
    });
};