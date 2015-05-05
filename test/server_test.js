'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

chai.use(chaiHttp);

require('../server');

describe('our server', function(){
	it('should response to a get time request', function(done){
		var currentTime = getDateTime();
		chai.request('localhost:3000')
			.get('/time')
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.msg).to.eql('Current time is ' + currentTime);
				done();
			});
	});

	it('should response to a greet request', function(done){
		chai.request('localhost:3000')
			.get('/greet/foo')
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(res.status).to.eql(200);
				expect(res.body.msg).to.eql('hello foo')
				done();
			});
	});
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