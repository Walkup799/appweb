import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void> =>{
    const mongoUri="mongodb://localhost:27017/proyecto"
//"mongodb://localhost:27017/proyecto ->
    try{
await mongoose.connect(mongoUri);
console.log("Conexion a mongo");
    }catch(error){
    console.log("Error conexion a mongo: ", error);
    }
}

export default connectDBMongo