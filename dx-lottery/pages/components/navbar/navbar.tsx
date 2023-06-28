import React from 'react'

import s from './navbar.module.scss'

import { Bars3BottomRightIcon } from '@heroicons/react/24/solid';
import { useAddress, useDisconnect } from '@thirdweb-dev/react';

function Navbar() {

    let address = useAddress();
    let disconnect = useDisconnect();

    if (!address) return (
        <nav className={s.nav}>
            <div>dx-lotto</div>
        </nav>
    )

    return (
        <nav className={s.nav}>
            <div>{address?.substring(0,5)}...{address?.substring(address.length, address.length - 5)}</div>
            <div className={s.name}>
                THE KI OFFSHORE GAMBLING ADDICITON LAB
            </div>
            <div className={s.actions}>
                {/* <button>buy tickets</button> */}
                <button onClick={disconnect}>logout</button>
            </div>
            {/* <div>
                <Bars3BottomRightIcon className='h-8 w-8 mx-auto text-white cursor-pointer' />
            </div> */}
        </nav>
    )
}

export default Navbar