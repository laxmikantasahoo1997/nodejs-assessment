import mongoose from 'mongoose';

const policyInfoSchema = new mongoose.Schema({
  policyNumber: { type: String, required: true },
  policyStartDate: { type: String, required: false },
  policyEndDate: { type: String, required: false },
  policyCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCategory', required: false },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'PolicyCarrier', required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

const PolicyInfo = mongoose.model('PolicyInfo', policyInfoSchema);
export default PolicyInfo;