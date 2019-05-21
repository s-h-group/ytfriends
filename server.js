const express = require('express');
var app = express();
var server = app.listen(80,()=>{
	console.log("Server OK");
});
var change = true;

var server_info = {
	connections: 0,
	status: "playingvideo",
	seconds_video: 0,
	tick: false
}

var host = {
	id: "",
	selected: false,
	data: {src:"",seconds:0,playing:false}
}

var current_video = {
	src: "https://www.youtube.com/watch?v=UmtxtnP9AmA",
	seconds: 0,
	playing: true
}

var io = require('socket.io')(server);

app.use(express.static('./public'));

io.on("connection",(socket)=>{
		server_info.connections = server_info.connections +1;
		console.log(server_info);
	if(current_video["playing"] == true){
		io.emit("currentVideo",current_video);
	}
socket.on("Reload",() => {
console.log("got it");
});

socket.on("tickUpdated",()=>{server_info.tick = true; console.log("tick updated");});
socket.on("disconnect",()=>{server_info.connections = server_info.connections -1;})
socket.on("tick",()=>{
	if(server_info.tick == false){
		io.emit("responseTick");
	}
	if(server_info.status == "choosenewvideo"){

	}
	if(current_video["seconds"]>=300){
		current_video.playing = false;
		server_info.status = "choosenewvideo";
	}else{
		if(server_info.tick == true){
			current_video["seconds"] +=1;
		  server_info.seconds_video = current_video["seconds"];
			server_info.tick = false;
		}
}
	io.emit("response",server_info);
});
});
