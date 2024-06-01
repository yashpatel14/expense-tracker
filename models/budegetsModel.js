import mongoose from 'mongoose';

// Define the schema
const BudgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
  },
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

// Export the model
export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);