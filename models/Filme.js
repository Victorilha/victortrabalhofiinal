import conexao from "../config/conexao.js";

const FilmeSchema = conexao.Schema({
    nome:{type:String, required:true},
    descricao: {type:String},
    duracao: {type:Number},
    genero: {type:String},
    classificacao:{type:String},


})
const Filme = conexao.model("filme", FilmeSchema);
export default Filme