"use client"
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import toast from 'react-hot-toast'
import { Command, CommandInput } from 'cmdk'
import { CommandGroup, CommandItem } from '../../ui/command'
import { inter } from '@/fonts/Fonts'

interface IProps {
    defaultValue: string | undefined
    column: string
    select?: boolean
    date?: boolean
}

export default function UpdateUser(props: IProps) {
    const [open, setOpen] = useState(false)
    const handleUpdate = () => {
        toast.success(`${props.column} updated`)
    }
    return (
        <div className=''>
            {
                !open && <button onClick={() => setOpen(true)} className='flex justify-end'><Pencil /></button>
            }
            {
                open && (
                    <div className='flex flex-col gap-2 w-full'>
                        {
                            props.select &&
                            (<select name="" id="" className={`${inter.className} py-1 px-2 rounded-sm bg-white`}>

                                <option value="male">male</option>
                                <option value="female">female</option>
                            </select>)
                        }
                        {
                            !props.select &&
                            <Input defaultValue={props.defaultValue} type={props.date ? "date" : "text"} />
                        }
                        <div className='flex items-center gap-5 justify-end'>
                            <Button onClick={handleUpdate}>Update</Button>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}
