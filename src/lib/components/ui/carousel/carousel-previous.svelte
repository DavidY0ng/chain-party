<script lang="ts">
	import { Button, type Props, type buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { VariantProps } from 'tailwind-variants';
	import { getEmblaContext } from './context.js';

	type $$Props = Props;

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'outline';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'icon';

	const dispatch = createEventDispatcher();

	const { orientation, canScrollPrev, scrollPrev, handleKeyDown } =
		getEmblaContext('<Carousel.Previous/>');

	function onScrollPrev() {
		scrollPrev();
		dispatch('scrollPrev');
	}
</script>

<Button
	{variant}
	{size}
	class={cn(
		'absolute h-8 w-8 touch-manipulation rounded-full',
		$orientation === 'horizontal'
			? '-left-12 top-1/2 -translate-y-1/2'
			: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	disabled={!$canScrollPrev}
	on:click={onScrollPrev}
	on:keydown={handleKeyDown}
	{...$$restProps}
>
	<Icon icon="fa-solid:chevron-left" class="text-4xl" />
	<span class="sr-only">Previous slide</span>
</Button>
