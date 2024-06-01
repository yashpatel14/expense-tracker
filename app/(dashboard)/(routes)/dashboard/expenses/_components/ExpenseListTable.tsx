import axios from 'axios';
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

const ExpenseListTable = ({expenseList,refreshData}) => {

    const deleteExpense = async (expenseId) => {
        try {
          await axios.delete('/api/getExpensesList', {
            params: { id: expenseId }
          });
          toast("Expense Deleted")
          refreshData();
        //   setExpensesList(expensesList.filter(expense => expense._id !== expenseId));
        } catch (error) {
          console.error('Error deleting expense:', error);
        }
      };

  return (
    <div className='mt-3'>
        <div className='grid grid-cols-4 bg-slate-200 p-2'>
            <h2 className='font-bold'>Name</h2>
            <h2 className='font-bold'>Amount</h2>
            <h2 className='font-bold'>Date</h2>
            <h2 className='font-bold'>Action</h2>
        </div>
        {expenseList?.length > 0 ? (
        expenseList.map((expense, index) => (
          <div key={index} className='grid grid-cols-4 bg-slate-50 p-2'>
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{expense.createdAt}</h2>
            <h2>
                <Trash className='text-red-600 cursor-pointer' onClick={() => deleteExpense(expense._id)}/>
            </h2>
          </div>
        ))
      ) : (
        <div>No expenses found</div>
      )}
    </div>
  )
}

export default ExpenseListTable