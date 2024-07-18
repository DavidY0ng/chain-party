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
			default: 'text-[14px]',
			sm: 'text-[12px]',
			lg: 'text-[16px]',
			xl: 'text-[18px] font-semibold',
			_2xl: 'text-[20px] font-semibold',
			_3xl: 'text-[22px] font-bold',
			_4xl: 'text-[26px] font-bold'
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
