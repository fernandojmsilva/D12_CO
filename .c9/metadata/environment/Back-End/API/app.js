{"changed":true,"filter":false,"title":"app.js","tooltip":"/Back-End/API/app.js","value":"const express = require(\"express\");\nconst app = express();\nconst mysql = require('mysql');\nconst port = process.env.port || 8080;\n\nconst connection = mysql.createConnection({\n  host: 'remotemysql.com',\n  user: 'HDP0tpHOen',\n  password: 'NTsscTJj76',\n  database: 'HDP0tpHOen'\n});\n\nconnection.connect((err) => {\n    if(err) throw err;\n    console.log('Connected to MySQL Server!');\n});\n\napp.get(\"/users\",(req,res) => {\n    connection.query('SELECT * from Users', (err, rows) => {\n        if(err) throw err;\n        console.log('The data from users table are: \\n', rows)\n        res.send(rows);\n    });\n});\n\napp.listen(port, () => {\n    console.log('Server is running at port '+port);\n});\n\nconst pool = mysql.createPool({\n    connectionLimit : 100, //important\n    host     : 'remotemysql.com',\n    user     : 'HDP0tpHOen',\n    password : 'NTsscTJj76',\n    database : 'HDP0tpHOen',\n    debug    :  false\n});\n\n/* ***************************************************************\nNÃO **************************************************************\nMEXAM ************************************************************\nEM ***************************************************************\nNADA *************************************************************\nQUE **************************************************************\nISTO *************************************************************\nJÁ ***************************************************************\nFUNCIONA *********************************************************\n- ****************************************************************\nG124 *****************************************************\n\n\n▒▒▒▒▒▒▒▒▒▒████████████▒▒▒▒▒▒▒▒▒▒\n▒▒▒▒▒▒████████████████████▒▒▒▒▒▒\n▒▒▒▒████████████████████████▒▒▒▒\n▒▒████████████████████████████▒▒\n▒▒████        ████████████████▒▒\n████          ██████████████████\n████          ████████    ██████\n██            ████▓▓██    ██████\n██    ██      ▓▓▓▓██████████████\n██    ████      ████████████████\n██                ██████████████\n▒▒██                ██▓▓▓▓████▒▒\n▒▒████                    ████▒▒\n▒▒▒▒████                ████▒▒▒▒\n▒▒▒▒▒▒████            ████▒▒▒▒▒▒\n▒▒▒▒▒▒▒▒▒▒████████████▒▒▒▒▒▒▒▒▒▒\n              ░░         \n\n*/ \n\n// add rows in the table\n\nfunction addRow(data) {\n    let insertQuery = 'INSERT INTO Users (user_id, password, type) VALUES (\"5\", \"works\", \"5\")';\n    let query = mysql.format(insertQuery,[\"Users\",\"user_id\",\"password\",\"type\",data.user_id,data.password,data.type]);\n    pool.query(query,(err, response) => {\n        if(err) {\n            console.error(err);\n            return;\n        }\n        // rows added\n        console.log(response.insertId);\n    });\n}\n\nsetTimeout(() => {\n    // call the function\n    addRow({\n        \"user_id\": \"5\",\n        \"password\": \"works\",\n        \"type\": \"5\"\n    });\n},5000);\n\n// update rows\n\nfunction updateRow(data) {\n    let updateQuery = \"UPDATE Users SET password = 'e_joao' WHERE user_id = 1\";\n    let query = mysql.format(updateQuery,[\"Users\",\"password\",data.password,\"user_id\",data.user_id]);\n    // query = UPDATE `todo` SET `notes`='Hello' WHERE `name`='shahid'\n    pool.query(query,(err, response) => {\n        if(err) {\n            console.error(err);\n            return;\n        }\n        // rows updated\n        console.log(response.affectedRows);\n    });\n}\n\nsetTimeout(() => {\n    // call the function\n    updateRow({\n        \"password\": \"e_joao\",\n    });\n},5000);\n\n// query rows in the table\n\nfunction queryRow(userName) {\n    let selectQuery = 'SELECT password FROM Users WHERE user_id = 1';    \n    let query = mysql.format(selectQuery,[\"Users\",\"user_id\", userName]);\n    // query = SELECT * FROM `todo` where `user` = 'shahid'\n    pool.query(query,(err, data) => {\n        if(err) {\n            console.error(err);\n            return;\n        }\n        // rows fetch\n        console.log(data);\n    });\n}\n\nfunction deleteRow(userName) {\n    let deleteQuery = \"DELETE from Users WHERE user_id = '3'\";\n    let query = mysql.format(deleteQuery, [\"Users\", \"user_id\", userName]);\n    // query = DELETE from `todo` where `user`='shahid';\n    pool.query(query,(err, response) => {\n        if(err) {\n            console.error(err);\n            return;\n        }\n        // rows deleted\n        console.log(response.affectedRows);\n    });\n}\n\nsetTimeout(() => {\n    // call the function\n    deleteRow({\n        \"user_id\": \"3\",\n    });\n},5000);","undoManager":{"mark":-2,"position":100,"stack":[[{"start":{"row":42,"column":43},"end":{"row":42,"column":64},"action":"insert","lines":["*********************"],"id":505,"ignore":true}],[{"start":{"row":42,"column":64},"end":{"row":42,"column":69},"action":"insert","lines":["*****"],"id":506,"ignore":true}],[{"start":{"row":41,"column":2},"end":{"row":41,"column":4},"action":"insert","lines":[" *"],"id":507,"ignore":true}],[{"start":{"row":41,"column":4},"end":{"row":41,"column":22},"action":"insert","lines":["******************"],"id":508,"ignore":true}],[{"start":{"row":41,"column":22},"end":{"row":41,"column":43},"action":"insert","lines":["*********************"],"id":509,"ignore":true}],[{"start":{"row":41,"column":43},"end":{"row":41,"column":48},"action":"insert","lines":["*****"],"id":510,"ignore":true}],[{"start":{"row":41,"column":48},"end":{"row":41,"column":65},"action":"insert","lines":["*****************"],"id":511,"ignore":true}],[{"start":{"row":43,"column":3},"end":{"row":43,"column":5},"action":"insert","lines":[" *"],"id":512,"ignore":true}],[{"start":{"row":43,"column":5},"end":{"row":43,"column":21},"action":"insert","lines":["****************"],"id":513,"ignore":true}],[{"start":{"row":43,"column":21},"end":{"row":43,"column":42},"action":"insert","lines":["*********************"],"id":514,"ignore":true}],[{"start":{"row":43,"column":42},"end":{"row":43,"column":58},"action":"insert","lines":["****************"],"id":515,"ignore":true}],[{"start":{"row":43,"column":58},"end":{"row":43,"column":60},"action":"insert","lines":["**"],"id":516,"ignore":true}],[{"start":{"row":43,"column":60},"end":{"row":43,"column":69},"action":"insert","lines":["*********"],"id":517,"ignore":true}],[{"start":{"row":44,"column":4},"end":{"row":44,"column":6},"action":"insert","lines":[" *"],"id":518,"ignore":true}],[{"start":{"row":44,"column":6},"end":{"row":44,"column":14},"action":"insert","lines":["********"],"id":519,"ignore":true}],[{"start":{"row":44,"column":14},"end":{"row":44,"column":37},"action":"insert","lines":["***********************"],"id":520,"ignore":true}],[{"start":{"row":44,"column":37},"end":{"row":44,"column":42},"action":"insert","lines":["*****"],"id":521,"ignore":true}],[{"start":{"row":44,"column":42},"end":{"row":44,"column":46},"action":"insert","lines":["****"],"id":522,"ignore":true}],[{"start":{"row":44,"column":46},"end":{"row":44,"column":67},"action":"insert","lines":["*********************"],"id":523,"ignore":true}],[{"start":{"row":44,"column":67},"end":{"row":44,"column":68},"action":"insert","lines":["*"],"id":524,"ignore":true}],[{"start":{"row":45,"column":2},"end":{"row":45,"column":4},"action":"insert","lines":[" *"],"id":525,"ignore":true}],[{"start":{"row":45,"column":4},"end":{"row":45,"column":22},"action":"insert","lines":["******************"],"id":526,"ignore":true}],[{"start":{"row":45,"column":22},"end":{"row":45,"column":43},"action":"insert","lines":["*********************"],"id":527,"ignore":true}],[{"start":{"row":45,"column":43},"end":{"row":45,"column":47},"action":"insert","lines":["****"],"id":528,"ignore":true}],[{"start":{"row":45,"column":47},"end":{"row":45,"column":68},"action":"insert","lines":["*********************"],"id":529,"ignore":true}],[{"start":{"row":45,"column":68},"end":{"row":45,"column":69},"action":"insert","lines":["*"],"id":530,"ignore":true},{"start":{"row":46,"column":8},"end":{"row":46,"column":10},"action":"insert","lines":[" *"]}],[{"start":{"row":46,"column":10},"end":{"row":46,"column":17},"action":"insert","lines":["*******"],"id":531,"ignore":true}],[{"start":{"row":46,"column":17},"end":{"row":46,"column":38},"action":"insert","lines":["*********************"],"id":532,"ignore":true}],[{"start":{"row":46,"column":38},"end":{"row":46,"column":42},"action":"insert","lines":["****"],"id":533,"ignore":true}],[{"start":{"row":46,"column":42},"end":{"row":46,"column":63},"action":"insert","lines":["*********************"],"id":534,"ignore":true}],[{"start":{"row":46,"column":63},"end":{"row":46,"column":67},"action":"insert","lines":["****"],"id":535,"ignore":true}],[{"start":{"row":46,"column":67},"end":{"row":46,"column":75},"action":"insert","lines":["******* "],"id":536,"ignore":true}],[{"start":{"row":47,"column":2},"end":{"row":47,"column":3},"action":"insert","lines":["*"],"id":537,"ignore":true}],[{"start":{"row":47,"column":3},"end":{"row":47,"column":5},"action":"insert","lines":["**"],"id":538,"ignore":true}],[{"start":{"row":47,"column":5},"end":{"row":47,"column":9},"action":"insert","lines":["****"],"id":539,"ignore":true}],[{"start":{"row":47,"column":9},"end":{"row":47,"column":29},"action":"insert","lines":["********************"],"id":540,"ignore":true}],[{"start":{"row":47,"column":29},"end":{"row":47,"column":50},"action":"insert","lines":["*********************"],"id":541,"ignore":true}],[{"start":{"row":47,"column":50},"end":{"row":47,"column":71},"action":"insert","lines":["*********************"],"id":542,"ignore":true}],[{"start":{"row":48,"column":7},"end":{"row":48,"column":8},"action":"insert","lines":[" "],"id":543,"ignore":true}],[{"start":{"row":48,"column":8},"end":{"row":48,"column":10},"action":"insert","lines":["**"],"id":544,"ignore":true}],[{"start":{"row":48,"column":10},"end":{"row":48,"column":31},"action":"insert","lines":["*********************"],"id":545,"ignore":true}],[{"start":{"row":48,"column":31},"end":{"row":48,"column":52},"action":"insert","lines":["*********************"],"id":546,"ignore":true}],[{"start":{"row":48,"column":52},"end":{"row":48,"column":70},"action":"insert","lines":["******************"],"id":547,"ignore":true}],[{"start":{"row":49,"column":2},"end":{"row":49,"column":4},"action":"insert","lines":[" *"],"id":548,"ignore":true}],[{"start":{"row":49,"column":4},"end":{"row":49,"column":10},"action":"insert","lines":["******"],"id":549,"ignore":true}],[{"start":{"row":49,"column":10},"end":{"row":49,"column":14},"action":"insert","lines":["****"],"id":550,"ignore":true}],[{"start":{"row":49,"column":14},"end":{"row":49,"column":27},"action":"insert","lines":["*************"],"id":551,"ignore":true}],[{"start":{"row":49,"column":3},"end":{"row":49,"column":27},"action":"remove","lines":["************************"],"id":552,"ignore":true}],[{"start":{"row":39,"column":3},"end":{"row":39,"column":5},"action":"insert","lines":[" *"],"id":553,"ignore":true}],[{"start":{"row":39,"column":5},"end":{"row":39,"column":18},"action":"insert","lines":["*************"],"id":554,"ignore":true}],[{"start":{"row":39,"column":18},"end":{"row":39,"column":40},"action":"insert","lines":["**********************"],"id":555,"ignore":true}],[{"start":{"row":39,"column":40},"end":{"row":39,"column":44},"action":"insert","lines":["****"],"id":556,"ignore":true}],[{"start":{"row":39,"column":44},"end":{"row":39,"column":66},"action":"insert","lines":["**********************"],"id":557,"ignore":true}],[{"start":{"row":39,"column":66},"end":{"row":39,"column":69},"action":"insert","lines":["** "],"id":558,"ignore":true}],[{"start":{"row":40,"column":5},"end":{"row":40,"column":7},"action":"insert","lines":[" *"],"id":559,"ignore":true}],[{"start":{"row":40,"column":7},"end":{"row":40,"column":12},"action":"insert","lines":["*****"],"id":560,"ignore":true}],[{"start":{"row":40,"column":12},"end":{"row":40,"column":33},"action":"insert","lines":["*********************"],"id":561,"ignore":true}],[{"start":{"row":40,"column":33},"end":{"row":40,"column":37},"action":"insert","lines":["****"],"id":562,"ignore":true}],[{"start":{"row":40,"column":37},"end":{"row":40,"column":58},"action":"insert","lines":["*********************"],"id":563,"ignore":true}],[{"start":{"row":40,"column":58},"end":{"row":40,"column":65},"action":"insert","lines":["*******"],"id":564,"ignore":true}],[{"start":{"row":40,"column":65},"end":{"row":40,"column":66},"action":"insert","lines":["*"],"id":565,"ignore":true}],[{"start":{"row":38,"column":2},"end":{"row":38,"column":4},"action":"insert","lines":[" *"],"id":566,"ignore":true}],[{"start":{"row":38,"column":4},"end":{"row":38,"column":20},"action":"insert","lines":["****************"],"id":567,"ignore":true}],[{"start":{"row":38,"column":20},"end":{"row":38,"column":41},"action":"insert","lines":["*********************"],"id":568,"ignore":true}],[{"start":{"row":38,"column":41},"end":{"row":38,"column":62},"action":"insert","lines":["*********************"],"id":569,"ignore":true}],[{"start":{"row":38,"column":62},"end":{"row":38,"column":66},"action":"insert","lines":["****"],"id":570,"ignore":true}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"insert","lines":["O"],"id":571,"ignore":true}],[{"start":{"row":48,"column":6},"end":{"row":48,"column":7},"action":"insert","lines":["<"],"id":572,"ignore":true}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":7},"action":"remove","lines":["O<"],"id":573,"ignore":true},{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"insert","lines":["O"]}],[{"start":{"row":48,"column":6},"end":{"row":48,"column":7},"action":"insert","lines":["<"],"id":574,"ignore":true}],[{"start":{"row":48,"column":6},"end":{"row":48,"column":7},"action":"remove","lines":["<"],"id":575,"ignore":true}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"remove","lines":["O"],"id":576,"ignore":true},{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"insert","lines":["0"]}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"remove","lines":["0"],"id":577,"ignore":true},{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"insert","lines":["O"]}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"remove","lines":["O"],"id":578,"ignore":true}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":6},"action":"insert","lines":["o"],"id":579,"ignore":true}],[{"start":{"row":48,"column":6},"end":{"row":48,"column":7},"action":"insert","lines":["<"],"id":580,"ignore":true}],[{"start":{"row":48,"column":7},"end":{"row":48,"column":9},"action":"insert","lines":["[]"],"id":581,"ignore":true}],[{"start":{"row":48,"column":9},"end":{"row":48,"column":10},"action":"insert","lines":["8"],"id":582,"ignore":true}],[{"start":{"row":48,"column":10},"end":{"row":48,"column":11},"action":"remove","lines":[":"],"id":583,"ignore":true}],[{"start":{"row":48,"column":10},"end":{"row":48,"column":12},"action":"insert","lines":["^^"],"id":584,"ignore":true}],[{"start":{"row":48,"column":11},"end":{"row":48,"column":12},"action":"remove","lines":["^"],"id":585,"ignore":true}],[{"start":{"row":39,"column":67},"end":{"row":39,"column":70},"action":"remove","lines":["*  "],"id":586,"ignore":true}],[{"start":{"row":39,"column":66},"end":{"row":39,"column":67},"action":"remove","lines":["*"],"id":587,"ignore":true}],[{"start":{"row":41,"column":65},"end":{"row":41,"column":66},"action":"insert","lines":["*"],"id":588,"ignore":true}],[{"start":{"row":42,"column":66},"end":{"row":42,"column":69},"action":"remove","lines":["***"],"id":589,"ignore":true}],[{"start":{"row":43,"column":66},"end":{"row":43,"column":69},"action":"remove","lines":["***"],"id":590,"ignore":true}],[{"start":{"row":44,"column":66},"end":{"row":44,"column":68},"action":"remove","lines":["**"],"id":591,"ignore":true}],[{"start":{"row":45,"column":66},"end":{"row":45,"column":69},"action":"remove","lines":["***"],"id":592,"ignore":true}],[{"start":{"row":46,"column":66},"end":{"row":46,"column":75},"action":"remove","lines":["******** "],"id":593,"ignore":true}],[{"start":{"row":47,"column":66},"end":{"row":47,"column":71},"action":"remove","lines":["*****"],"id":594,"ignore":true}],[{"start":{"row":48,"column":66},"end":{"row":48,"column":75},"action":"remove","lines":["*********"],"id":595,"ignore":true}],[{"start":{"row":48,"column":66},"end":{"row":50,"column":0},"action":"insert","lines":["","",""],"id":596,"ignore":true}],[{"start":{"row":50,"column":0},"end":{"row":52,"column":0},"action":"insert","lines":["","",""],"id":597,"ignore":true}],[{"start":{"row":50,"column":0},"end":{"row":73,"column":0},"action":"insert","lines":["░░▄███▄███▄","░░█████████","░░▒▀█████▀░","░░▒░░▀█▀","░░▒░░█░","░░▒░█","░░░█","░░█░░░░███████","░██░░░██▓▓███▓██▒","██░░░█▓▓▓▓▓▓▓█▓████","██░░██▓▓▓(◐)▓█▓█▓█","███▓▓▓█▓▓▓▓▓█▓█▓▓▓▓█","▀██▓▓█░██▓▓▓▓██▓▓▓▓▓█","░▀██▀░░█▓▓▓▓▓▓▓▓▓▓▓▓▓█","░░░░▒░░░█▓▓▓▓▓█▓▓▓▓▓▓█","░░░░▒░░░█▓▓▓▓█▓█▓▓▓▓▓█","░▒░░▒░░░█▓▓▓█▓▓▓█▓▓▓▓█","░▒░░▒░░░█▓▓▓█░░░█▓▓▓█","░▒░░▒░░██▓██░░░██▓▓██","████████████████████████","█▄─▄███─▄▄─█▄─█─▄█▄─▄▄─█","██─██▀█─██─██─█─███─▄█▀█","▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▄▀",""],"id":598,"ignore":true}],[{"start":{"row":73,"column":0},"end":{"row":75,"column":0},"action":"remove","lines":["","",""],"id":599,"ignore":true}],[{"start":{"row":49,"column":0},"end":{"row":72,"column":24},"action":"remove","lines":["","░░▄███▄███▄","░░█████████","░░▒▀█████▀░","░░▒░░▀█▀","░░▒░░█░","░░▒░█","░░░█","░░█░░░░███████","░██░░░██▓▓███▓██▒","██░░░█▓▓▓▓▓▓▓█▓████","██░░██▓▓▓(◐)▓█▓█▓█","███▓▓▓█▓▓▓▓▓█▓█▓▓▓▓█","▀██▓▓█░██▓▓▓▓██▓▓▓▓▓█","░▀██▀░░█▓▓▓▓▓▓▓▓▓▓▓▓▓█","░░░░▒░░░█▓▓▓▓▓█▓▓▓▓▓▓█","░░░░▒░░░█▓▓▓▓█▓█▓▓▓▓▓█","░▒░░▒░░░█▓▓▓█▓▓▓█▓▓▓▓█","░▒░░▒░░░█▓▓▓█░░░█▓▓▓█","░▒░░▒░░██▓██░░░██▓▓██","████████████████████████","█▄─▄███─▄▄─█▄─█─▄█▄─▄▄─█","██─██▀█─██─██─█─███─▄█▀█","▀▄▄▄▄▄▀▄▄▄▄▀▀▄▄▄▀▀▄▄▄▄▄▀"],"id":600,"ignore":true},{"start":{"row":49,"column":0},"end":{"row":65,"column":25},"action":"insert","lines":["▒▒▒▒▒▒▒▒▒▒████████████▒▒▒▒▒▒▒▒▒▒","▒▒▒▒▒▒████████████████████▒▒▒▒▒▒","▒▒▒▒████████████████████████▒▒▒▒","▒▒████████████████████████████▒▒","▒▒████        ████████████████▒▒","████          ██████████████████","████          ████████    ██████","██            ████▓▓██    ██████","██    ██      ▓▓▓▓██████████████","██    ████      ████████████████","██                ██████████████","▒▒██                ██▓▓▓▓████▒▒","▒▒████                    ████▒▒","▒▒▒▒████                ████▒▒▒▒","▒▒▒▒▒▒████            ████▒▒▒▒▒▒","▒▒▒▒▒▒▒▒▒▒████████████▒▒▒▒▒▒▒▒▒▒","              ░░         "]}],[{"start":{"row":46,"column":66},"end":{"row":47,"column":0},"action":"insert","lines":["",""],"id":601,"ignore":true}],[{"start":{"row":46,"column":66},"end":{"row":47,"column":0},"action":"remove","lines":["",""],"id":602,"ignore":true}],[{"start":{"row":48,"column":66},"end":{"row":49,"column":0},"action":"insert","lines":["",""],"id":603,"ignore":true}],[{"start":{"row":49,"column":0},"end":{"row":50,"column":0},"action":"insert","lines":["",""],"id":604,"ignore":true}],[{"start":{"row":48,"column":5},"end":{"row":48,"column":13},"action":"remove","lines":["o<[]8^) "],"id":605}]]},"ace":{"folds":[],"scrolltop":1500,"scrollleft":0,"selection":{"start":{"row":71,"column":24},"end":{"row":71,"column":24},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":106,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1606326990690}