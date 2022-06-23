const { error } = require('console');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'))

let messages = [
    {author: 'juan', text: '!hola! que tal?'},
    {author: 'juan', text: '!muy bien'},
    {author: 'Ana', text: '!Genial!'}
];


io.on('connection',(socket)=>{
    console.log(`un usuario se ha conectado desde el cliente`);
    socket.emit('messages', messages);

    socket.on('new-message',(data)=>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})
const PORT = 8080;

const serv = server.listen(PORT, ()=>{
    console.log('listening on port ' + server.address().port);
});

server.on('error',error=>console.error('listening on port',error));