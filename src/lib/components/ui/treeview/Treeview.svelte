<script context="module" lang="ts">
	const _expansionState: Record<string, boolean> = {};
</script>

<script lang="ts">
	import UserAPI from '$lib/api/user';
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	import type { Address } from 'viem';

	export let tree: any;
	export let isChild = false;

	const { web3_address, downline_count, children } = tree;

	let expanded = _expansionState[web3_address] || false;
	let hasFetchedChildren = false; // Track if children have been fetched
	
	const onFetchChildren = async () => {
		if (hasFetchedChildren) return; // Prevent fetching if already fetched

		const response = await UserAPI.team.getDownline(web3_address as Address);
		if (response) {
			const newChildren = response.map((child: any) => ({
				web3_address: child.web3_address,
				downline_count: child.downline_count,
				children: []
			}));

			let parent_node = findNodeByAddress(tree, web3_address);
			if (parent_node) {
				parent_node.children = [...newChildren];
			}

			hasFetchedChildren = true; // Mark children as fetched
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
</script>

<div
	class="w-full overflow-hidden relative rounded-lg bg-gray-800 after:content-[''] {expanded &&
	!isChild
		? 'pb-4'
		: ''}"
>
	{#if downline_count}
		<button
			on:click={toggleExpansion}
			class="w-full text-left flex gap-x-3 p-3 items-center transition hover:bg-white/10 rounded-lg"
		>
			<!-- Arrow icon to indicate expansion state -->
			<span class="transition inline-block {arrowDown ? 'rotate-90' : ''}">
				<Icon icon="material-symbols:chevron-right" class="text-xl" />
			</span>
			{web3_address}
		</button>
		{#if expanded}
			<!-- Nested children with slide transition -->
			<div transition:slide class="pl-[0.6rem]">
				{#if tree.children.length > 0}
					{#each tree.children as child}
						<svelte:self tree={child} isChild={true} />
					{/each}
				{/if}
			</div>
		{/if}
	{:else}
		<!-- Leaf node without children -->
		<span class="flex gap-x-3 items-center pl-[1rem] py-3 hover:bg-white/10 rounded-lg w-full">
			<Icon icon="octicon:dash-16" class="inline-block text-white/20 text-sm" />
			{web3_address}
		</span>
	{/if}
</div>
