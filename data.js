const fabricanteData = [
    { 
        nome: 'Fiat', 
        cnpj: '12345678901234', 
        endereco: 'Rua Carro, 123', 
        telefone: '12345678901', 
        razao_social: 'FCA FIAT CHRYSLER AUTOMOVEIS BRASIL LTDA' 
    },
    { 
        nome: 'Chevrolet',
        cnpj: '68345678901234', 
        endereco: 'Av Ugra, 452', 
        telefone: '65923232326', 
        razao_social: 'General Motors do Brasil Ltda' }
];

const modeloData = [
    { nome: '500', versao: 'Riva', id_fabricante: 1},
    { nome: 'Uno Mille', versao: 'Way', id_fabricante: 1 },
    { nome: 'Onix', versao: 'LTZ',  id_fabricante: 2 },
    { nome: 'Camaro', versao: 'Coupe 6.2 SS',  id_fabricante: 2 }
];

const veiculoData = [
    {
        ano_fabricacao: 2020,
        valor: 80000.00,
        cor: 'Preto',
        id_modelo: 1
    },
    {
        ano_fabricacao: 2022,
        valor: 400000.00,
        cor: 'Amarelo',
        id_modelo: 4
    },
    {
        ano_fabricacao: 2017,
        valor: 40000.00,
        cor: 'Prata',
        id_modelo: 2
    },
];

const funcionariosData = [
    {
        nome: 'João Silva',
        cpf: '12345678901',
        endereco: 'Rua Funcionário 1, 123',
        email: 'joao.silva@example.com',
        data_nasc: '1990-01-01',
        sexo: 'M',
        salario: 3000.00,
        id_login: 1
    },
    {
        nome: 'Maria Oliveira',
        cpf: '23456789012',
        endereco: 'Rua Funcionário 2, 456',
        email: 'maria.oliveira@example.com',
        data_nasc: '1985-05-15',
        sexo: 'F',
        salario: 3500.00,
        id_login: 2
    },
    {
        nome: 'Carlos Santos',
        cpf: '34567890123',
        endereco: 'Rua Funcionário 3, 789',
        email: 'carlos.santos@example.com',
        data_nasc: '1988-10-20',
        sexo: 'M',
        salario: 3200.00,
        id_login: 3
    }
];

const loginData = [
    {
        login: 'joao.silva',
        senha: 'senha'
    },
    {
        login: 'maria.oliveira',
        senha: '12345678'
    },
    {
        login: 'carlos.santos',
        senha: 'carlos123'
    }
];

module.exports = {
    fabricanteData,
    modeloData,
    veiculoData,
    funcionariosData,
    loginData
};