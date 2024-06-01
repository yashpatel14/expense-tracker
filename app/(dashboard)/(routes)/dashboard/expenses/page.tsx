"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';


const Expense = () => {
    const {user}=useUser();
  const [budgetList,setBudgetList]=useState([]);
  const [expensesList,setexpensesList]=useState([]);
  const router=useRouter();

  useEffect(()=>{
    user&&getAllExpenses();
},[user])
  
  const getAllExpenses=async()=>{
    try {
      const result = await axios.get('/api/expense', {
        params: {
          email: user.primaryEmailAddress,
        },
      });
      const expenseList = result.data.data;
      setexpensesList(expenseList);
      console.log("Expenses:", expenseList);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
    
  }

  return (
    
        <div className='p-10'>
        <h2 className='font-bold text-3xl'>My Expense</h2>
        <ExpenseListTable expenseList={expensesList} refreshData={()=>getAllExpenses()}/>
        </div>
    
  )
}

export default Expense