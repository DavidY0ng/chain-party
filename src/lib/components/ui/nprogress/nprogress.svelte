<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { navigating } from '$app/stores';
	import { fade } from 'svelte/transition';

	// progress bar value
	const p: any = tweened(0, {
		duration: 200,
		easing: cubicOut
	});

	let isVisible = false;

	function increase() {
		if ($p >= 0 && $p < 0.2) {
			p.update((_: any) => _ + 0.04);
		} else if ($p >= 0.2 && $p < 0.5) {
			p.update((_: any) => _ + 0.02);
		} else if ($p >= 0.5 && $p < 0.8) {
			p.update((_: any) => _ + 0.002);
		} else if ($p >= 0.8 && $p < 0.99) {
			p.update((_: any) => _ + 0.0005);
		} else {
			p.set(0);
		}

		if ($navigating) {
			const rand = Math.round(Math.random() * (300 - 50)) + 50;
			setTimeout(function () {
				increase();
			}, rand);
		}
	}

	$: {
		if ($navigating) {
			increase();
			isVisible = true;
		}
		if (!$navigating) {
			p.update((_: any) => _ + 0.3);
			setTimeout(function () {
				p.set(1);
				setTimeout(function () {
					isVisible = false;
					p.set(0);
				}, 100);
			}, 100);
		}
	}
</script>

{#if $p > 0 && $p < 1 && isVisible}
	<progress value={$p} transition:fade={{ duration: 300 }} />
{/if}

<style>
	progress {
		--bar-color: rgba(212, 13, 13, 0.3);
		--val-color: #ff0099;
		position: fixed;
		top: 0;
		z-index: 99999;
		left: 0;
		height: 3.5px;
		width: 100vw;
		border-radius: 0;
	}
	/* bar: */
	progress::-webkit-progress-bar {
		background-color: #ff0099;
		width: 100%;
	}
	progress {
		background-color: #ff0099;
	}

	/* value: */
	progress::-webkit-progress-value {
		background-color: #ff0099 !important;
	}
	progress::-moz-progress-bar {
		background-color: #ff0099 !important;
	}
	progress {
		color: #ff0099;
	}
</style>
