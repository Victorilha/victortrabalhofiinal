import conexao from "../config/conexao.js";

const SessaoSchema = conexao.Schema({
    filme:{type:String, required:true},
    sala: {type:String},
    preco: {type:Number},
    horario: {type:String},
    data:{type:String},
    idioma:{type:String},
})
const Sessao = conexao.model("Sessao", SessaoSchema);
export default Sessao