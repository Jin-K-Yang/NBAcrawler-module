# NBA Crawler Module
This is a crawler about NBA scores.
# Download
```
npm install nbacrawler
```
# Usage
```javascript
var crawler = require("nbacrawler");
```

```javascript
var today = new Date();	      //	today
var date = new Date(2017, 1 - 1, 3);      //	month is zero basic

crawler.makeInfo(date).then((result)=>{
	console.log(result);
})

/* logs the following:
[ 
  [ '20170103', '76ers', 'Timberwolves', '93', '91' ],
  [ '20170103', 'Celtics', 'Jazz', '115', '104' ],
  [ '20170103', 'Pistons', 'Pacers', '116', '121' ],
  [ '20170103', 'Mavericks', 'Wizards', '113', '105' ],
  [ '20170103', 'Spurs', 'Raptors', '110', '82' ],
  [ '20170103', 'Nuggets', 'Kings', '113', '120' ],
  [ '20170103', 'Suns', 'Heat', '99', '90' ],
  [ '20170103', 'Lakers', 'Grizzlies', '116', '102' ] 
]
*/
```
# License
[MIT](https://choosealicense.com/licenses/mit/)
