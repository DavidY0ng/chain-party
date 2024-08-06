<script lang="ts">
	import * as Home from '$lib/components/page/home';
	import { Text } from '$lib/components/ui/text';
	import { fade } from 'svelte/transition';
</script>

<div in:fade class="relative h-full min-h-screen w-full">
	<div id="background-eclipse-1" />
	<div class="relative z-[99] m-auto max-w-[1400px] space-y-28">
		<div id="Pool List" class=" space-y-5">
			<div class="flex w-full">
				{#each Array(2) as _, i}
					<Home.BigPoolCard index={i} />
				{/each}
			</div>
			<div class="grid grid-cols-3 gap-x-5">
				{#each Array(3) as _, i}
					<Home.SmallPoolCard />
				{/each}
			</div>
		</div>

		<div id="Jackpot Pool" class="flex flex-col items-center space-y-5">
			<div class="jackpotPool relative z-10 w-full max-w-[1000px] rounded-2xl pb-5 pt-10">
				<img
					src="/img/home/jackpot&pool.png"
					class="absolute -top-[40%] left-[50%] translate-x-[-50%]"
					alt=""
				/>
				<div class="flex w-full items-end justify-center gap-x-2">
					{#each Array(10) as _, i}
						<div
							class="bubbleNumber flex h-[60px] w-full max-w-[50px] items-center justify-center rounded-2xl text-center text-2xl font-bold"
						>
							1
						</div>
						<Text size="3xl" class="font-bold">,</Text>
					{/each}
				</div>
			</div>
			<div class="w-full space-y-3">
				<div
					id="jackpotTableHeader"
					class="flex w-full items-center justify-between rounded-xl bg-[#481555] px-7 py-4 font-bold"
				>
					<Text>Address</Text>
					<Text>Won Times</Text>
				</div>
				<div class="overflow-hidden rounded-2xl">
					<div class="selfContainer w-full border-x-[6px]">
						<div class="rounded bg-[#000000]/30 px-6 py-4">
							<Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
						</div>
					</div>
				</div>
				<div class="h-[500px] w-full overflow-y-scroll rounded-2xl bg-black/20">
					{#each Array(10) as _, i}
						<div class="flex items-center justify-between px-8 py-4">
							<Text>0x9693CD9713496b0712f52E5F0c7b8948abdA824D</Text>
							<Text>3</Text>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style scoped>
	#background-eclipse-1 {
		position: absolute;
		width: 560px;
		height: auto;
		aspect-ratio: 1;
		border-radius: 50%;
		opacity: 0.5;
		filter: blur(120px);
		transform: translateZ(0);
		background-color: #ff0099;
		top: -40%;
		left: -10%;
	}

	.jackpotPool {
		background: radial-gradient(45.78% 88.85% at 50% 100%, #5b1dab 0%, rgba(0, 0, 0, 0.25) 100%);
	}

	#jackpotTableHeader {
		border-bottom: 2px solid;
		border-image-source: linear-gradient(
			90deg,
			rgba(255, 94, 220, 0) 0%,
			#ff5edc 50.5%,
			rgba(255, 94, 220, 0) 100%
		);
	}

	.selfContainer {
		border-style: solid;
		border-image: linear-gradient(
				180deg,
				rgba(255, 94, 220, 0) 0%,
				#ff5edc 50.5%,
				rgba(255, 94, 220, 0) 100%
			)
			1;
	}
</style>
