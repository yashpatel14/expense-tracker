import { connect } from '@/lib/dbConfig';
import Budget from '@/models/budegetsModel';
import Expense from '@/models/expensesModel'
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

        const budgets = await Budget.find({ createdBy: email }).sort({ createdAt: -1 });

        // Fetch expenses count for each budget
    const budgetsWithExpenses = await Promise.all(
        budgets.map(async (budget) => {
          const expenseCount = await Expense.countDocuments({ budgetId: budget._id });
          return {
            ...budget.toObject(),
            expenseCount,
          };
        })
      );


        return NextResponse.json({
            message: 'Budgets found',
            data: budgetsWithExpenses
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}