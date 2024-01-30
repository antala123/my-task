import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Home() {
    return (
        <div className='bg-gray-800 p-5'>
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white text-lg font-bold">Company Name</div>

                <div className='flex gap-4'>
                    <NavLink
                        to="/profile"
                        className="text-white hover:text-gray-300"
                    >
                        Profile
                    </NavLink>
                </div>
            </div>



        </div>

    )
}
