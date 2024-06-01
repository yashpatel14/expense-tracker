// models/Expense.js

import mongoose from 'mongoose';




// Define the schema
const ExpenseSchema = new mongoose.Schema({
 
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  budgetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    required: true,
  },
  createdBy: {
    type: String,
  },
 
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});


// Export the model
export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
