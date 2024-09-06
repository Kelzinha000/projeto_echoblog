
const Postagem = conn.define("Postagens",{ 
    id:{
        type:DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true

    }, 
    titulo:{
        type: DataTypes.STRING, 
        allowNull: false, 
        required: true 
    }, 
    conteudo:{
        type: DataTypes.STRING, 
        allowNull: false, 
        required: true 
    },
    autor: {
        type: DataTypes.STRING, 
        allowNull: false, 
        required: true 
    },
    dataPublicao:{
        type: DataTypes.DATE
    }, 
    // image:{
    //     type: DataTypes.image
    // }
    
})

export default Postagem; 