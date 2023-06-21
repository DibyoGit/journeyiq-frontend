import React from 'react'

function Avatar() {
    return (
        <div className=' flex items-center p-1'>
            <div className='h-10 w-10 '>
                <img className='border rounded-full ' alt='user'  src='/assests/img/avator.jpg'/>
            </div>
            <div className='flex flex-col text-sm p-2'>
                <span>Robert Downey Jr.</span>
                <span className='text-ellipsis'>robertdowney@gmail.com</span>
            </div>
        </div>
    )
}

export default Avatar