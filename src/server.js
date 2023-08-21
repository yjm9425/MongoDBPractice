const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { User } = require('./models/User');

const MONGO_URI = 'mongodb+srv://admin:@mongodbtutorial.od8rlcz.mongodb.net/?retryWrites=true&w=majority';

const server =  async () => {
  const mongoConnection = await mongoose.connect(MONGO_URI);
  
  app.use(express.json());
  
  app.get('/', function(req,res) {
    return res.send('hello world');
  });
  
  app.get('/user', async (req, res) => {
    try{ 
      const users = await User.find({});
      return res.send({ users });
    }catch(err) {
      console.log(err);
      return res.status(500).send({ err: err.message});
    }
  });
  
  app.get('/user/:userId', async(req, res) => {
    try {
      const { userId } = req.params;
      if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'invalid userId'})
      const user = await User.findOne({ _id: userId });
      return res.send({ user });
    } catch(err) {
      console.log(err);
      return res.status(500).send({ err: err.message});
    }
  });

  app.post('/user', async (req, res) => {
    try {
    let { username, name } = req.body;
      if(!username) return res.status(400).send({ err: 'username is required'});
      if(!name || !name.first || !name.last) return res.status(400).send({ err: 'Both first and last names are required'});

      const user = new User(req.body);
      await user.save();
      return res.send({ user });
    } catch(err) {
      console.log(err);
      return res.status(500).send({ err: err.message});
    }
  });

  app.delete('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;

      if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'invalid userId'});
      const user = await User.findOneAndDelete({ _id: userId });
      a
      return res.send({user});
    } catch(err) {
      console.log(err);
      return res.status(500).send({ err: err.message});
    }
  });

  app.put('/user/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'invalid userId'});
      const { age } = req.body;
      if(!age) return res.status(400).send({ err: 'age is required'});
      if(typeof age !== 'number') return res.status(400).send({ err: 'age must be a number'});

      const user = await User.findByIdAndUpdate(userId, { $set: { age } }, { new: true });
      return res.send({ user });
    } catch(err) {
      console.log(err);
      return res.status(500).send({ err: err.message});
    }
  });
  app.listen(3000, () => console.log('3000포트에서 작동중입니다.'));
}

server();

