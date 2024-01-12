import React from 'react'

export default function CenterScreen({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex items-center justify-center flex-col h-screen'>{children}</div>
    )
}
