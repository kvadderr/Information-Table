//Подключаем библиотеки
const express = require('express');
const cors = require("cors");
const open = require("open");

//Подключение к БД
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('config.db');


//Создаем приложение на основе экспресс
const app = express();

//Приложение использует cors
app.use(cors());

//Чтобы читал 'application/json'
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Принимаем на вход название конфигурационного файла, который должен отображаться на сайте
app.post('/jsonConfigFile', function (request, response) {
  console.log(request.body);
  if(!request.body) return response.sendStatus(400);
  let sql = 'INSERT INTO mainConfigFile(name) VALUES ("' + request.body.name+'")';
  db.run(sql, function(err) {
      if (err) {
        return console.error(err.message);
      }
    });
  response.send(request.body.name);

});

//Принимаем на вход название конфигурационного файла и его содержимое
app.post('/jsonData', function (request, response) {
  
  if(!request.body) return response.sendStatus(400);
  const jsonObj = JSON.stringify(request.body.jsonData);
  console.log(jsonObj);
  let sql = "INSERT INTO jsonConfigFiles(name, jsonData) VALUES ('" + request.body.name+"', '"+JSON.stringify(request.body.jsonData)+"')";
  db.run(sql, function(err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Rows inserted`);
    });
  response.send(`${request.body.name} - ${request.body.jsonData}`);

});

//Читаем данные из выбранного файла JSON и отдаем клиенту
app.get('/jsonData', function (request, response) {  
 
  let sql = 'SELECT jsonData FROM jsonConfigFiles WHERE name = "'+request.query.name+'"';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      obj = JSON.parse(row.jsonData);
      response.send(obj); 
    });
  });
 
});

//Получаем название конфигурационного файла, который должен отображаться на сайте
app.get('/jsonFileName', function (request, response) {  
  
  let sql = 'SELECT * FROM mainConfigFile ORDER BY ROWID DESC LIMIT 1;';
  var jsonFileName;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      jsonFileName =row.name;
      response.send(jsonFileName);  
    }); 
  });
 
});

//Получаем названия всех доступных конфигурационных файлов
app.get('/jsonConfigFile', function (request, response) {  
  
  let sql = 'SELECT DISTINCT * FROM jsonConfigFiles';
  var jsonConfigFileName = [];
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      jsonConfigFileName.push(row.name);
      
    });
    response.send(jsonConfigFileName);  
  }); 

});


open("./cleanJS/index.html");
open("./cleanJS/config.html");

//Приложение слушает 4000 порт
app.listen(4000);
console.log("Сервер на порту 4000: Запущен");