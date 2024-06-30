import mongoose from 'mongoose';

const userAccountSchema = new mongoose.Schema({
  accountName: { type: String, required: true },
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);
export default UserAccount;