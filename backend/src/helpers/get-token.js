const getToken = (request)=>{
    const authHeader = request.headers.authorization
    const token = authHeader.split(" ")[1]
    return token; 
    // bearer token 

}

export default getToken; 