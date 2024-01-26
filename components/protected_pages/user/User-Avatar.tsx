"use client"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

export default function UserAvatar({ userId }: { userId: string }) {
    const [media, setMedia] = useState<any>([])
    const supabase = createClientComponentClient()
    const uploadImage = async (e: any) => {
        let file = e.target.files[0]
        if (!file) {
            return;
        }
        const { data, error } = await supabase
            .storage
            .from('user_pf')
            .upload(userId + "/" + uuidv4(), file)
        if (data) {
            toast.success("file uploaded")
        }
        if (error) {
            toast.error(error.message)
        }
    }

    React.useEffect(() => {

        const getMedia = async () => {
            const res = await supabase.storage.from("buckets").list(userId + "/")
            if (res) {
                setMedia(res)


            }
            // if (error) {
            //     toast.error(error.message)
            // }
        }
        getMedia()
    }, [])
    return (
        <div className='w-full flex justify-between items-center'>
            {
                media?.length && (

                    <Image
                        src={`https://quxwwbszmhifyfrqslyf.supabase.co/storage/v1/object/public/user_pf/cbbf5661-2cf6-4939-9460-8dbb4b3295ee/${media.name}`}
                        width={1000}
                        height={1000}
                        alt='user avatar'
                        className='w-[100px] h-[100px] rounded-full'
                    />
                )
            }
            {!media?.length &&
                <div className="h-[100px] w-[100px] rounded-full my-1 bg-gray-300 text-center">avatar</div>
            }
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
