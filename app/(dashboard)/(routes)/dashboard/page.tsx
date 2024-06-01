"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';


const Dashboard = () => {
  const {user}=useUser();
  const [budgetList,setBudgetList]=useState([]);
  const [expensesList,setexpensesList]=useState([]);
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
                getAllExpenses();
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
    <div className='p-5'>
        <h2 className='font-bold text-3xl'>Hi,{user?.fullName} ✌️</h2>
        <p className='text-gray-500'>Here's what happenning with your money, Lets Manage your expense</p>
        <CardInfo budgetList={budgetList}/>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
            <div className='md:col-span-2'>
                <BarChartDashboard budgetList={budgetList} />
                <ExpenseListTable expenseList={expensesList} refreshData={()=>getBudgetList()}/>
            </div>
            <div className='grid gap-5'>
              <h2 className='font-bold'>Latest Budgets</h2>
              {budgetList.map((budget,index)=>(
                  <BudgetItem budget={budget} key={index}/>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Dashboard