<script lang="ts">
	import {
		Button,
		type Props as ButtonProps,
		type buttonVariants
	} from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { VariantProps } from 'tailwind-variants';
	import { getEmblaContext } from './context.js';

	type CarouselDotProps = ButtonProps & {
		selectedIndex: number;
		index: number;
	};

	type $$Props = CarouselDotProps;

	let className: $$Props['class'] = undefined;
	export let selectedIndex: number = 0;
	export let index: number = 0;

	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'ghost';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'icon';
	const { scrollTo, handleKeyDown } = getEmblaContext('<Carousel.Dot/>');
</script>

<Button
	{variant}
	{size}
	class={cn(`h-5 w-5 border rounded-full ${index === selectedIndex ? 'bg-accent' : ''}`, className)}
	on:click={() => {
		scrollTo(index, false);
	}}
	on:keydown={handleKeyDown}
	{...$$restProps}
></Button>
