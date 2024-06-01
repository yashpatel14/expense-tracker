"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import BudgetItem from './BudgetItem';

const BudgetList = () => {

  const {user} = useUser();
  const [budgetList,setBudgetList]=useState([]);
  const router=useRouter();

    useEffect(()=>{
        user&&getBudgetList();
    },[user])

    const getBudgetList = async()=>{
        try {
            const result = await axios.get('/api/getUserBudgets', {
              params: {
                email: user.primaryEmailAddress,
              },
            });
            const budgets = result.data.data;
            console.log(budgets);
            
            if (budgets && Array.isArray(budgets)) {
                setBudgetList(budgets);
                budgets.forEach((budget) => {
                    console.log(`Budget: ${budget.name}, Expense Count: ${budget.expenseCount}, Total Amount: ${budget.totalAmount}`);
                });
            } else {
                console.error('Unexpected response format:', result.data);
            }
            // if (budgets.length === 0) {
            //   router.push('/dashboard/budgets'); // Redirect if no budgets are found
            // } else {
            //   console.log(budgets); // Log budgets if found
            // }
          } catch (error) {
            console.error('Error checking user budgets:', error);
          }
    }

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <CreateBudget refreshData={()=>getBudgetList()}/>
            {budgetList.map((budget, index) => (
                    <BudgetItem key={index} budget={budget} />
                ))}
        </div>
    </div>
  )
}

export default BudgetList