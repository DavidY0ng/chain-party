<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props & {
		disabled?: boolean;
	};
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export let disabled: boolean = false;
	export { className as class };
</script>

<div
	class="rounded-lg p-[1px] transition {disabled
		? 'cursor-not-allowed bg-white/30 text-white/30'
		: variant === 'default'
			? 'bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A]'
			: ''}"
>
	<ButtonPrimitive.Root
		{builders}
		class={cn(buttonVariants({ variant, size, className }))}
		type="button"
		{disabled}
		{...$$restProps}
		on:click
		on:keydown
	>
		<slot />
	</ButtonPrimitive.Root>
</div>
