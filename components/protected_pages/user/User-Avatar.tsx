"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useState } from 'react'

export default function UserAvatar({ userId }: { userId: string }) {

    const supabase = createClientComponentClient()

    const uploadImage = async (e: any) => {
        let file = e.target.file[0]
        // const {}=await supabase.storage.from("user_pf").upload(`${userId}/${uuidv}`,file)

    }
    return (
        <div className='w-full flex justify-between items-center'>
            <div className="h-[100px] w-[100px] rounded-full my-1 bg-gray-300 text-center">image</div>
            <div>
                <div className="relative ">
                    <label htmlFor="file-input" className="bg-black text-xs text-white px-3 py-2 rounded-md cursor-pointer">
                        Change Image
                    </label>
                    <input id="file-input" type="file" className='hidden' onChange={(e) => uploadImage(e)} />
                </div>
            </div>
        </div>
    )
}
