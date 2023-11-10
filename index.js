const express = require('express')
const app = express()
const fs = require('fs');
const moment = require('moment');
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
const Sequelize = require('sequelize');

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

app.get('/img', (req, res) => {
    const imagemPath = 'src/img.jpg'; // Substitua pelo caminho da sua imagem
    const imagem = fs.readFileSync(imagemPath);

    // Defina o cabeçalho da resposta com o tipo de conteúdo da imagem
    res.contentType('image/jpeg');

    // Envie a imagem como resposta
    res.send(imagem);

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

app.get('/atualizar_cliente.html', function (req, res) {
    res.sendFile(__dirname + '/src/atualizar_cliente.html');
})

app.get('/listar_carros.html', function (req, res) {
    // onsole.log('get  ...');
    console.log(' listar carros :');
    res.sendFile(__dirname + '/src/listar_carros.html');
})

app.get('/cadastrar_venda.html', function (req, res) {
    res.sendFile(__dirname + '/src/cadastrar_venda.html');
})

app.get('/excluir_veiculo.html', function (req, res) {
    res.sendFile(__dirname + '/src/excluir_veiculo.html');
})

app.get('/visualizar_salario.html', function (req, res) {
    res.sendFile(__dirname + '/src/visualizar_salario.html');
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

// Atualizar cliente
app.post('/updateCliente', async (req, res) => {
    try {
        const { id_cliente, cpf, nome, endereco, telefone, data_nasc, sexo } = req.body;

        // Verifique se o cliente com o mesmo CPF já existe no banco de dados
        const clienteExistente = await Cliente.findOne({
            where: {
                cpf: cpf,
            },
        });

        if (!clienteExistente) {
            // res.send('Cliente com este CPF já cadastrado.');
            return res.status(400).json({ error: 'Cliente com este CPF não cadastrado.' });
        }

        // Crie um novo cliente no banco de dados
        const updateCliente = await Cliente.update({
            nome: nome,
            endereco: endereco,
            telefone: telefone,
            data_nasc: data_nasc,
            sexo: sexo,
        }, {
            where: { id_cliente: id_cliente },
            returning: true
        });

        res.status(201).send("Cliente atualizado com sucesso!");
        // res.send('Cliente inserido com sucesso');
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// Rota para cadastrar um novo veiculo
app.post('/insertVeiculo', async (req, res) => {
    try {
        const { ano_fabricacao, valor, cor, id_modelo } = req.body; // veiculos é um array

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
        const { id_cliente, id_funcionario, metodo_pagamento, valor, veiculos } = req.body; // veiculos é um array

        const comissao = 0.01 * valor; // Calcula a comissão

        // Crie uma nova venda no banco de dados
        const novaVenda = await Venda.create({
            id_cliente: id_cliente,
            id_funcionario: id_funcionario,
            data: new Date(),
            valor: valor,
            metodo_pagamento: metodo_pagamento,
            comissao: parseFloat(comissao.toFixed(2)),
        });

        // Itere sobre o array de veículos e insira cada veículo vendido na venda
        for (let i = 0; i < veiculos.length; i++) {
            let veiculo = await Veiculo.findByPk(veiculos[i]);
            await novaVenda.addVeiculo(veiculo);
        }

        res.status(201).send("Venda realizada com sucesso!");
    } catch (error) {
        console.error('Erro ao cadastrar venda:', error);
        res.status(500).send('Erro interno do servidor!');
    }
});

// Retorna todos os veículos disponíveis para venda
app.get('/selectVeiculosDisponiveis', async (req, res) => {
    try {
        // Consulte todos os veículos disponíveis no banco de dados
        const veiculosDisponiveis = await Veiculo.findAll({
            include: [Modelo],
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

// Retorna todos os clientes cadastrados, apenas os campos id e nome
app.get('/selectClienteFullwithCPF/:cpf', async (req, res) => {
    const cpfCliente = req.params.cpf;

    try {
        // Consulte todos os clientes no banco de dados
        const clientesFull = await Cliente.findAll({
            where: {
                // Condições opcionais para filtrar clientes, se necessário
                cpf: cpfCliente
            }
        });

        res.status(200).json(clientesFull);
    } catch (error) {
        console.error('Erro ao recuperar o cliente informado:', error);
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

app.delete('/deleteVeiculo/:id', async (req, res) => {
    const veiculoId = req.params.id;

    try {
        // Verifique se o veículo existe no banco de dados
        const veiculo = await Veiculo.findByPk(veiculoId);

        if (veiculo) {
            // Se o veículo existir, exclua-o
            await veiculo.destroy();
            res.status(200).json({ message: 'Veículo excluído com sucesso.' });
        } else {
            res.status(404).json({ error: 'Veículo não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao excluir veículo:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao excluir veículo.' });
    }
});

app.get('/selectSalarioFuncionarioWithCPF/:cpf/:mes/:ano', async (req, res) => {
    const cpfFunc = req.params.cpf;
    const mes = req.params.mes;
    const ano = req.params.ano;

    // Formata as datas
    const dataInicial = moment(`${ano}-${mes}-01`).format('YYYY-MM-DD');
    const dataFinal = moment(`${ano}-${mes}-01`).endOf('month').format('YYYY-MM-DD');

    try {
        // Consulte o funcionário com base no CPF fornecido
        const funcionario = await Funcionario.findOne({
            where: {
                cpf: cpfFunc
            }
        });

        if (!funcionario) {
            res.status(404).json({ error: 'Funcionário não encontrado' });
            return;
        }

        // Consulte as vendas do funcionário para o mês específico e some as comissões
        var totalComissao = await Venda.sum('comissao', {
            where: {
                id_funcionario: funcionario.id_funcionario,
                data: {
                    [Sequelize.Op.gte]: dataInicial,
                    [Sequelize.Op.lte]: dataFinal
                }
            }
        });

        if (totalComissao == null) totalComissao = 0;

        // Calcule o salário total somando o salário base do funcionário e a comissão total das vendas
        const salarioTotal = parseFloat(funcionario.salario) + parseFloat(totalComissao);

        // Construa o objeto de resposta
        const resultado = {
            nome: funcionario.nome,
            cpf: funcionario.cpf,
            salario: funcionario.salario,
            comissao: totalComissao,
            salarioTotal: salarioTotal
        };

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Erro ao recuperar o funcionário informado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
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

        // Criação da trigger veiculos_log
        await database.query(`
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = 'veiculos_log' 
        AND tgrelid = 'veiculos'::regclass::oid 
        AND tgtype & (16+8+4) = (16+8+4);  -- AFTER INSERT, UPDATE, DELETE
      `).then(results => {
        if (results[0].length === 0) {
            database.query(`            
        create table veiculos_log(
            id_chave integer,
            valor_antigo decimal(10),
            valor_novo decimal(10),
            data_alteracao timestamp,
            tipo char(1)
            );
            
            CREATE OR REPLACE FUNCTION trigger_veiculos()
            RETURNS TRIGGER AS $$
            BEGIN
            IF TG_OP = 'UPDATE' THEN
                insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values ( old.id_veiculo, old.valor, new.valor, current_date, 'U');
                return new;
            ELSIF TG_OP = 'DELETE' THEN
                insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values ( old.id_veiculo, old.valor, null, current_date, 'D');
            ELSIF TG_OP = 'INSERT' THEN
                insert into veiculos_log (id_chave, valor_antigo, valor_novo, data_alteracao, tipo) values (new.id_veiculo,NULL, new.valor, current_date, 'I');
            END IF;
            RETURN NULL;
            END;
            $$ LANGUAGE plpgsql;
            
            CREATE TRIGGER veiculos_log
            AFTER INSERT OR UPDATE OR DELETE ON veiculos
            FOR EACH ROW
            EXECUTE FUNCTION trigger_veiculos(); 
            
            create table cliente_log(
                id_cliente integer,
                cpf_cliente varchar(11),
                nome_cliente varchar(100),
                data_cliente date,
                tipo char(1)
                );
                
                CREATE OR REPLACE FUNCTION trigger_clientes()
                RETURNS TRIGGER AS $$
                BEGIN
                  IF TG_OP = 'UPDATE' THEN
                    insert into cliente_log (id_cliente, cpf_cliente, nome_cliente, data_cliente, tipo) values (old.id_cliente, old.cpf, old.nome, current_date, 'U');
                    return new;
                  ELSIF TG_OP = 'DELETE' THEN
                      insert into cliente_log (id_cliente, cpf_cliente, nome_cliente, data_cliente, tipo) values (old.id_cliente, old.cpf, old.nome, current_date, 'D');
                  ELSIF TG_OP = 'INSERT' THEN
                    insert into cliente_log (id_cliente, cpf_cliente, nome_cliente, data_cliente, tipo) values (null, new.cpf, new.nome, current_date, 'I');
                 END IF;
                  RETURN NULL;
                END;
                $$ LANGUAGE plpgsql;
                
                CREATE TRIGGER cliente_log
                AFTER INSERT OR UPDATE OR DELETE ON clientes
                FOR EACH ROW
                EXECUTE FUNCTION trigger_clientes();                         
          `).then(() => {
            console.log('Trigger veiculos_log criada com sucesso.');
          }).catch(error => {
            console.error('Erro ao criar a trigger:', error);
          });
        } else {
          console.log('A trigger veiculos_log já existe.');
        }
      }).catch(error => {
        console.error('Erro ao verificar a trigger:', error);
      });

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

        // Verifica se a tabela de veiculos está vazia
        const veiculosCount = await Veiculo.count();
        if (veiculosCount === 0) {
            // Insere modelos se a tabela estiver vazia
            await Veiculo.bulkCreate(data.veiculoData);
        }

        // Verifica se a tabela de login está vazia
        const LoginCount = await Login.count();
        if (LoginCount === 0) {
            await Login.bulkCreate(data.loginData);
        }

        // Verifica se a tabela de funcionários está vazia
        const FuncionarioCount = await Funcionario.count();
        if (FuncionarioCount === 0) {
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