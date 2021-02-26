const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./../swagger_output.json')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/coodesh', {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true
});

app.get('/', (req, res) => {
    return res.send('Oi mundo!');
});

app.use('/', require('./router'));


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
require('./endpoints')(app)



app.listen(3678);
console.log('Servidor rodando na posta 3678');