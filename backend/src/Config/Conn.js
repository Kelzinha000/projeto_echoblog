import {Sequelize} from "sequelize"


const conn = new Sequelize("projeto_echoblog", "root", "Sen@iDev77!.", {
    host: "localhost", 
    dialect: "mysql"
})

export default conn; 

