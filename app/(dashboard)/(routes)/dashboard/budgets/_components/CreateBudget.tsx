"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'


const CreateBudget = ({refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState("😃");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const { user } = useUser();

    const userEmailAddress = user?.emailAddresses[0]?.emailAddress || "";

    console.log("user", userEmailAddress);

    const onCreateBudget = async () => {
        try {
            const result = await axios.post("/api/budget", { name, amount, createdBy: userEmailAddress, emojiIcon });

            
            refreshData();
            toast("New Budget created.")
        } catch (error: any) {
            console.log("Insert failed", error.message);
            toast.error(error.message);
        }

    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>

                    <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2>Create New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button className='text-lg' variant="outline" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{emojiIcon}</Button>
                                <div className='absolute z-20'>
                                    <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                        setEmojiIcon(e.emoji)
                                        setOpenEmojiPicker(false)
                                    }
                                    } />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input placeholder='e.g Home Decor' onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input type='number' placeholder='e.g 5000$' onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                {/* <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className='mt-5 w-full bg-black text-white hover:bg-blue'>Create Budget</Button> */}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button disabled={!(name && amount)} onClick={() => onCreateBudget()} className='mt-5 w-full bg-black text-white hover:bg-blue'>Create Budget</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateBudget