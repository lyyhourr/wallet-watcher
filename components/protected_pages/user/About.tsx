"use client"
import { inter } from '@/fonts/Fonts'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Textarea } from '../../ui/textarea'
import { Button } from '../../ui/button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
interface IProps {
    defaultValue: string
    userId: string
}

export default function About(props: IProps) {
    const [open, setOpen] = useState(false)
    const [about, setAbout] = useState("")
    const router = useRouter()
    const handleUpdate = async () => {

        const supabase = createClientComponentClient()
        const { data: existingUser } = await supabase
            .from("user_info")
            .select("user_id")
            .eq("user_id", props.userId);

        if (existingUser?.length) {
            const { error } = await supabase
                .from("user_info")
                .update([{
                    about
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
                    about,
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
    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full justify-between">
                <p className={`${inter.className} text-xl`}>About</p>
                <button onClick={() => setOpen(p => !p)} >
                    <Pencil />
                </button>
            </div>
            {
                !open &&
                <p>{props.defaultValue}</p>
            }
            {
                open &&
                <div className='flex flex-col gap-2'>
                    <Textarea defaultValue={props.defaultValue} onChange={(e) => setAbout(e.target.value)} />
                    <div className='flex justify-end gap-3'>
                        <Button onClick={handleUpdate}>Update</Button>
                        <Button onClick={() => setOpen(false)} variant={"outline"}>Cancel</Button>
                    </div>
                </div>
            }
        </div>
    )
}
