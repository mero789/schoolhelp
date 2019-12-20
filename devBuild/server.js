const appIndex = require('./app')
const socketServer = require('./socketserver')

appIndex.listen(2000, function () {
    console.log("[SERVER]: begun...");
});

socketServer.listen(2020, function () {
    console.log("[SOCKET-SERVER]: running...");
});
