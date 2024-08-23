export default [
	{ inputs: [], name: 'AccessControlBadConfirmation', type: 'error' },
	{
		inputs: [
			{ internalType: 'address', name: 'account', type: 'address' },
			{ internalType: 'bytes32', name: 'neededRole', type: 'bytes32' }
		],
		name: 'AccessControlUnauthorizedAccount',
		type: 'error'
	},
	{ inputs: [], name: 'EnforcedPause', type: 'error' },
	{ inputs: [], name: 'ExpectedPause', type: 'error' },
	{ inputs: [], name: 'InvalidInitialization', type: 'error' },
	{ inputs: [], name: 'NoPEICToRelease', type: 'error' },
	{ inputs: [], name: 'NotInitializing', type: 'error' },
	{ inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
	{ inputs: [], name: 'ZeroPEICLocked', type: 'error' },
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint64', name: 'version', type: 'uint64' }],
		name: 'Initialized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'lockedPEICAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'endTime', type: 'uint256' }
		],
		name: 'PEICLocked',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'releasedPEICAmount', type: 'uint256' }
		],
		name: 'PEICReleased',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
		name: 'Paused',
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
		inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
		name: 'Unpaused',
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
		name: 'PEIC_PRECISION',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'user', type: 'address' },
			{ internalType: 'uint88', name: 'amount', type: 'uint88' }
		],
		name: 'autoLock',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'initLockAmount', type: 'uint256' },
			{ internalType: 'uint256', name: 'currentLockAmount', type: 'uint256' },
			{ internalType: 'uint256', name: 'releaseAllPEICTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'currentTimeAt', type: 'uint256' },
			{ internalType: 'uint256', name: 'latestPEICReleasedAt', type: 'uint256' }
		],
		name: 'calcPEICRelease',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'pure',
		type: 'function'
	},
	{
		inputs: [],
		name: 'game',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
		name: 'getPendingPEICRelease',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'user', type: 'address' },
			{ internalType: 'uint256', name: 'currentTimeAt', type: 'uint256' }
		],
		name: 'getPendingPEICRelease',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
		name: 'getSubLocks',
		outputs: [
			{
				components: [
					{ internalType: 'uint32', name: 'initLockTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'latestPEICReleasedAt', type: 'uint32' },
					{ internalType: 'uint32', name: 'releaseAllPEICTime', type: 'uint32' },
					{ internalType: 'uint88', name: 'initLockAmount', type: 'uint88' },
					{ internalType: 'uint88', name: 'lockAmount', type: 'uint88' }
				],
				internalType: 'struct LockPEIC.SubLock[]',
				name: 'subLocks',
				type: 'tuple[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
		name: 'getUserLockData',
		outputs: [
			{
				components: [
					{ internalType: 'uint256', name: 'lockAmount', type: 'uint256' },
					{ internalType: 'uint256', name: 'countLock', type: 'uint256' }
				],
				internalType: 'struct LockPEIC.LockInfoResponse',
				name: 'lockInfo',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'uint32', name: 'initLockTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'latestPEICReleasedAt', type: 'uint32' },
					{ internalType: 'uint32', name: 'releaseAllPEICTime', type: 'uint32' },
					{ internalType: 'uint88', name: 'initLockAmount', type: 'uint88' },
					{ internalType: 'uint88', name: 'lockAmount', type: 'uint88' }
				],
				internalType: 'struct LockPEIC.SubLock[]',
				name: 'subLockInfo',
				type: 'tuple[]'
			}
		],
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
			{ internalType: 'address', name: 'defaultAdmin', type: 'address' },
			{ internalType: 'contract IERC20Extended', name: '_pEIC', type: 'address' },
			{ internalType: 'address', name: '_game', type: 'address' }
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
		name: 'lock',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'lockPeriodForTesting',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'locks',
		outputs: [
			{ internalType: 'uint88', name: 'lockAmount', type: 'uint88' },
			{ internalType: 'uint16', name: 'countLock', type: 'uint16' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'pEIC',
		outputs: [{ internalType: 'contract IERC20Extended', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [],
		name: 'paused',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{ inputs: [], name: 'releasePEIC', outputs: [], stateMutability: 'nonpayable', type: 'function' },
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
		inputs: [{ internalType: 'address', name: '_game', type: 'address' }],
		name: 'setGame',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'durationInSeconds', type: 'uint256' }],
		name: 'setLockPeriodForTesting',
		outputs: [],
		stateMutability: 'nonpayable',
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
		inputs: [{ internalType: 'address', name: 'defaultAdmin', type: 'address' }],
		name: 'transferDefaultAdmin',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{ inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' }
] as const;
