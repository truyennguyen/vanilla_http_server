'use strict';

var http = require('http');

var server = http.createServer(function(req, res){
    var pathArr = req.url.split('/');

	if(req.url === '/time'){
		res.writeHead(200, {
			'Content-Type' : 'application/json'
		});
		var currentTime = getDateTime();
		res.write(JSON.stringify({msg: 'Current time is ' + currentTime}));
		res.end();
	}
    else if(pathArr[1] === 'greet'){
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        });
        var currentTime = getDateTime();
        res.write(JSON.stringify({msg: 'hello ' + pathArr[2]}));
        res.end();
    }
    else if(req.url === '/greet'){
        res.writeHead(200, {
            'Content-Type' : 'application/json'
        });

        if(req.method === "POST"){
            console.log('post');
            req.on('data', function(data){
                var body = JSON.parse(data.toString('utf-8'));
                res.write(JSON.stringify({msg: 'hello ' + body.name}));
                res.end();
            });
        }
        else{
            res.write(JSON.stringify({msg: 'hello world'}));
            res.end();
        }
    }
	else{
		res.writeHead(404, {
			'Content-Type': 'application/json'
        });

        res.write(JSON.stringify({msg: 'could not find page'}));
        res.end();
	}
});

server.listen(3000, function() {
  console.log('server started');
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
}

**/node_modules/
**/*.sw?
**/*.log