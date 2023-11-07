const express = require('express')
const app = express()
const port = 9009

const database = require('./db');
const data = require('./data');

const Cliente = require('./models/cliente');
const Fabricante = require('./models/fabricante');
const Login = require('./models/login');
const Funcionario = require('./models/funcionario');
const Modelo = require('./models/modelo');
const Veiculo = require('./models/veiculo');
const Venda = require('./models/venda');
const vendaVeiculo = require('./models/vendaVeiculo');

app.use(express.json()); // Para analisar dados JSON no corpo da solicitação
app.use(express.urlencoded({ extended: true })); // Para analisar dados codificados no corpo da solicitação


app.post('/', function (req, res) {
    console.log('Dados recebidos no POST:', req.body);
    res.send('Sucesso ao criar o novo usuário');
})


app.put('/', function (req, res) {
    res.send('Got a PUT request at /user');
})

app.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user');
})

app.get('/', (req, res) => {
    // res.send('Hello World!')
    res.sendFile(__dirname + '/src/index.html');
    //console.log('Dados get recebidos no  get:', req.body);
    console.log('Parâmetros de consulta recebidos no GET:', req.query);
})

app.get('/index.html', (req, res) => {
    // res.send('Hello World!')
    res.sendFile(__dirname + '/src/index.html');
    //console.log('Dados get recebidos no  get:', req.body);
    console.log('Parâmetros de consulta recebidos no GET:', req.query);
})

app.get('/cadastrar_cliente.html', function (req, res) {
    // onsole.log('get  ...');
    console.log(' cadastrar_cliente.html :');
    res.sendFile(__dirname + '/src/cadastrar_cliente.html');
})

app.get('/listar_carros.html', function (req, res) {
    // onsole.log('get  ...');
    console.log(' listar carros :');
    res.sendFile(__dirname + '/src/listar_carros.html');
})

app.get('/cadastrar_venda.html', function (req, res) {
    res.sendFile(__dirname + '/src/cadastrar_venda.html');
})

