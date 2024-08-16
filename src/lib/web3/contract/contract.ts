import { bscClient, walletClient } from '$lib/web3/client';
import { getContract, type Abi, type Address, type PublicClient } from 'viem';
import contractConfig from './contract.config.json';

import Game from './abi/Game';
import LockedPEIC from './abi/LockedPEIC';
import mEICToken from './abi/MeicToken';
import MockUSDT from './abi/MockUSDT';
import PartyTicket from './abi/PartyTicket';
import pEICToken from './abi/pEICToken';

export const contracts = contractConfig.contracts;
export const listABIs: { [K in keyof typeof contracts]: Abi } | Record<string, never> = {};
export const wagmiContracts:
	| { [K in keyof typeof contracts]: { address: Address; abi: Abi } }
	| Record<string, never> = {};

let allABIs: Abi = [];

function _getContract<TAbi extends Abi>(
	name: keyof typeof contracts,
	abi: TAbi,
	client: PublicClient
) {
	allABIs = [...allABIs, ...abi];

	listABIs[name] = abi;

	wagmiContracts[name] = {
		address: contracts[name] as Address,
		abi: abi
	};

	return getContract({
		address: `0x${contracts[name as keyof typeof contracts].slice(2)}`,
		abi: abi,
		client: {
			public: client,
			wallet: walletClient
		}
	});
}

// Define your contract instance here
export const mockUSDTContract = _getContract('mockUSDT', MockUSDT, bscClient);
export const partyTicketContract = _getContract('PartyTicket', PartyTicket, bscClient);
export const mEICTokenContract = _getContract('mEICToken', mEICToken, bscClient);
export const pEICTokenContract = _getContract('pEICToken', pEICToken, bscClient);
export const gameContract = _getContract('Game', Game, bscClient);
export const LockedPEICContract = _getContract('LockedPEIC', LockedPEIC, bscClient);
