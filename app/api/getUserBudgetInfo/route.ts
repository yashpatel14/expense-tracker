import { connect } from '@/lib/dbConfig';
import Budget from '@/models/budegetsModel';
import Expense from '@/models/expensesModel';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  console.log("Received request:", request.url);

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const budget_id = searchParams.get('budget_id');

    console.log("Parsed email:", email);
    console.log("Parsed budget_id:", budget_id);

    if (!email || !budget_id) {
      console.error('Email or Budget ID missing');
      return NextResponse.json({ error: 'Email and Budget ID are required' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(budget_id)) {
      console.error('Invalid Budget ID');
      return NextResponse.json({ error: 'Invalid Budget ID' }, { status: 400 });
    }

    const budgetObjectId = new mongoose.Types.ObjectId(budget_id);
    console.log("Converted budgetObjectId:", budgetObjectId);

    const budget = await Budget.findOne({ createdBy: email, _id: budgetObjectId });

    if (!budget) {
      console.error('Budget not found');
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    const expenses = await Expense.find({ budgetId: budget._id });
    const expenseCount = expenses.length;
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const budgetWithExpenses = {
      ...budget.toObject(),
      expenseCount,
      totalAmount,
    };

    return NextResponse.json({
      message: 'Budget found',
      data: budgetWithExpenses,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
