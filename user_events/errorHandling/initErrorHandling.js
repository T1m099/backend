
//middleware for catching all errors that might occur that are not caught by the function where they appear
//with this the service doesnt shut down unexpectedly
module.exports = function () {
//logging an uncaught exception before shuting down the application
    process.on('uncaughtException', ex => {
        console.log(ex);
    });
//logging an unhanled promise rejection before shuting down the application
    process.on('unhandledRejection', ex => {
        console.log(ex);
    });
};