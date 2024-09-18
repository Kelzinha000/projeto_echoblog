import { DataTypes } from "sequelize";
import conn from "../Config/Conn.js";



const Usuarios = conn.define("Usuarios",{ 
    id:{
        type:DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true

    }, 
    nome:{
        type: DataTypes.STRING, 
        allowNull: false, 
        required: true 
    }, 
    email:{
        type:DataTypes.STRING, 
        allowNull: false, 
        required: true 
    },
    senha :{
        type:DataTypes.INTEGER, 
        allowNull: false,
        required: true
    },
    papel:{
        type:DataTypes.ENUM,
        values:["leitor", "administrador", "autor"]
    }

}) 


export default Usuarios; 