import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
