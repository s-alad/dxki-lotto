import Image from 'next/image'
import { Inter } from 'next/font/google'

import s from './index.module.scss'

import { useAddress, useContract, useMetamask, useContractRead } from "@thirdweb-dev/react";
import { ethers } from 'ethers';


export default function Home() {
	const { contract, isLoading } = useContract("0x23519D3BC43004a6160297d4D3410Be9b35B1283");
	console.log("contract", contract);
	console.log(contract, isLoading);

	const address = useAddress();
	console.log("address", address);
	console.log(address);

	const connectWithMetamask = useMetamask()

	const { data: remainingTickets } = useContractRead(
		contract,
		"RemainingTickets"
	);

	const { data: totalPool } = useContractRead(
		contract,
		"CurrentWinningReward"
	);

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
				</div>
				<div className={s.ticketing}>
					<div className={s.title}>Tickets</div>
					<div className={s.ticketer}>
						<div className={s.ticket}>
							<div className={s.price}>
								<span>Price per ticket</span>
								<span>0.01 Matic</span>
							</div>
							<div className={s.buy}>
								<label>tickets</label>
								<input type='number' placeholder='1'></input>
							</div>
							<div className={s.details}>
								<div className={s.detail}>
									<span>total</span>
									<span>0.01 Matic</span>
								</div>
								<div className={s.detail}>
									<span>service fee</span>
									<span>0.0001 Matic</span>
								</div>
								<div className={s.detail}>
									<span>network fee</span>
									<span>TBC</span>
								</div>
							</div>
							<button className={s.purchase}>
								Buy Tickets
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
