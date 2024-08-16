<script lang="ts">
	import CircleProgress from '$lib/components/ui/circle-progress/CircleProgress.svelte';
	import { Text } from '$lib/components/ui/text';
	import type { TGameRound } from '$lib/type/gameType';
	import { onDestroy } from 'svelte';

	export let round: TGameRound['data'][0];

	let countdown = '0:00';
	let interval: ReturnType<typeof setInterval> | undefined;
	let progress = 0;

	function countdownToTimestamp(targetTimestamp: number) {
		const startTimestamp = Date.now(); // Current time when countdown starts
		const targetDate = new Date(targetTimestamp);
		const targetTime = targetDate.getTime();
		const totalDuration = targetTimestamp - startTimestamp;

		function updateCountdown() {
			const now = new Date().getTime();
			const distance = targetTime - now;

			if (distance <= 0) {
				clearInterval(interval);
				interval = undefined;
				countdown = '0:00';
				progress = 100; // Ensure progress is 100% when countdown ends
				return;
			}

			const minutes = Math.floor(distance / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			countdown = `${minutes >= 10 ? minutes : `0${minutes}`}:${seconds < 10 ? '0' : ''}${seconds}`;

			// Calculate progress based on elapsed time
			const elapsed = totalDuration - distance;
			progress = Math.min((elapsed / totalDuration) * 100, 100); // Ensure progress does not exceed 100%
		}

		interval = setInterval(updateCountdown, 1000);
		updateCountdown(); // Initial call to set the countdown immediately
	}

	if (round.type === 'current') {
		countdownToTimestamp(round.date_time_end);
	}

	onDestroy(() => {
		if (interval) clearInterval(interval);
	});
</script>

<div class="flex h-full w-full items-center justify-center gap-x-1">
	<CircleProgress max={100} value={round.type === 'current' ? progress : 0} class="flex w-[110px] ">
		<div class="flex flex-col items-center">
			<Text
				size="lg"
				class=" font-normal {round.type === 'current' ? 'text-white' : 'text-white/50'}"
				>{countdown}</Text
			>
			<Text
				class=" text-[12px] font-normal {round.type === 'current' ? 'text-white' : 'text-white/50'}"
				>Min</Text
			>
		</div>
	</CircleProgress>
	<div class="h-[40%] w-[2px] translate-x-3 bg-white/20" />
	<div class="flex w-1/2 flex-col items-center text-center">
		<Text class="text-[12px]">Lucky number:</Text>
		<Text
			size="3xl"
			class="font-bold {round.type === 'current'
				? 'text-white'
				: round.type === 'upcoming'
					? 'text-white/50'
					: 'text-[#DF61FF]'}"
			>{round.type === 'current'
				? '1 ~ 20'
				: round.loser_position[0]
					? round.loser_position[0]
					: '-'}</Text
		>
	</div>
</div>
