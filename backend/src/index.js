const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? 'env.test' : '.env'
})

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./../swagger_output.json')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true
});

app.get('/', (req, res) => {
    res.status(200).send('REST Fullstack Challenge 20201209 Running');
});


app.use('/', require('./router'));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(3000);
console.log('Servidor rodando na posta 3678');