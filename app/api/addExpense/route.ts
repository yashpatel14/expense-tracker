import { connect } from '@/lib/dbConfig';
import Budget from '@/models/budegetsModel';
import Expense from '@/models/expensesModel'
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    console.log(request);
    try {
        const { searchParams } = new URL(request.url);
        
        const budget_id = searchParams.get('budgetId');
    
        
        console.log("Parsed budget_id:", budget_id);
    
        
    
        if (!mongoose.Types.ObjectId.isValid(budget_id)) {
          console.error('Invalid Budget ID');
          return NextResponse.json({ error: 'Invalid Budget ID' }, { status: 400 });
        }
    
        const budgetObjectId = new mongoose.Types.ObjectId(budget_id);
        console.log("Converted budgetObjectId:", budgetObjectId);
    
        const expense = await Expense.find({  _id: budgetObjectId });
    
        if (!expense) {
          console.error('Expenses not found');
          return NextResponse.json({ error: 'Expenses not found' }, { status: 404 });
        }
    
        const expenses = await Expense.find({ budgetId: budget._id });
        
    
        return NextResponse.json({
          message: 'expense found',
          data: expense,
        });
      } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
}

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {name, amount,createdBy,budgetId} = reqBody

        console.log(reqBody);

        
        const newExpense = new Expense({
            name,
            amount,
            createdBy,
            budgetId
        })

        const savedExpense = await newExpense.save()
        console.log(savedExpense);

        return NextResponse.json({
            message: "Expense created successfully",
            success: true,
            savedExpense
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}