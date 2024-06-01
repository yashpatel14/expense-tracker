import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader } from 'lucide-react';

const AddExpense = ({budgetId,user,refreshData}) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [loding,setLoding]=useState(false);

    const userEmailAddress = user?.emailAddresses[0]?.emailAddress || "";

    const addNewExpense=async()=>{
        try {
            setLoding(true);
            const result = await axios.post("/api/addExpense", { name, amount, budgetId: budgetId, createdBy: userEmailAddress });

            setName("");
            setAmount("");
            if(result){
                setLoding(false);
                refreshData();
                toast("New Expense created.")
            }
            setLoding(false);
        } catch (error: any) {
            console.log("Insert failed", error.message);
            toast.error(error.message);
        }
    }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input placeholder='e.g Bedroom Decor' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input placeholder='e.g 1000' value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <Button onClick={()=>addNewExpense()} disabled={!(name && amount)|| loding} className='mt-5 w-full bg-black text-white hover:bg-blue'>
                {loding? <Loader className='animate-spin' />:"Add New Expense"}
                </Button>
        </div>
    );
};

export default AddExpense;
