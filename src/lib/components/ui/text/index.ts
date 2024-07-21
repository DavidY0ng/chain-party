import { tv, type VariantProps } from 'tailwind-variants';
import Root from './text.svelte';
import type { HTMLAttributes } from 'svelte/elements';

const labelVarient = tv({
	base: 'leading-normal tracking-normal text-black',
	variants: {
		variant: {
			default: ''
		},
		size: {
			default: 'text-md',
			xs: 'text-xs',
			sm: 'text-sm',
			lg: 'text-lg',
			xl: 'text-xl font-semibold',
			'2xl': 'text-2xl font-semibold',
			'3xl': 'text-3xl font-bold',
			'4xl': 'text-4xl font-bold',
			'5xl': 'text-5xl font-black'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

type Variant = VariantProps<typeof labelVarient>['variant'];
type Size = VariantProps<typeof labelVarient>['size'];
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

type Props = HTMLAttributes<HTMLHeadingElement> & {
	variant?: Variant;
	size?: Size;
	tag?: HeadingLevel;
};

export {
	Root,
	type HeadingLevel,
	type Props,
	//
	Root as Text,
	type Props as TextProps,
	type HeadingLevel as Tag,
	labelVarient
};
