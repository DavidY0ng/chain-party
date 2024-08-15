import { bscClient, walletClient } from '$lib/web3/client';
import {
	getContract,
	type Abi,
	type Account,
	type Address,
	type Chain,
	type Client,
	type GetContractReturnType,
	type PublicClient,
	type Transport
} from 'viem';
import contractConfig from './contract.config.json';

import mEICToken from './abi/MeicToken';
import MockUSDT from './abi/MockUSDT';
import PartyTicket from './abi/PartyTicket';
import pEICToken from './abi/pEICToken';
import TestGame from './abi/TestGame';
import TestStakingMEIC from './abi/TestStakingMEIC';

export const contracts = contractConfig.contracts;
export const listABIs: { [K in keyof typeof contracts]: Abi } | Record<string, never> = {};
export const wagmiContracts:
	| { [K in keyof typeof contracts]: { address: Address; abi: Abi } }
	| Record<string, never> = {};

let allABIs: Abi = [];

function _getContract<
	TAbi extends Abi,
	TClient extends {
		public: Client<Transport, Chain | undefined>;
		wallet?: Client<Transport, Chain | undefined, Account | undefined> | undefined;
	}
>(name: keyof typeof contracts, abi: TAbi, client: PublicClient) {
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
	}) as GetContractReturnType<TAbi, TClient, Address>;
}

// Define your contract instance here
export const mockUSDTContract = _getContract('mockUSDT', MockUSDT, bscClient);
export const partyTicketContract = _getContract('PartyTicket', PartyTicket, bscClient);
export const mEICTokenContract = _getContract('mEICToken', mEICToken, bscClient);
export const pEICTokenContract = _getContract('pEICToken', pEICToken, bscClient);
export const testGameContract = _getContract('TestGame', TestGame, bscClient);
export const testStakingMEICContract = _getContract('TestStakingMEIC', TestStakingMEIC, bscClient);
