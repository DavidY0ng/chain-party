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
import FakeUSDT from './abi/FakeUSDT';
import GameContract from './abi/GameContract';
import RNG from './abi/RNG';
import MeicToken from './abi/MeicToken';

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
export const fakeUsdtContract = _getContract('mockUSDT', FakeUSDT, bscClient);
export const gameContract = _getContract('PartyTicket', GameContract, bscClient);
export const rngContract = _getContract('mEICToken', RNG, bscClient);
export const meicTokenContract = _getContract('pEICToken', MeicToken, bscClient);
