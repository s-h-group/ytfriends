const express = require('express');
var app = express();
var server = app.listen(80,()=>{
	console.log("Server OK");
});
var change = true;

var current_video = {
	src: "https://www.youtube.com/watch?v=60o1g1E2GBs",
	seconds: 0,
	playing: true
}


var io = require('socket.io')(server);

io.on("connection",(socket)=>{
	if(current_video["playing"] == true){
		io.emit("hello",current_video);
	}
socket.on("Reload",() => {
console.log("got it");
});
socket.on("tick",()=>{
	io.emit("response");
	current_video["seconds"] +=1;
});
});
