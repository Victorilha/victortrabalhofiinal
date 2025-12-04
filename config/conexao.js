import mongoose from "mongoose";
const url = 
"mongodb+srv://victorilha:123@cluster0.xpjc68v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const conexao = await mongoose.connect(url)
export default conexao

