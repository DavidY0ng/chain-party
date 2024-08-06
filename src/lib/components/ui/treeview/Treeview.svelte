<script context="module" lang="ts">
	import { t } from '$lib/i18n';
	let _expansionState: Record<string, boolean> = {};
</script>

<script lang="ts">
	import UserAPI from '$lib/api/user';
	import Icon from '@iconify/svelte';
	import { onDestroy } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { Address } from 'viem';
	import { Text } from '$lib/components/ui/text';
	import { treeColor } from './treeColor';

	export let tree: any;
	export let isChild = false;

	export let selfLevel = 0;

	const { web3_address, downline_count, children } = tree;

	let expanded = _expansionState[web3_address];
	let hasFetchedChildren = false; // Track if children have been fetched

	const onFetchChildren = async () => {
		if (hasFetchedChildren) return; // Prevent fetching if already fetched

		const result = await UserAPI.team.getDownline(web3_address as Address);
		if (result.success) {
			const newChildren = result.data.map((child: any) => ({
				web3_address: child.web3_address,
				downline_count: child.downline_count,
				children: []
			}));

			let parent_node = findNodeByAddress(tree, web3_address);
			if (parent_node) {
				parent_node.children = [...newChildren];
			}

			hasFetchedChildren = true; // Mark children as fetched
		} else {
			throw new Error(`Failed to fetch Children Node : ${result}`);
		}
	};

	function findNodeByAddress(node: any, address: any) {
		// Check if the current node matches the address
		if (node.web3_address === address) {
			return node;
		}

		// If the node has children, search recursively
		if (node.children && node.children.length > 0) {
			for (const child of node.children) {
				const result: any = findNodeByAddress(child, address);
				if (result) {
					return result;
				}
			}
		}

		// If not found, return null
		return null;
	}

	const collapseAllChildren = (node: any) => {
		if (node.children && node.children.length > 0) {
			for (const child of node.children) {
				_expansionState[child.web3_address] = false;
				collapseAllChildren(child); // Recursively collapse children
			}
		}
	};

	const toggleExpansion = async () => {
		if (expanded) {
			// Collapse the node and all its children
			_expansionState[web3_address] = false;
			collapseAllChildren(tree);
		} else {
			// Expand the node and fetch children if needed
			if (!hasFetchedChildren) {
				await onFetchChildren();
			}
			_expansionState[web3_address] = true;
		}
		expanded = !expanded;
	};

	$: arrowDown = expanded;

	onDestroy(() => {
		// clear expansionState when navigate away
		_expansionState = {};
	});
</script>

<div
	class="relative w-full overflow-hidden rounded-lg after:content-[''] {expanded && !isChild
		? 'pb-4'
		: ''}"
>
	{#if downline_count}
		<button
			on:click={toggleExpansion}
			class="relative mb-2 flex w-full items-center justify-between gap-x-3 overflow-hidden rounded-lg bg-black/20 p-3 text-left transition hover:bg-white/10"
		>
			<div
				class="absolute left-0 flex h-full w-16 items-center justify-center bg-gradient-to-r"
				style="background: linear-gradient(to right, {treeColor[
					selfLevel % treeColor.length
				]} , transparent);"
			>
				<Text class="-translate-x-1 text-[12px] font-bold text-center">
					LVL<br />{selfLevel + 1}
				</Text>
			</div>

			<Text class="translate-x-20">
				{web3_address}
			</Text>

			<!-- Arrow icon to indicate expansion state -->
			<span class="inline-block transition {arrowDown ? '-rotate-90' : 'rotate-90'}">
				<Icon icon="material-symbols:chevron-right" class="text-xl" />
			</span>
		</button>
		{#if expanded}
			<!-- Nested children with slide transition -->
			<div transition:slide class="pl-[1rem]">
				{#if tree.children.length > 0}
					{#each tree.children as child}
						<svelte:self tree={child} isChild={true} selfLevel={selfLevel + 1} />
					{/each}
				{/if}
			</div>
		{/if}
	{:else}
		<!-- Leaf node without children -->
		<span
			class="flex w-full items-center justify-between gap-x-3 rounded-lg bg-black/20 p-3 py-3 pl-[1rem] hover:bg-white/10"
		>
			<div
				class="absolute left-0 flex h-full w-16 items-center justify-center bg-gradient-to-r"
				style="background: linear-gradient(to right, {treeColor[
					selfLevel % treeColor.length
				]} , transparent);"
			>
				<Text class="-translate-x-1 text-[12px] font-bold">
					LVL<br />{selfLevel + 1}
				</Text>
			</div>

			<Text class="translate-x-20">
				{web3_address || $t('app.referral.none')}
			</Text>
			<Icon icon="octicon:dash-16" class="inline-block text-sm text-white/20" />
		</span>
	{/if}
</div>
