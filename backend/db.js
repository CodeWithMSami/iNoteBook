const mongoose = require('mongoose');

const mongosUrl = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connect_mongos = () =>{
    mongoose.connect(mongosUrl,()=>{
        console.log('Connected to Mongoes!')
    })
}

module.exports = connect_mongos;