"use client"
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import {useRouter} from "next/navigation";
import { Toaster } from '@/components/ui/sonner'

const DashboardLayout = ({children}) => {
    const {user} = useUser();
    const router=useRouter();
    useEffect(()=>{
        user&&checkUserBudgets();
    },[user])

    const checkUserBudgets = async () => {
        try {
          const result = await axios.get('/api/budget', {
            params: {
              email: user.primaryEmailAddress,
            },
          });
          console.log(result.data.data);
          const budgets = result.data.data;
          if (budgets.length === 0) {
            router.push('/dashboard/budgets'); // Redirect if no budgets are found
          } else {
            console.log(budgets); // Log budgets if found
          }
        } catch (error) {
          console.error('Error checking user budgets:', error);
        }
      };

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
        <SideNav/>
        </div>
    <div className='md:ml-64'>
        <DashboardHeader/>
        {children}
    </div>
    <Toaster />
    </div>
  )
}

export default DashboardLayout