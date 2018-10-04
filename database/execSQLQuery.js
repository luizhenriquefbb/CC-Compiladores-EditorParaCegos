// import { mysql } from "../scripts/libs/mysql.js";
import { createConnection } from "../scripts/libs/mysql/index.js";
import { msgError } from "./error.js";
// var mysql = require('mysql')
// var msgError = require('./errosSQL')

export function execSQLQuery(query, data) {
    
    const connection = createConnection({
        host: "localhost",
        port: "3306",
        user: "root",
        password: 'root',
        database: "EnglishDictionary"
    });

    connection.query(query, data, function (error, results) {
        if (error) {
            // res.status = 
            return err = msgError(error);
            // res.send({ title: "error", status: error.errno, message: err });
            // res.send(error)
        }
        else if (results.length == 0) 
            // res.status(204).json({ resultados: [] });
            return "Palavra não encontrada no dicionario";
        else {
            return results;
        }
        connection.end();
        console.log("executou!");
    });
}