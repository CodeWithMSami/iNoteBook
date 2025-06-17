const express = require('express')
const connect_mongos = require('./db');
var cors = require('cors')

connect_mongos();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/auth/user', require('./routes/auth'))
app.use('/auth/notes', require('./routes/notes'))


app.listen(port, ()=>{
  console.log(`Example connection to http://localhost:${port}`)
})
