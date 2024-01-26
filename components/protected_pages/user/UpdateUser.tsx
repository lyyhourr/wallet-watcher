"use client"
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import toast from 'react-hot-toast'
import { inter } from '@/fonts/Fonts'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

interface IProps {
    defaultValue: string | ""
    column: string
    select?: boolean
    date?: boolean
    userId: string
}

export default function UpdateUser(props: IProps) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(props.defaultValue);
    const supabase = createClientComponentClient()
    const router = useRouter()

    const validation = () => {
        if (value.length < 4 && props.column !== "gender") {
            toast.error("input field must have more than 4 characters")
            return false
        }
        if (value.length > 15) {
            toast.error("input fields is too long")
            return false
        }
        if (props.column === "phonenumber") {
            if (isNaN(Number(value))) {
                toast.error("phone number must be numbers only")
                return false
            }
        }
        return true
    }


    const handleUpdate = async (e: any) => {
        e.preventDefault()
        const check = validation()
        if (check) {

            const { data: existingUser } = await supabase
                .from("user_info")
                .select("user_id")
                .eq("user_id", props.userId);

            if (existingUser?.length) {
                const { error } = await supabase
                    .from("user_info")
                    .update([{
                        [props.column]: value
                    }])
                    .eq("user_id", props.userId);

                if (error) {
                    toast.error(error.message)
                    return;
                }
                setOpen(false)
                toast.success("updated successfull")
                router.refresh()
            } else {
                const { error } = await supabase
                    .from("user_info")
                    .insert([{
                        [props.column]: value,
                        user_id: props.userId
                    }]);
                if (error) {
                    toast.error(error.message)
                    return;
                }
                setOpen(false)
                toast.success("updated successfull")
                router.refresh()
            }
        }
    }

    return (
        <div className=''>
            {
                !open && <button onClick={() => setOpen(true)} className='flex justify-end'><Pencil /></button>
            }
            {
                open && (
                    <form onSubmit={handleUpdate} className='flex flex-col gap-2 w-full'>
                        {
                            props.select &&
                            (<select name="" defaultValue={props.defaultValue} id="" className={`${inter.className} py-1 px-2 rounded-sm bg-white`} onChange={(e) => setValue(e.target.value)}>

                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>)
                        }
                        {
                            !props.select &&
                            <Input defaultValue={props.defaultValue} type={props.date ? "date" : "text"} onChange={(e) => setValue(e.target.value)} />
                        }
                        <div className='flex items-center gap-5 justify-end'>
                            <Button onClick={handleUpdate} disabled={props.defaultValue === value}>Update</Button>
                            <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                        </div>
                    </form>
                )
            }

        </div>
    )
}
