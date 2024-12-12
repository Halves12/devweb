import express, { response } from "express";
import cors from "cors";
import { produtos, produtosInterface } from "./produtos";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/produtos", (request, response)=>{
response.status(200).json(produtos)
});

app.get("/produtos-promocao", (request, response)=>{
const produtosPromocao = produtos.filter((produto) => {
return produto.promocao === true;
});

response.status(200).json(produtosPromocao)

// ou const produtosPromocao = produtos.filter((produto) => produto.promocao);
})

app.post("/criar-produto", (request, response)=>{
const {nome, descricao, preco, promocao} = request.body;

const id = Math.random().toString();

const novoProduto: produtosInterface = {
    id,
    nome,
    descricao,
    preco,
    promocao,
};

produtos.push(novoProduto);

response.status(201).json(produtos) 
});

app.put("/atualizar-produto/:id", (request, response)=>{
const params = request.params.id

 const atualizarProduto = produtos.find((produto) => {
     return produto.id === params;
 }) 
 
 if(!atualizarProduto){
     return response.status(400).send({message: "Produto não encontrado"})
 }
 
 

 console.log(atualizarProduto)
})

app.listen(3000, ()=>{
console.log("SERVIDOR ON NA PORTA 3000")
})