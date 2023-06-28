import React from 'react'

import s from './countdowntimer.module.scss'

import Countdown from 'react-countdown';

import {
    useContract, useContractRead
} from "@thirdweb-dev/react";

function CountdownTimer() {

    const { contract, isLoading } = useContract("0x23519D3BC43004a6160297d4D3410Be9b35B1283");
    const { data: expiration } = useContractRead(contract, "expiration");

    console.log("expiration", expiration);

    const renderer = ({ hours, minutes, seconds, completed }: any) => {
        if (completed) {
            return <div className={s.countdown}>EXPIRED</div>;
        } else {
            return (
                <div className={s.countdown}>
                    <div className={`${s.time} animate-pulse`}>
                        <div className={s.timevalue}>{hours}</div>
                        <div className={s.timelabel}>HOURS</div>
                    </div>
                    <div className={`${s.time} animate-pulse`}>
                        <div className={s.timevalue}>{minutes}</div>
                        <div className={s.timelabel}>MINUTES</div>
                    </div>
                    <div className={`${s.time} animate-pulse`}>
                        <div className={s.timevalue}>{seconds}</div>
                        <div className={s.timelabel}>SECONDS</div>
                    </div>
                </div>
            )
        }
    };

    return (

            <Countdown date={new Date(expiration * 1000)} renderer={renderer}/>

    )
}

export default CountdownTimer