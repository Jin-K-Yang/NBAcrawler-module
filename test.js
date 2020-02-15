const creeper = require("./index.js");

start();

function start(){
	var start_date = new Date(2017, 1 - 1, 1);	//	month 0~11, date 1~31.
	var end_date = new Date(2017, 1 - 1, 3);
	var during_day = (end_date - start_date) / 1000 / 60 / 60 / 24;

	Promise.all([
		creeper.makeInfo(start_date)
		]).then(async function(result){
			console.log(result);
			
			for(let i = 0; i < during_day; i++){
				await start_date.setDate(start_date.getDate() + 1);

				await creeper.makeInfo(start_date).then(function(result){
					console.log(result);
				})
			}

		})
}