import React from 'react'

import s from './admincontrols.module.scss'
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

function AdminControls() {
    const { contract, isLoading } = useContract("0x8d5a6517051Cf55aaec0cc60c2f29F2DcC68C5E0");
    const { data: commission } = useContractRead(contract, "ticketCommission")

    const { mutateAsync: DrawWinnerTicket } = useContractWrite(contract, "DrawWinnerTicket")
    const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll")
    const { mutateAsync: ResetLottery } = useContractWrite(contract, "restartDraw")
    const { mutateAsync: WithdrawCommission } = useContractWrite(contract, "WithdrawCommission")

    async function drawWinner() {
        console.log("drawWinner")
        const notif = toast.loading("Drawing winner...")
        try {
            const data = await DrawWinnerTicket({});
            toast.success("Winner drawn!", { id: notif })
        } catch (e) {
            console.log(e);
            toast.error("Error drawing winner", { id: notif })
        }
    }

    async function refundAll() {
        console.log("refundAll")
        const notif = toast.loading("Refunding all...")
        try {
            const data = await RefundAll({});
            toast.success("All refunded!", { id: notif })
        } catch (e) {
            console.log(e);
            toast.error("Error refunding all", { id: notif })
        }
    }

    async function resetLottery() {
        console.log("resetLottery")
        const notif = toast.loading("Resetting lottery...")
        try {
            const data = await ResetLottery({});
            toast.success("Lottery reset!", { id: notif })
        } catch (e) {
            console.log(e);
            toast.error("Error resetting lottery", { id: notif })
        }
    }

    async function withdrawcommission() {
        console.log("withdrawcommission")
        const notif = toast.loading("Withdrawing commission...")
        try {
            const data = await WithdrawCommission({});
            toast.success("Commission withdrawn!", { id: notif })
        } catch (e) {
            console.log(e);
            toast.error("Error withdrawing commission", { id: notif })
        }
    }

  return (
    <div className={s.admin}>
        <div className={s.panel}>
            <div className={s.title}>Admin Controls</div>
            <div className={s.commission}>
                total commission to be withdrawn: {
                    commission && ethers.utils.formatEther(commission.toString())
                }
            </div>
            <div className={s.controls}>
                <button className={s.control} onClick={drawWinner}>Draw Winner</button>
                <button className={s.control} onClick={refundAll}>Refund All</button>
                <button className={s.control} onClick={resetLottery}>Reset Lottery</button>
                <button className={s.control} onClick={withdrawcommission}>Withdraw Commission</button>
            </div>
        </div>
    </div>
  )
}

export default AdminControls