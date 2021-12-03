//Если есть проблемы с бд, то необходимо удалить файл config.db и запустить данный скрипт

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('config.db');

db.run('CREATE TABLE jsonConfigFiles(name text, jsonData text)');
db.run('CREATE TABLE mainConfigFile(name text)');

db.run('INSERT INTO mainConfigFile(name) VALUES ("Революция")')

db.close();