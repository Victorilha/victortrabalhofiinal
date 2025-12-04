import conexao from "../config/conexao.js";

const ClienteSchema = conexao.Schema({
    nome:{type:String, required:true},
    email: {type:String},
    telefone: {type:Number},
    cpf: {type:Number},
    datanascimento:{type:String},
    cliente:{type:String},

})
const Cliente = conexao.model("Cliente", ClienteSchema);
export default Cliente