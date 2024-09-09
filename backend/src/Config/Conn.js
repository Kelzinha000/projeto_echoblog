import {Sequelize} from "sequelize"
import mysql from 'mysql2'


const conn = new Sequelize("projeto_echoblog", "root", "Sen@iDev77!.", {
    host: "localhost", 
    dialect: "mysql"
})

export default conn; 

