const express = require('express');
const app = express();
const morgan = require('morgan');

//Settings
app.set('port',process.env.PORT || 3000);

//MiddleWares
app.use( morgan('dev') );
app.use(express.json());

// CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Routes
app.use(require ('./routes/routesEmployees') );

//Server Startup
app.listen( app.get('port') , () => {
    console.log(`SERVER LISTENING ON PORT ${app.get('port')}`);
});