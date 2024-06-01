import Link from 'next/link'
import React from 'react'

const BudgetItem = ({budget}) => {

    console.log(budget);

    const calculateProgressPerc=()=>{
        const perc=(budget.totalAmount / budget.amount) * 100;
        return perc.toFixed(2);
    }
    

  return (
    <Link href={`/dashboard/expenses/${budget._id}`}>
        <div  className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
        <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-2 px-4 bg-slate-100 rounded-full'>{budget.icon}</h2>
            <div>
                <h2 className='font-bold'>{budget.name}</h2>
                <h2 className='text-sm text-gray-500'>{budget.expenseCount} Item</h2>
            </div>
        </div>
            <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
            </div>
            <div className='mt-5'>
                <div className='flex items-center justify-between mb-3'>
                    <h2 className='text-xs text-slate-400'>${budget.totalAmount} Spend</h2>
                    <h2 className='text-xs text-slate-400'>${budget.amount - budget.totalAmount} Remaining</h2>
                </div>
                <div className='w-full bg-slate-300 h-2 rounded-full'>
                    <div className=' bg-green-600 h-2 rounded-full' style={{width:`${calculateProgressPerc()}%`}}></div>
                </div>
            </div>
            </div>
    </Link>
  )
}

export default BudgetItem