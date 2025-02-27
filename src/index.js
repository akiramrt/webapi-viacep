// Importanto as bibliotecas

const express = require('express'); //Biblioteca para criar um servidor
const axios = require('axios'); //Biblioteca para realizar uma requisição


const app = express();

const PORT = 3000;

//Endpoint para buscar o endereço pelo CEP

app.get('/cep/:cep', async (req, res) => {
    const {cep} = req.params;

    try{
        //Requisição para a API Viacep
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const endereco = response.data;

        //Caso o CEP não seja encontrado

        if (endereco.erro) {
            return res.status(400).json({ mensagem: 'CEP não encontrado.'});
        }

        //Retorna o endereço formatado
        res.json({
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            estado: endereco.uf
        });

    } catch (error){
        res.status(500).json({ mensagem: 'Erro ao consultar o CEP.'});
    };

    //Iniciando o servidor
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
});