import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { createServer } from 'http';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// COLOCAR OS MODELS AQUI (colocar o caminho ../)

//vivor

import  Filme from '../models/Filme.js';
import Ingresso from '../models/Ingresso.js';
import Cliente from '../models/Cliente.js';
import Sessao from '../models/Sessao.js';

//FIM MODELS

// Servir arquivos estáticos
//app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));

// Rotas
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// COLOCAR AS ROTAS AQUI
app.get('/', (req, res) => {
    // redireciona para a rota que carrega filmes e sessões
    res.redirect('/agendar');
})

app.get("/agendar", async (req, res) => {
    const filme = await Filme.find();
    const sessao = await Sessao.find();
    
    res.render("agendar", { filme, sessao });
});

app.post("/ingresso/salvar", async (req, res) => {
    try {
        // cria o cliente com os dados enviados no formulário (mesma lógica de /cliente/add/ok)
        const clienteData = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            datanascimento: req.body.datanascimento,
            cliente: req.body.cliente
        };
        const clienteDoc = await Cliente.create(clienteData);

        // cria o ingresso associando ao cliente criado
        const ingressoData = {
            filme: req.body.filme,
            sessao: req.body.sessao,
            tipoingresso: req.body.tipoingresso,
            assento: req.body.assento,
            preco: req.body.preco,
            cliente: clienteDoc._id
        };
        await Ingresso.create(ingressoData);

        res.redirect("/agendar");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao salvar ingresso/cliente");
    }
});



app.get('/Filme/lst', async (req, res) => {
    const filme = await Filme.find()
    res.render("Filme/lst", {filme})
})

app.get('/Filme/add', (req, res) => {
    res.render("Filme/add")
})

app.get('/Filme/edt/:id', async (req, res) => {
    const filme = await Filme.findById(req.params.id)
    res.render("Filme/edt", {filme})
})

app.post('/Filme/edt/:id', async (req, res) => {
    await Filme.findByIdAndUpdate(req.params.id, req.body)
    res.render("Filme/edtok")
})

app.post('/Filme/add/ok', async (req, res) => {
    await Filme.create (req.body)
    res.render("Filme/addok")
})

app.get('/Filme/del/:id', async (req, res) => {
    await Filme.findByIdAndDelete(req.params.id)
    res.redirect("/Filme/lst")
})




app.get('/sessao/lst', async (req, res) => {
    const sessao = await Sessao.find()
    res.render("sessao/lst", {sessao})
})

app.get('/sessao/add',  (req, res) => {
    res.render("sessao/add")
})

app.post('/sessao/add/ok', async (req, res) => {
    await Sessao.create (req.body)
    res.render("sessao/addok")
})

app.get('/sessao/del/:id', async (req, res) => {
    await Sessao.findByIdAndDelete(req.params.id)
    res.redirect("/sessao/lst")
})




app.get('/ingresso/lst', async (req, res) => {
    const ingresso = await Ingresso.find()
    res.render("ingresso/lst", {ingresso})
})

app.get('/ingresso/add', (req, res) => {
    res.render("ingresso/add")
})

app.post('/ingresso/add/ok', async (req, res) => {
    await Ingresso.create (req.body)
    res.render("ingresso/addok")
})

app.get('/ingresso/del/:id', async (req, res) => {
    await Ingresso.findByIdAndDelete(req.params.id)
    res.redirect("/ingresso/lst")
})





app.get('/cliente/add', (req, res) => {
    res.render("cliente/add")
})

app.get('/cliente/lst', async (req, res) => {
    const cliente = await Cliente.find()
    res.render("cliente/lst", {cliente})
})

app.post('/cliente/add/ok', async (req, res) => {
    await Cliente.create (req.body)
    res.render("cliente/addok")
})

app.get('/cliente/del/:id', async (req, res) => {
    await Cliente.findByIdAndDelete(req.params.id)
    res.redirect("/cliente/lst")
})


//FIM ROTAS
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;