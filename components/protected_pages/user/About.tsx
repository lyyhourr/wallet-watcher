"use client"
import { inter } from '@/fonts/Fonts'
import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Textarea } from '../../ui/textarea'
import { Button } from '../../ui/button'
interface IProps {
    defaultValue: string
}

export default function About(props: IProps) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex w-full flex-col gap-5">
            <div className="flex w-full justify-between">
                <p className={`${inter.className} text-xl`}>About</p>
                <button onClick={() => setOpen(p => !p)}>
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
                    <Textarea defaultValue={props.defaultValue} />
                    <div className='flex justify-end gap-3'>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button>Update</Button>
                    </div>
                </div>
            }
        </div>
    )
}
