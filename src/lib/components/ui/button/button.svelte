<script lang="ts">
	import { Button as ButtonPrimitive } from 'bits-ui';
	import { type Events, type Props, buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props['class'] = undefined;
	export let variant: $$Props['variant'] = 'default';
	export let size: $$Props['size'] = 'default';
	export let builders: $$Props['builders'] = [];
	export { className as class };
</script>

<div
	class={variant === 'default'
		? 'rounded-lg bg-gradient-to-t from-[#AC4FF4] to-[#F72E9A] p-[1px] transition'
		: ''}
>
	<ButtonPrimitive.Root
		{builders}
		class={cn(buttonVariants({ variant, size, className }))}
		type="button"
		{...$$restProps}
		on:click
		on:keydown
	>
		<slot />
	</ButtonPrimitive.Root>
</div>
