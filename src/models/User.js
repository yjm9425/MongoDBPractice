const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String, 
    required: true,
    unique: true // 이미 생성된 데이터 있으면 적용하지 못함
  },
  name: {
    first: {
      type: String, 
      required: true,
    },
    last: {
      type: String,
      required: true,
    }
  },
  age: Number,
  email: String,
}, { timestamps: true });


const User = model('user', UserSchema);
module.exports = { User };