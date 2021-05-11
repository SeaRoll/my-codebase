import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: false},
  role: {type: Number, required: true},
  group: {type: String, required: false},
  password: {type: String, required: true}
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;