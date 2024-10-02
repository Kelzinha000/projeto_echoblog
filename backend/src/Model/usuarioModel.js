import { DataTypes } from "sequelize";
import conn from "../Config/Conn.js";

// para cada postagem o usuario precisa esta criado
                               // como prof colocou : usuarios /nome, objeto 
const Usuarios = conn.define("Usuarios",{ 
    id:{  // usuario_id
        type:DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true // reconhecer a chave primária 

    }, 
    nome:{
        type: DataTypes.STRING, 
        allowNull: false, 
        required: true 
    }, 
    email:{
        type:DataTypes.STRING, 
        allowNull: false, 
        unique: true, 
        validate:{ // validação se é do tipo email 
            isEmail:true 
        }
    },
    senha :{
        type:DataTypes.STRING,  // string 
        allowNull: false,
        required: true
    },
    papel:{
        type:DataTypes.ENUM(["administrador", "autor", "leitor"]),
        //values:["leitor", "administrador", "autor"]
    }
}
,{
    tableName: "Usuarios"
}) 


export default Usuarios; 