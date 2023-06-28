import Image from 'next/image'
import { Inter } from 'next/font/google'

import s from './index.module.scss'

import { useAddress, useContract, useMetamask, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
import { useState } from 'react';
import CountdownTimer from './components/countdown/countdowntimer';
import toast from 'react-hot-toast';


export default function Home() {
	const { contract, isLoading } = useContract("0x1411A703aFD7C7B92b06Bf751b17Dba760F59e5f");

	const address = useAddress();

	const connectWithMetamask = useMetamask()

	let [quantity, setQuantity] = useState(1);

	const { data: remainingTickets } = useContractRead(contract,"RemainingTickets");

	const { data: totalPool } = useContractRead(contract,"CurrentWinningReward");

	const { data: ticketPrice } = useContractRead(contract, "ticketPrice");

	const { data: ticketCommission } = useContractRead(contract, "ticketCommission");

	const { data: expiration } = useContractRead(contract, "expiration");

	const { data: myTickets } = useContractRead(contract, "getTicketsForAddress", [address])

	const { data: myWinnings } = useContractRead(contract, "getWinningsForAddress", [address])
	console.log("myWinnings", myWinnings);

	const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")

	const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings")

	async function withdrawWinnings() {
		console.log("withdrawWinnings")
		const notif = toast.loading("Withdrawing winnings...")
		try {
			const data = await WithdrawWinnings({});
			toast.success("Winnings withdrawn!", { id: notif })
		} catch (e) {
			console.log(e);
			toast.error("Error withdrawing winnings", { id: notif })
		}
	}

	async function handlePurchase() {
		console.log("handlePurchase")
		if (!ticketPrice) return;
		console.log("ticketPrice", ticketPrice);
		console.log("quantity", quantity);
		console.log("ticketCommission", ticketCommission);
		console.log("PURCHASING")

		const notif = toast.loading("Purchasing tickets...")

		try {
			const data = await BuyTickets(
				{
					overrides: {
						value: ethers.utils.parseEther((Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString())
					}
				}
			);
			toast.success("Tickets purchased!", { id: notif })

		} catch (e) {
			console.log(e);
			toast.error("Error purchasing tickets", { id: notif })
		}
	}

		


	if (isLoading) return (
		<div className={s.login}>
			loading...
		</div>
	)

	if (!address) {
		return (
			<div className={s.login}>
				please login to develop a gambling addiction
				<button onClick={() => connectWithMetamask()}>connect with metamask</button>
			</div>
		)
	}

	return (
		<main>
			<div className={s.content}>
				<div className={s.nextdraw}>
					<div className={s.title}>Next Draw</div>
					<div className={s.stats}>
						<div className={s.stat}>
							<div>Total Pool</div>
							<div>{totalPool && ethers.utils.formatEther(totalPool.toString())} Matic</div>
						</div>
						<div className={s.stat}>
							<div>Tickets Remaining</div>
							<div>{remainingTickets?.toNumber()}</div>
						</div>
					</div>

						<CountdownTimer />

				</div>
				<div className={s.ticketing}>
					<div className={s.title}>Enter Lottery</div>
					<div className={s.ticketer}>
						<div className={s.ticket}>
							<div className={s.price}>
								<span>Price per ticket</span>
								<span>
									{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())} Matic
								</span>
							</div>
							<div className={s.buy}>
								<label>tickets</label>
								<input 
									type='number'
									placeholder='1'
									min='1'
									max={'10'}
									value={quantity}
									onChange={(e) => {setQuantity(Number(e.target.value))}}
								></input>
							</div>
							<div className={s.details}>
								<div className={`${s.detail} ${s.total}`}>
									<span>total</span>
									<span>
										{
											ticketPrice && remainingTickets && 
											(
												Number(ethers.utils.formatEther(ticketPrice.toString())) + 
												Number(ethers.utils.formatEther(ticketCommission.toString()))
											) * quantity
										}
										{' Matic'}
									</span>
								</div>
								<div className={s.detail}>
									<span>+ service fee</span>
									<span>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())} Matic</span>
								</div>
								<div className={s.detail}>
									<span>+ network fee</span>
									<span>TBC</span>
								</div>
							</div>
							<button className={`${s.purchase} disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
								disabled={remainingTickets?.toNumber() < quantity || expiration?.toString() < Date.now().toString()}
								onClick={() => {handlePurchase()}}
							>
								{
									ticketPrice && remainingTickets && <div>Buy {quantity} ticket for {Number(ethers.utils.formatEther(ticketPrice.toString())) * quantity} Matic</div>
								}
							</button>
						</div>
					</div>
				</div>
				<div className={s.balance}>
					<div className={s.title}>Your Tickets</div>
					<div className={s.mytickets}>
						{
							myTickets && myTickets.map((ticket: any) => {
								return (
									<div className={s.myticket}>
										<div className={s.ticketnumber}>{ticket.toString()}</div>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
			<div className={s.winning}>
				{
					myWinnings && myWinnings > 0 && (
						<div className={s.won}>
							<div className={s.windetails}>
								<div className={s.title}>You won!</div>
								<div>Total winnings: {ethers.utils.formatEther(myWinnings.toString())} Matic</div>
							</div>
							<button onClick={withdrawWinnings}>Claim</button>
						</div>
					)
				}
			</div>
		</main>
	)
}
