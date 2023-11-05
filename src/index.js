const express = require('express')
const app = express()
const port = 9009

app.use(express.json()); // Para analisar dados JSON no corpo da solicitação
app.use(express.urlencoded({ extended: true })); // Para analisar dados codificados no corpo da solicitação


app.post('/', function (req, res) {
    console.log('Dados recebidos no POST:', req.body);
    res.send('Sucesso ao criar o novo usuário')    
})


app.put('/', function (req, res) {
res.send('Got a PUT request at /user');
})

app.delete('/', function (req, res) {
res.send('Got a DELETE request at /user');
})

app.get('/', (req, res) => {
   // res.send('Hello World!')
    res.sendFile(__dirname + '/index.html');
    //console.log('Dados get recebidos no  get:', req.body);
    console.log('Parâmetros de consulta recebidos no GET:', req.query);
})

app.get('/index.html', (req, res) => {
    // res.send('Hello World!')
     res.sendFile(__dirname + '/index.html');
     //console.log('Dados get recebidos no  get:', req.body);
     console.log('Parâmetros de consulta recebidos no GET:', req.query);
 })

app.get('/cadastro_usuario.html', function (req, res) {
    // onsole.log('get  ...');
    console.log(' recebeu novo :');
    res.sendFile(__dirname + '/cadastro_usuario.html');
})

app.get('/listar_carros.html', function (req, res) {
    // onsole.log('get  ...');
    console.log(' listar carros :');
    res.sendFile(__dirname + '/listar_carros.html');
})

// app.all('/', function (req, res, next) {
//     console.log('Accessing the secret section ...');
//     res.send('Hello World!55555555')
//     next(); // pass control to the next handler
// })

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})