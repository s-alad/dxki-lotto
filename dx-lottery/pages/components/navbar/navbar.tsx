import React from 'react'

import s from './navbar.module.scss'

import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';

function Navbar() {
    return (
        <nav className={s.nav}>
            <div>eth 0x ....</div>
            <div className={s.actions}>
                <button>buy tickets</button>
                <button>register</button>
            </div>
            <div>
                <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer' />
            </div>
        </nav>
    )
}

export default Navbar