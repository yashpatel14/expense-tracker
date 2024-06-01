import { connect } from '@/lib/dbConfig';
import Budget from '@/models/budegetsModel';
import Expense from '@/models/expensesModel'
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        // Ensure the request method is GET
        if (request.method !== 'GET') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Extract email from query parameters
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email parameter is missing' }, { status: 400 });
        }

        const budgets = await Budget.find({ createdBy: email });

        return NextResponse.json({
            message: 'Budgets found',
            data: budgets
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {name, amount,createdBy,emojiIcon} = reqBody

        console.log(reqBody);

        
        const newBudget = new Budget({
            name,
            amount,
            createdBy,
            icon:emojiIcon
        })

        const savedBudget = await newBudget.save()
        console.log(savedBudget);

        return NextResponse.json({
            message: "Budget created successfully",
            success: true,
            savedBudget
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}

export async function DELETE(request: NextRequest) {
    try {
        // Ensure the request method is GET
        if (request.method !== 'DELETE') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Extract email from query parameters
        const { searchParams } = new URL(request.url);
        const budgetId = searchParams.get('budgetId');

    console.log("Parsed budgetId:", budgetId);

    if (!budgetId) {
      console.error('Budget ID is missing');
      return NextResponse.json({ error: 'Budget ID is missing' }, { status: 400 });
    }

    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
      console.error('Invalid Budget ID');
      return NextResponse.json({ error: 'Invalid Budget ID' }, { status: 400 });
    }

    const budgetObjectId = new mongoose.Types.ObjectId(budgetId);
    console.log("Converted budgetObjectId:", budgetObjectId);

        const deleteExpense = await Expense.deleteMany({budgetId:budgetObjectId});
        const deleteBudgets = await Budget.findByIdAndDelete({ _id: budgetObjectId });

        return NextResponse.json({
            message: 'Budgets found',
            data: deleteBudgets
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {name, amount,emojiIcon,id} = reqBody

        console.log(reqBody);

        
        // Find and update the budget by its ID
    const updatedBudget = await Budget.findByIdAndUpdate(
        id,
        { name, amount, icon: emojiIcon },
        { new: true, runValidators: true } // Return the updated document
      );
  
      // If no budget is found, return an error
    //   if (!updatedBudget) {
    //     return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    //   }
  
      // Return the updated budget
      return NextResponse.json({
        message: 'Budget updated successfully',
        success: true,
        data: updatedBudget
      });

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}
