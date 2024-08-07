<script lang="ts">
	import { cn } from '$lib/utils';

	export let value = 0;
	export let max = 100;

	let className: string | undefined = undefined;
	export { className as class };

	$: progressPath = () => {
		if (value <= 0) {
			return '';
		} else if (value >= max) {
			return 'M50,5A45 45 0 1 1 49.9999 5';
		} else {
			const angle = Math.PI * 2 * (value / max);
			const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
			const y = 50 + Math.sin(angle - Math.PI / 2) * 45;

			let path = 'M50,5';

			if (angle > Math.PI) {
				path += 'A45 45 0 0 1 50 95';
			}

			path += `A45 45 0 0 1 ${x} ${y}`;

			return path;
		}
	};
</script>

<div class={cn('relative h-full w-full', className)}>
	<svg viewBox="-10 0 120 100" class="absolute inset-0 h-full w-full">
		<defs>
			<linearGradient id="progress-gradient" gradientTransform="rotate(68.85)">
				<stop offset="35.79%" stop-color="#F7762E" />
				<stop offset="105.58%" stop-color="#F4DA4F" />
			</linearGradient>
		</defs>
		<!-- Track path -->
		<path d="M50,5A45 45 0 1 1 49.9999 5" class="track-path" />
		<!-- Progress path -->
		<path d={progressPath()} class="progress-path" />
	</svg>
	<div class="flex items-center justify-center">
		<slot>
			<span>{value}</span>
		</slot>
	</div>
</div>

<style>
	svg {
		fill: var(--progress-fill, transparent);
		height: 100%;
		width: 100%;
		stroke-linecap: var(--progress-linecap, round);
	}

	.track-path {
		stroke: var(--progress-trackcolor, rgba(0, 0, 0, 0.25));
		stroke-width: var(--progress-trackwidth, 20px);
	}

	.progress-path {
		stroke: url(#progress-gradient);
		stroke-width: var(--progress-width, 15px);
	}

	div {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	span {
		position: absolute;
	}
</style>
