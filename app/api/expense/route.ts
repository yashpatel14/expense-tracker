import { connect } from '@/lib/dbConfig';
import Budget from '@/models/budegetsModel';
import Expense from '@/models/expensesModel'
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    console.log("sddfsdfd");
    
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email parameter is missing' }, { status: 400 });
        }

    

    const expense = await Expense.find({  createdBy: email  });

    
console.log(expense);

    return NextResponse.json({
      message: 'Expense found',
      data: expense,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
    
  try {
    const { searchParams } = new URL(request.url);
    const expenseId = searchParams.get('id');

    console.log("Parsed budgetId:", expenseId);

    if (!expenseId) {
      console.error('Budget ID is missing');
      return NextResponse.json({ error: 'Budget ID is missing' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(expenseId)) {
      console.error('Invalid Budget ID');
      return NextResponse.json({ error: 'Invalid Budget ID' }, { status: 400 });
    }

    const expenseObjectId = new mongoose.Types.ObjectId(expenseId);
    console.log("Converted budgetObjectId:", expenseObjectId);

    const deletedExpense = await Expense.findByIdAndDelete(expenseObjectId);

    // if (!expense || expense.length === 0) {
    //   console.error('Expenses not found');
    //   return NextResponse.json({ error: 'Expenses not found' }, { status: 404 });
    // }

    return NextResponse.json({
      message: 'Expense Deleted',
      data: deletedExpense,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
