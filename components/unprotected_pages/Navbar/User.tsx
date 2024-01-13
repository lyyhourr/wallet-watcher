"use client"
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function UserAccount() {

    const isLoggedIn = false

    return (
        <Link href={isLoggedIn ? "/user-setting" : "/login"}>
            <User className="w-7 h-7" />
        </Link>
    )
}
