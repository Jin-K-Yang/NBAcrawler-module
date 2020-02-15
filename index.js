const request = require("request");

//modify the prototype of Date().
Date.prototype.yyyymmdd = function() {
	var mm = this.getMonth() + 1;	//	getMonth() is zero-based
	var dd = this.getDate();

	return [this.getFullYear(),
		(mm > 9 ? "" : "0") + mm,
		(dd > 9 ? "" : "0") + dd
		].join("");
};

function getScoreboard(parameter){
	return new Promise(function(resolve, reject){
		request("https://data.nba.net/prod/v2/" + parameter + "/scoreboard.json", (err, res, body)=>{
			if (!err && res.statusCode == 200){
				var scoreboard = JSON.parse(body);
				console.log("get score success!");
				resolve(scoreboard.games);
			}
			else{
				reject(parameter + " getScoreboard() error!");
			}
		})
	})
}

function getTeamMappingObj(year){
	return new Promise(function(resolve, reject){
		request("https://data.nba.net/prod/v2/" + year + "/teams.json", (err, res, body)=>{
			if(!err && res.statusCode == 200){
				var teams = JSON.parse(body);
				var mapping = {};
				teams.league.standard.forEach((obj)=>{
					mapping[obj.tricode] = obj;
				})
				console.log("get team data success");
				resolve(mapping);
			}
			else{
				reject(year + " getTeamMappingObj() error!");
			}
		})
	})
}

function makeInfo(date){
	var date_string = date.yyyymmdd();
	return new Promise(function(resolve, reject){
		Promise.all([
		getTeamMappingObj(date.getFullYear()),
		getScoreboard(date_string)
		]).then((results)=>{
			var teams = results[0];
			var games = results[1];
			var info = games.map(function(game){
				return [
				date_string, 
				teams[game.hTeam.triCode].nickname, 
				teams[game.vTeam.triCode].nickname,
				game.hTeam.score,
				game.vTeam.score
				]
			});
			console.log(date_string + " make info success!");
			resolve(info);
		}).catch((error)=>{
			console.log(error);
		})
	})
}

module.exports.makeInfo = function(date){
	return makeInfo(date);
}