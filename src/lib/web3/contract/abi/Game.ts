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
	{ inputs: [], name: 'ECDSAInvalidSignature', type: 'error' },
	{
		inputs: [{ internalType: 'uint256', name: 'length', type: 'uint256' }],
		name: 'ECDSAInvalidSignatureLength',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'bytes32', name: 's', type: 'bytes32' }],
		name: 'ECDSAInvalidSignatureS',
		type: 'error'
	},
	{ inputs: [], name: 'EnforcedPause', type: 'error' },
	{
		inputs: [{ internalType: 'uint256', name: 'suppliedPEIC', type: 'uint256' }],
		name: 'EntryFeeInsufficientPEIC',
		type: 'error'
	},
	{ inputs: [], name: 'ExpectedPause', type: 'error' },
	{
		inputs: [
			{ internalType: 'uint256', name: 'num_losers', type: 'uint256' },
			{ internalType: 'uint256', name: 'num_random_words', type: 'uint256' }
		],
		name: 'InsufficientRandomWords',
		type: 'error'
	},
	{ inputs: [], name: 'InvalidInitialization', type: 'error' },
	{
		inputs: [{ internalType: 'enum Game.RoundStatus', name: 'current', type: 'uint8' }],
		name: 'InvalidInitiateRoundStatus',
		type: 'error'
	},
	{
		inputs: [
			{ internalType: 'enum Game.RoundStatus', name: 'current', type: 'uint8' },
			{ internalType: 'enum Game.RoundStatus', name: 'expected', type: 'uint8' }
		],
		name: 'InvalidRoundStatus',
		type: 'error'
	},
	{ inputs: [], name: 'InvalidSignature', type: 'error' },
	{ inputs: [], name: 'NotInitializing', type: 'error' },
	{
		inputs: [
			{ internalType: 'uint256', name: 'given', type: 'uint256' },
			{ internalType: 'uint256', name: 'expected', type: 'uint256' }
		],
		name: 'RNGNotDrawn',
		type: 'error'
	},
	{ inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
	{
		inputs: [{ internalType: 'enum Game.RoundStatus', name: 'current', type: 'uint8' }],
		name: 'RoundAlreadySetTo',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'RoundCancelled',
		type: 'error'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'endTime', type: 'uint256' }
		],
		name: 'RoundIsActive',
		type: 'error'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'endTime', type: 'uint256' }
		],
		name: 'RoundIsInactive',
		type: 'error'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'value', type: 'uint256' },
			{ internalType: 'uint256', name: 'length', type: 'uint256' }
		],
		name: 'StringsInsufficientHexLength',
		type: 'error'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'UserJoined',
		type: 'error'
	},
	{ inputs: [], name: 'ZeroClaimableReward', type: 'error' },
	{ inputs: [], name: 'ZeroClaimableRewardAndRefund', type: 'error' },
	{ inputs: [], name: 'ZeroRefund', type: 'error' },
	{ inputs: [], name: 'ZeroUSDTToAddLiquidity', type: 'error' },
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'amountUSDTSwapped', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amountPEICSwapped', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amountUSDTAddLiquidity', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'amountPEICAddLiquidity', type: 'uint256' }
		],
		name: 'AddLiquidity',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'user', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'claimedPEICAmount', type: 'uint256' }
		],
		name: 'ClaimDailyReward',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'ticket_peic_price', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'max_num_player_per_slot', type: 'uint256' }
		],
		name: 'ConfigSet',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'DistributeRewards',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ indexed: false, internalType: 'bool', name: 'roundCancelled', type: 'bool' }
		],
		name: 'GameClosed',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' },
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
			{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'currentRoundPEICPrice', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'currentRoundUSDTPrice', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'userPosition', type: 'uint256' },
			{ indexed: false, internalType: 'bool', name: 'usingTicket', type: 'bool' }
		],
		name: 'GameParticipated',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: false, internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'loserPosition', type: 'uint256' },
			{ indexed: false, internalType: 'bytes32', name: 'randomWords', type: 'bytes32' }
		],
		name: 'GameRoundLoser',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint64', name: 'version', type: 'uint64' }],
		name: 'Initialized',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'pEICAmount', type: 'uint256' }
		],
		name: 'JackpotPoolDonation',
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
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'usdtRewardAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'pEICRewardAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'pEICLockedAmount', type: 'uint256' }
		],
		name: 'UserClaimReward',
		type: 'event'
	},
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: 'address', name: 'player', type: 'address' },
			{ indexed: false, internalType: 'uint256', name: 'usdtAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'pEICAmount', type: 'uint256' },
			{ indexed: false, internalType: 'uint256', name: 'partyTicketAmount', type: 'uint256' }
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
		name: 'ROUND_ID',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		name: 'USDTtoEICPaths',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'addLiquidity',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{
				components: [
					{ internalType: 'uint32', name: 'startTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'endTime', type: 'uint32' },
					{ internalType: 'uint24', name: 'countParticipants', type: 'uint24' },
					{ internalType: 'uint16', name: 'slotsFilled', type: 'uint16' },
					{ internalType: 'enum Game.RoundStatus', name: 'status', type: 'uint8' },
					{ internalType: 'uint16', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'NUM_LOSERS_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint16' },
					{ internalType: 'uint24', name: 'totalPartyTicketUsed', type: 'uint24' },
					{ internalType: 'uint72', name: 'WINNER_USDT_REWARD', type: 'uint72' },
					{ internalType: 'uint80', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint80' },
					{ internalType: 'uint80', name: 'LOSER_USDT_BALANCE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_PEIC_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_USDT_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'USDT_PEIC_RATE', type: 'uint80' }
				],
				internalType: 'struct Game.RoundInfo',
				name: 'roundInfo',
				type: 'tuple'
			}
		],
		name: 'calcRefund',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{
				components: [
					{ internalType: 'uint32', name: 'startTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'endTime', type: 'uint32' },
					{ internalType: 'uint24', name: 'countParticipants', type: 'uint24' },
					{ internalType: 'uint16', name: 'slotsFilled', type: 'uint16' },
					{ internalType: 'enum Game.RoundStatus', name: 'status', type: 'uint8' },
					{ internalType: 'uint16', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'NUM_LOSERS_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint16' },
					{ internalType: 'uint24', name: 'totalPartyTicketUsed', type: 'uint24' },
					{ internalType: 'uint72', name: 'WINNER_USDT_REWARD', type: 'uint72' },
					{ internalType: 'uint80', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint80' },
					{ internalType: 'uint80', name: 'LOSER_USDT_BALANCE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_PEIC_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_USDT_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'USDT_PEIC_RATE', type: 'uint80' }
				],
				internalType: 'struct Game.RoundInfo',
				name: 'roundInfo',
				type: 'tuple'
			}
		],
		name: 'calcRoundRewards',
		outputs: [
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' },
			{ internalType: 'uint256', name: '', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'bytes', name: 'signature', type: 'bytes' },
			{
				components: [{ internalType: 'uint256', name: 'amountPEIC', type: 'uint256' }],
				internalType: 'struct Game.DailyRewardSignaturePayload',
				name: 'payload',
				type: 'tuple'
			}
		],
		name: 'claimDailyReward',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'claimRoundReward',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'claimRoundRewardAndRefund',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'pEICRatePerUsdt', type: 'uint256' }],
		name: 'closeRound',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: '', type: 'address' }],
		name: 'dailyRewardSignatureNonces',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'distributeRewards',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'pEICAmount', type: 'uint256' }],
		name: 'donateJetpot',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getAllPendingRefund',
		outputs: [
			{ internalType: 'uint256', name: 'totalUSDT', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEIC', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPartyTicket', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getAllPendingReward',
		outputs: [
			{ internalType: 'uint256', name: 'totalUSDT', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEICReward', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEICLocked', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getCurrentRound',
		outputs: [
			{
				components: [
					{ internalType: 'uint32', name: 'startTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'endTime', type: 'uint32' },
					{ internalType: 'uint24', name: 'countParticipants', type: 'uint24' },
					{ internalType: 'uint16', name: 'slotsFilled', type: 'uint16' },
					{ internalType: 'enum Game.RoundStatus', name: 'status', type: 'uint8' },
					{ internalType: 'uint16', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'NUM_LOSERS_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint16' },
					{ internalType: 'uint24', name: 'totalPartyTicketUsed', type: 'uint24' },
					{ internalType: 'uint72', name: 'WINNER_USDT_REWARD', type: 'uint72' },
					{ internalType: 'uint80', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint80' },
					{ internalType: 'uint80', name: 'LOSER_USDT_BALANCE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_PEIC_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_USDT_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'USDT_PEIC_RATE', type: 'uint80' }
				],
				internalType: 'struct Game.RoundInfo',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getLiquidityInfo',
		outputs: [
			{
				components: [
					{ internalType: 'address', name: 'lpTokenOwner', type: 'address' },
					{ internalType: 'uint80', name: 'totalUSDTSinceLastLiquidity', type: 'uint80' },
					{ internalType: 'uint16', name: 'usdtSwapRatio', type: 'uint16' },
					{ internalType: 'bool', name: 'isBurnRemainingPEIC', type: 'bool' }
				],
				internalType: 'struct Game.PEICLiquidity',
				name: 'liquidityInfo',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'getPastRounds',
		outputs: [
			{
				components: [
					{ internalType: 'uint32', name: 'startTime', type: 'uint32' },
					{ internalType: 'uint32', name: 'endTime', type: 'uint32' },
					{ internalType: 'uint24', name: 'countParticipants', type: 'uint24' },
					{ internalType: 'uint16', name: 'slotsFilled', type: 'uint16' },
					{ internalType: 'enum Game.RoundStatus', name: 'status', type: 'uint8' },
					{ internalType: 'uint16', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'NUM_LOSERS_PER_SLOT', type: 'uint16' },
					{ internalType: 'uint16', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint16' },
					{ internalType: 'uint24', name: 'totalPartyTicketUsed', type: 'uint24' },
					{ internalType: 'uint72', name: 'WINNER_USDT_REWARD', type: 'uint72' },
					{ internalType: 'uint80', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint80' },
					{ internalType: 'uint80', name: 'LOSER_USDT_BALANCE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_PEIC_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'TICKET_USDT_PRICE', type: 'uint80' },
					{ internalType: 'uint80', name: 'USDT_PEIC_RATE', type: 'uint80' }
				],
				internalType: 'struct Game.RoundInfo',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ internalType: 'address', name: 'player', type: 'address' }
		],
		name: 'getRefundForRound',
		outputs: [
			{ internalType: 'uint256', name: 'totalUSDT', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEIC', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPartyTicket', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ internalType: 'address', name: 'player', type: 'address' }
		],
		name: 'getRewardForRound',
		outputs: [
			{ internalType: 'uint256', name: 'totalUSDT', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEICReward', type: 'uint256' },
			{ internalType: 'uint256', name: 'totalPEICLocked', type: 'uint256' }
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getRewardPoolConfig',
		outputs: [
			{
				components: [
					{ internalType: 'address', name: 'drSigner', type: 'address' },
					{ internalType: 'address', name: 'drTreasuryPool', type: 'address' },
					{ internalType: 'address', name: 'drJackpotPool', type: 'address' },
					{ internalType: 'address', name: 'drRewardPool', type: 'address' },
					{ internalType: 'address', name: 'drUplinkPool', type: 'address' },
					{ internalType: 'uint256', name: 'drTreasuryPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drJackpotPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drRewardPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drUplinkPoolPercentage', type: 'uint256' }
				],
				internalType: 'struct Game.RewardDistributionPoolConfig',
				name: '',
				type: 'tuple'
			}
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
		inputs: [{ internalType: 'uint256', name: 'roundId', type: 'uint256' }],
		name: 'getRoundLoserPosition',
		outputs: [{ internalType: 'uint256[]', name: 'loserPositions', type: 'uint256[]' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ internalType: 'uint256', name: 'loserId', type: 'uint256' }
		],
		name: 'getRoundLoserPosition',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' },
			{ internalType: 'uint256', name: 'usdtAmount', type: 'uint256' }
		],
		name: 'getUSDTtoPEICAmount',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getUserIsCurrentRoundRefunded',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getUserIsCurrentRoundRewardClaimed',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getUserLatestRoundJoined',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' }
		],
		name: 'getUserPosition',
		outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getUserRefundCancelledRoundPool',
		outputs: [
			{
				components: [
					{ internalType: 'uint256', name: 'partyTicketRoundId', type: 'uint256' },
					{ internalType: 'uint256', name: 'lastUpdatedRound', type: 'uint256' }
				],
				internalType: 'struct Game.RefundInfo',
				name: '',
				type: 'tuple'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'address', name: 'player', type: 'address' }],
		name: 'getUserUnclaimedRewardPool',
		outputs: [
			{
				components: [{ internalType: 'uint256', name: 'lastUpdatedRound', type: 'uint256' }],
				internalType: 'struct Game.UnclaimedRewardInfo',
				name: '',
				type: 'tuple'
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
			{
				components: [
					{ internalType: 'contract IERC20', name: 'usdt', type: 'address' },
					{ internalType: 'contract IERC20', name: 'partyTicket', type: 'address' },
					{ internalType: 'contract IERC20Extended', name: 'pEIC', type: 'address' },
					{ internalType: 'contract IGameRandomNumberGenerator', name: 'rng', type: 'address' },
					{ internalType: 'contract IPancakeRouter01', name: 'pancakeRouter', type: 'address' }
				],
				internalType: 'struct Game.AddressesParam',
				name: 'addressesConfig',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'address', name: 'drSigner', type: 'address' },
					{ internalType: 'address', name: 'drTreasuryPool', type: 'address' },
					{ internalType: 'address', name: 'drJackpotPool', type: 'address' },
					{ internalType: 'address', name: 'drRewardPool', type: 'address' },
					{ internalType: 'address', name: 'drUplinkPool', type: 'address' },
					{ internalType: 'uint256', name: 'drTreasuryPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drJackpotPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drRewardPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drUplinkPoolPercentage', type: 'uint256' }
				],
				internalType: 'struct Game.RewardDistributionPoolConfig',
				name: '_rewardPoolConfig',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'uint256', name: 'TICKET_PEIC_PRICE', type: 'uint256' },
					{ internalType: 'uint256', name: 'TICKET_USDT_PRICE', type: 'uint256' }
				],
				internalType: 'struct Game.TicketPriceParam',
				name: 'ticketConfig',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'uint256', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint256' },
					{ internalType: 'uint256', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint256' },
					{ internalType: 'uint256', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint256' }
				],
				internalType: 'struct Game.GameConfigParam',
				name: 'gameConfig',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'address', name: 'lpTokenOwner', type: 'address' },
					{ internalType: 'uint256', name: 'usdtSwapRatio', type: 'uint256' },
					{ internalType: 'bool', name: 'isBurnRemainingPEIC', type: 'bool' }
				],
				internalType: 'struct Game.PEICLiquidityConfigParam',
				name: 'liquidityConfigParam',
				type: 'tuple'
			}
		],
		name: 'initialize',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'uint256', name: 'startTime', type: 'uint256' },
			{ internalType: 'uint256', name: 'duration', type: 'uint256' }
		],
		name: 'initiateRound',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'isCurrentRoundActive',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'isCurrentRoundCancelled',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' }
		],
		name: 'isLoser',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' }
		],
		name: 'isUserJoinedRound',
		outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{ internalType: 'address', name: 'player', type: 'address' },
			{ internalType: 'uint256', name: 'roundId', type: 'uint256' }
		],
		name: 'isUserSlotCancelled',
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
		name: 'lockPEIC',
		outputs: [{ internalType: 'contract ILockPEIC', name: '', type: 'address' }],
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
	{
		inputs: [],
		name: 'pancakeRouter',
		outputs: [{ internalType: 'contract IPancakeRouter01', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'partyTicket',
		outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
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
	{
		inputs: [{ internalType: 'bool', name: 'usePartyTicket', type: 'bool' }],
		name: 'play',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{ inputs: [], name: 'refund', outputs: [], stateMutability: 'nonpayable', type: 'function' },
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
		inputs: [],
		name: 'rng',
		outputs: [{ internalType: 'contract IGameRandomNumberGenerator', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				components: [
					{ internalType: 'uint256', name: 'TICKET_PEIC_PRICE', type: 'uint256' },
					{ internalType: 'uint256', name: 'TICKET_USDT_PRICE', type: 'uint256' }
				],
				internalType: 'struct Game.TicketPriceParam',
				name: 'ticketPriceParam',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'uint256', name: 'MAX_NUM_PLAYER_PER_SLOT', type: 'uint256' },
					{ internalType: 'uint256', name: 'WINNER_USDT_REWARD_PERCENTAGE', type: 'uint256' },
					{ internalType: 'uint256', name: 'LOSER_LOCKEDPEIC_USDT_REWARD_RATE', type: 'uint256' }
				],
				internalType: 'struct Game.GameConfigParam',
				name: 'gameConfigParam',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'address', name: 'drSigner', type: 'address' },
					{ internalType: 'address', name: 'drTreasuryPool', type: 'address' },
					{ internalType: 'address', name: 'drJackpotPool', type: 'address' },
					{ internalType: 'address', name: 'drRewardPool', type: 'address' },
					{ internalType: 'address', name: 'drUplinkPool', type: 'address' },
					{ internalType: 'uint256', name: 'drTreasuryPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drJackpotPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drRewardPoolPercentage', type: 'uint256' },
					{ internalType: 'uint256', name: 'drUplinkPoolPercentage', type: 'uint256' }
				],
				internalType: 'struct Game.RewardDistributionPoolConfig',
				name: 'rewardDistPoolParam',
				type: 'tuple'
			},
			{
				components: [
					{ internalType: 'address', name: 'lpTokenOwner', type: 'address' },
					{ internalType: 'uint256', name: 'usdtSwapRatio', type: 'uint256' },
					{ internalType: 'bool', name: 'isBurnRemainingPEIC', type: 'bool' }
				],
				internalType: 'struct Game.PEICLiquidityConfigParam',
				name: 'liquidityConfigParam',
				type: 'tuple'
			}
		],
		name: 'setConfig',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'uint32', name: 'endTime', type: 'uint32' }],
		name: 'setCurrentRoundEndTimeForTesting',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				components: [
					{ internalType: 'address', name: 'lpTokenOwner', type: 'address' },
					{ internalType: 'uint256', name: 'usdtSwapRatio', type: 'uint256' },
					{ internalType: 'bool', name: 'isBurnRemainingPEIC', type: 'bool' }
				],
				internalType: 'struct Game.PEICLiquidityConfigParam',
				name: 'config',
				type: 'tuple'
			}
		],
		name: 'setLiquidityInfo',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [{ internalType: 'contract ILockPEIC', name: '_lockPEIC', type: 'address' }],
		name: 'setLockPEIC',
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
	{ inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
	{
		inputs: [],
		name: 'usdt',
		outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function'
	}
] as const;
