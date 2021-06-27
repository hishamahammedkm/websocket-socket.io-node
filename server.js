var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/bord.html')
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname+'/public/admin.html')
})
io.on("connection",(socket)=>{
    console.log('new connection established');
    socket.on("disconnect",()=>{
        console.log('disconnected');
    })

    socket.on("message",(msg)=>{
        console.log(msg);
        io.emit('bordContent',msg)
    })
})
http.listen(3000,()=>{
    console.log('server is running');
})