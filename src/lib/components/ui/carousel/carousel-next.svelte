<script lang="ts">
	import { Button, type Props, type buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { VariantProps } from 'tailwind-variants';
	import { getEmblaContext } from './context.js';

	type $$Props = Props;
	const dispatch = createEventDispatcher();

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let variant: VariantProps<typeof buttonVariants>['variant'] = 'outline';
	export let size: VariantProps<typeof buttonVariants>['size'] = 'icon';
	const { orientation, canScrollNext, scrollNext, handleKeyDown } =
		getEmblaContext('<Carousel.Next/>');

	function onScrollNext() {
		scrollNext();
		dispatch('scrollNext');
	}
</script>

<Button
	{variant}
	{size}
	class={cn(
		'absolute h-8 w-8 touch-manipulation rounded-full',
		$orientation === 'horizontal'
			? '-right-12 top-1/2 -translate-y-1/2'
			: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
		className
	)}
	disabled={!$canScrollNext}
	on:click={onScrollNext}
	on:keydown={handleKeyDown}
	{...$$restProps}
>
	<Icon icon="fa-solid:chevron-right" class="text-4xl" />
	<span class="sr-only">Next slide</span>
</Button>
