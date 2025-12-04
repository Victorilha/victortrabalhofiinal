import conexao from "../config/conexao.js";

const IngressoSchema = conexao.Schema({
    sessao:{type:String, required:true},
    cliente:{type:String},
    tipoingresso:{type:String},
    assento:{type:String},
    preco:{type:String},

})
const Ingresso = conexao.model("ingresso", IngressoSchema);
export default Ingresso