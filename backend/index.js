const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();
 //  chose port from here like 8080, 3001

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
    console.log('JSON Server is running')
})