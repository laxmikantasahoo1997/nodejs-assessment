import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true,
  },
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
