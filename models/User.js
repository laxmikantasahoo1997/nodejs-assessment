import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  dob: { type: String, required: false },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  state: { type: String, required: false },
  zip: { type: String, required: false },
  email: { type: String, required: false },
  gender: { type: String, required: false },
  userType: { type: String, required: false },
});

const User = mongoose.model('User', userSchema);
export default User;