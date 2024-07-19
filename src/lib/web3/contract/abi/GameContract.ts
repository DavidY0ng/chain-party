export default [
	{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
	{ inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
	{
		inputs: [
			{ internalType: 'address', name: 'account', type: 'address' },
			{ internalType: 'bytes32', name: 'neededRole', type: 'bytes32' }
		],
		name: 'AccessControlUnauthorizedAccount',
		type: 'error'
	},
	{ inputs: [], name: 'NoRefundRequired', type: 'error' },
	{ inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
	{
		inputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'endTime', type: 'uint256' }
		],
		name: 'RoundNotEnded',
		type: 'error'
	},
	{ inputs: [], name: 'RoundNotStarted', type: 'error' },
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'GameClosed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'endTime', type: 'uint256' }
		],
		name: 'GameInitiated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' }
		],
		name: 'GameParticipated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'previousAdminRole', type: 'bytes32' },
			{ indexed: true, internalType: 'bytes32', name: 'newAdminRole', type: 'bytes32' }
		],
		name: 'RoleAdminChanged',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'account', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }
		],
		name: 'RoleGranted',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ indexed: true, internalType: 'address', name: 'account', type: 'address' },
			{ indexed: true, internalType: 'address', name: 'sender', type: 'address' }
		],
		name: 'RoleRevoked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'meic', type: 'uint256' }
		],
		name: 'UserClaimReward',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'usdt', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'eic', type: 'uint256' }
		],
		name: 'UserRefund',
		type: 'event'
	},
	{
		inputs: [],
		name: 'ADMIN_ROLE',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'DEFAULT_ADMIN_ROLE',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'MAX_NUM_PLAYER_PER_SLOT',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'MAX_NUM_ROUNDS_PER_SESSION',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'ROUND_ID',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'TICKET_EIC_PRICE',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'TICKET_USDT_PRICE',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], name: 'claimReward', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{ inputs: [], name: 'closeRound', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [],
		name: 'currentRound',
		outputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'endTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'countParticipants', type: 'uint256' },
			{ internalType: 'uint256', name: 'slotsFilled', type: 'uint256' },
			{ internalType: 'uint256', name: 'winnerPosition', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes32', name: 'role', type: 'bytes32' }],
		name: 'getRoleAdmin',
		outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'grantRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'hasRole',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'contract IERC20', name: '_usdt', type: 'address' },
			{ internalType: 'contract IERC20Extended', name: '_mEIC', type: 'address' },
			{ internalType: 'contract IRandomNumberGen', name: '_rng', type: 'address' }
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'initiateRound',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'isRoundActive',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'isUserSlotCancelled',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'mEIC',
		outputs: [{ internalType: 'contract IERC20Extended', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], name: 'play', outputs: [], stateMutability: 'payable', type: 'function' },
	{
		inputs: [{ internalType: 'bool', name: 'noRefundRequired', type: 'bool' }],
		name: 'refund',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'callerConfirmation', type: 'address' }
		],
		name: 'renounceRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'resetRoundId',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes32', name: 'role', type: 'bytes32' },
			{ internalType: 'address', name: 'account', type: 'address' }
		],
		name: 'revokeRole',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'rng',
		outputs: [{ internalType: 'contract IRandomNumberGen', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
		name: 'supportsInterface',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'usdt',
		outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	}
] as const;