// Rota para cadastrar um novo cliente
app.post('/insertCliente', async (req, res) => {
    try {
        const { nome, cpf, endereco, telefone, data_nasc, sexo } = req.body;

        // Verifique se o cliente com o mesmo CPF já existe no banco de dados
        const clienteExistente = await Cliente.findOne({
            where: {
                cpf: cpf,
            },
        });

        if (clienteExistente) {
            // res.send('Cliente com este CPF já cadastrado.');
            return res.status(400).json({ error: 'Cliente com este CPF já cadastrado.' });
        }

        // Crie um novo cliente no banco de dados
        const novoCliente = await Cliente.create({
            nome: nome,
            cpf: cpf,
            endereco: endereco,
            telefone: telefone,
            data_nasc: data_nasc,
            sexo: sexo,
        });

        res.status(201).json(novoCliente);
        // res.send('Cliente inserido com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para cadastrar um novo veiculo
app.post('/insertVeiculo', async (req, res) => {
    try {
        const { ano_fabricacao, valor, cor, id_modelo} = req.body; // veiculos é um array

        // Crie uma nova venda no banco de dados
        const novoVeiculo = await Venda.create({
            ano_fabricacao: ano_fabricacao,
            valor: valor,
            cor: cor,
            idModelo: id_modelo,
        });

        res.status(201).json(novoVeiculo);
    } catch (error) {
        console.error('Erro ao cadastrar veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para cadastrar uma nova venda
app.post('/insertVenda', async (req, res) => {
    try {
        const { id_cliente, id_func, valor, metodo_pagamento, comissao, veiculos} = req.body; // veiculos é um array

        // Crie uma nova venda no banco de dados
        const novaVenda = await Venda.create({
            id_cliente: id_cliente,
            id_func: id_func,
            data: new Date(),
            valor: valor,
            metodo_pagamento: metodo_pagamento,
            comissao: comissao,
        });

        // Itere sobre o array de veículos e insira cada veículo vendido na venda
        for (let i = 0; i < veiculos.length; i++) {
            let veiculo = await Veiculo.findByPk(veiculos[i]);
            await novaVenda.addVeiculo(veiculo);
        }

        res.status(201).json(novaVenda);
    } catch (error) {
        console.error('Erro ao cadastrar venda:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Retorna todos os veículos disponíveis para venda
app.get('/selectVeiculosDisponiveis', async (req, res) => {
    try {
        // Consulte todos os veículos disponíveis no banco de dados
        const veiculosDisponiveis = await Veiculo.findAll({
            include: [Modelo, Fabricante],
            where: {
                // Condições opcionais para filtrar veículos, se necessário
            }
        });

        res.status(200).json(veiculosDisponiveis);
    } catch (error) {
        console.error('Erro ao recuperar veículos disponíveis:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Retorna todos os clientes cadastrados, apenas os campos id e nome
app.get('/selectClientesBasic', async (req, res) => {
    try {
        // Consulte todos os clientes no banco de dados
        const clientesBasic = await Cliente.findAll({
            attributes: ['id_cliente', 'nome'], // Especifica os campos que deseja retornar na consulta
            where: {
                // Condições opcionais para filtrar clientes, se necessário
            }
        });

        res.status(200).json(clientesBasic);
    } catch (error) {
        console.error('Erro ao recuperar clientes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
        
    }
    
});

// Retorna todos os funcionários cadastrados, apenas os campos id e nome
app.get('/selectFuncionarioBasic', async (req, res) => {
    try {
        // Consulte todos os funcionários no banco de dados
        const funcionariosBasic = await Cliente.findAll({
            attributes: ['id_funcionario', 'nome'], // Especifica os campos que deseja retornar na consulta
            where: {
                // Condições opcionais para filtrar funcionários, se necessário
            }
        });

        res.status(200).json(funcionariosBasic);
    } catch (error) {
        console.error('Erro ao recuperar funcionários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Retorna todos os modelos cadastrados, apenas os campos id e nome
app.get('/selectModeloBasic', async (req, res) => {
    try {
        // Consulte todos os funcionários no banco de dados
        const modelosBasic = await Modelo.findAll({
            attributes: ['id_modelo', 'nome'], // Especifica os campos que deseja retornar na consulta
            where: {
                // Condições opcionais para filtrar funcionários, se necessário
            }
        });

        res.status(200).json(modelosBasic);
    } catch (error) {
        console.error('Erro ao recuperar funcionários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// app.all('/', function (req, res, next) {
//     console.log('Accessing the secret section ...');
//     res.send('Hello World!55555555')
//     next(); // pass control to the next handler
// })

// Função assíncrona para sincronizar o banco de dados e inserir dados antes de iniciar o servidor
async function startServer() {
    try {
        // Sincroniza o banco de dados
        await database.sync();

        // Verifica se a tabela de fabricantes está vazia
        const fabricanteCount = await Fabricante.count();
        if (fabricanteCount === 0) {
            // Insere fabricantes se a tabela estiver vazia
            await Fabricante.bulkCreate(data.fabricanteData);
        }

        // Verifica se a tabela de modelos está vazia
        const modeloCount = await Modelo.count();
        if (modeloCount === 0) {
            // Insere modelos se a tabela estiver vazia
            await Modelo.bulkCreate(data.modeloData);
        }

        // Verifica se a tabela de login está vazia
        const LoginCount = await Login.count();
        if(LoginCount === 0){
            await Login.bulkCreate(data.loginData);
        }

        // Verifica se a tabela de funcionários está vazia
        const FuncionarioCount = await Funcionario.count();
        if(FuncionarioCount === 0){
            await Funcionario.bulkCreate(data.funcionariosData);
        }

        // Inicia o servidor
        console.log('Conexão com o banco de dados estabelecida. Iniciando o servidor...');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
}

// Chama a função para iniciar o servidor
startServer();