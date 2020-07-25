const inicioDebug = require('debug')('app:inicio');
const dbDebug = require('debug')('app:db');
const usuarios = require('./routes/usuarios');
const express = require('express');
const config = require('config');
//const logger = require('./logger');
const morgan = require('morgan');
const app = express();

app.use(express.json());   // recibir Body - Middleware 
app.use(express.urlencoded({ extended: true }));    // Permite recibir parametros key no solo como JSON
app.use(express.static('public'));  // para exponer los archivos contenidos en la carpeta public
app.use('/api/usuarios', usuarios);
//Configuracion de entornos
console.log('Aplicacion: ' + config.get('nombre'));
console.log('BD Server: '+ config.get('configDB.host'));

//console.log(app);
//Uso de middleware de tercero - Morgan
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan habilitado...');
    inicioDebug('Morgan esta habilitado...')
}

//Trabajos con la base de datos
dbDebug('Conectando con la bd...');

//app.use(logger);
// app.use(function (req, res, next) {
//     console.log('Autenticando....');
//     next();
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}...`);
})