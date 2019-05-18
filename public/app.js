var socket = io.connect('http://localhost:80');

socket.on("hello",(data)=>{
	$('body').append('<video id="vid1" class="video-js vjs-default-skin" autoplay width="640" height="264" data-setup=\'{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "' + data["src"] + '"}], "youtube": { "start": ' + data["seconds"] + ' } }\'  ></video>');
});

setInterval(()=>{
	socket.emit("tick");
},1000);

socket.on("response",()=>{console.log("Tick!");});
