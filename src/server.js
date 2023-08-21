const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { userRouter} = require('./routes/userRoute');
const { User } = require('../models/User');

const MONGO_URI = 'mongodb+srv://admin:@mongodbtutorial.od8rlcz.mongodb.net/?retryWrites=true&w=majority';

const server =  async () => {
  const mongoConnection = await mongoose.connect(MONGO_URI);
  
  app.use(express.json());
  app.use('user', userRouter);
  
  app.listen(3000, () => console.log('3000포트에서 작동중입니다.'));
}

server();

