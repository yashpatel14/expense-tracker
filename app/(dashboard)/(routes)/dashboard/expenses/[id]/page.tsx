"use client"
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { PenBox, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';



const Expenses = ({ params,refreshData }) => {

    const { user } = useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    const [expensesList, setExpensesList] = useState([]);
    const route = useRouter()
    useEffect(() => {

        user && getBudgetInfo();
        getExpensesList();
    }, [user]);

    const getBudgetInfo = async () => {

        try {

            const result = await axios.get('/api/getUserBudgetInfo', {
                params: {
                    email: user.primaryEmailAddress,
                    budget_id: params.id
                },
            });
            const budgets = result.data.data;

            setBudgetInfo(budgets);


        } catch (error) {
            console.error('Error checking user budgets:', error);
        }
    }

    const getExpensesList = async () => {
        console.log("ffff" + params.id);

        try {
            const result = await axios.get('/api/getExpensesList', {
                params: {
                    budgetId: params.id
                },
            });
            const expenseList = result.data.data;

            setExpensesList(expenseList);
            refreshData();

        } catch (error) {
            console.error('Error checking Expense:', error);
        }
    }

    const deleteBudget = async () => {

        try {
            const result = await axios.delete('/api/budget', {
                params: {
                    budgetId: params.id
                },
            });
            const expenseList = result.data.data;
            console.log(expenseList);
            toast("Budget Deleted !");
            // setExpensesList(expenseList);
            // refreshData();
            route.push('/dashboard/budgets');

        } catch (error) {
            console.error('Error checking Expense:', error);
        }

    }
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses</h2>

        <EditBudget budgetInfo={budgetInfo} refreshData={()=>getBudgetInfo()} />
            <AlertDialog>
                <AlertDialogTrigger asChild><Button className="flex gap-2" variant="destructive"><Trash /> Delete</Button></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
                {budgetInfo && <BudgetItem budget={budgetInfo} />}
                <AddExpense budgetId={params.id} user={user} refreshData={() => getBudgetInfo()} />
            </div>
            <div className='mt-4'>
                <h2 className='font-bold text-lg'>Latest Expenses</h2>
                <ExpenseListTable expenseList={expensesList} refreshData={() => getBudgetInfo()} />
            </div>
        </div>
    )
}

export default Expenses