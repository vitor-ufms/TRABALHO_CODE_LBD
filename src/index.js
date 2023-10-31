const express = require('express')
const app = express()
const port = 9009


app.post('/', function (req, res) {
    console.log('Dados recebidos no POST:', req.body);
    res.send('Got a POST request')
    
})


app.put('/', function (req, res) {
res.send('Got a PUT request at /user');
})

app.delete('/', function (req, res) {
res.send('Got a DELETE request at /user');
})

app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('Dados get recebidos no  get:', req.body);
})

app.get('/', function (req, res) {
    onsole.log('get  ...');
    res.send('about');
})
  
// app.all('/', function (req, res, next) {
//     console.log('Accessing the secret section ...');
//     res.send('Hello World!55555555')
//     next(); // pass control to the next handler
// })

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})