import React from 'react'

import s from './countdowntimer.module.scss'

import Countdown from 'react-countdown';

import {
    useContract, useContractRead
} from "@thirdweb-dev/react";

function CountdownTimer() {

    const { contract, isLoading } = useContract("0x8d5a6517051Cf55aaec0cc60c2f29F2DcC68C5E0");
    const { data: expiration } = useContractRead(contract, "expiration");

/*     console.log("expiration", expiration);
    console.log("expiration string", expiration.toString())
    console.log("expiration date", new Date(expiration * 1000)) */

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