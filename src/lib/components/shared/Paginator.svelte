<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { isDesktop } from '$lib/stores/storeCommon';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let paginationCount = {
		count: 0,
		last_page: 0
	};

	$: perPage = paginationCount.count / paginationCount.last_page;
	$: siblingCount = $isDesktop ? 1 : 0;
</script>

<Pagination.Root
	bind:count={paginationCount.count}
	{perPage}
	{siblingCount}
	let:pages
	let:currentPage
>
	<Pagination.Content>
		<Pagination.Item>
			<Pagination.PrevButton
				disabled={currentPage === 1}
				on:click={() => {
					dispatch('search', 'prev');
				}}
				class="hover:bg-black/50"
			>
				<ChevronLeft class="h-4 w-4" />
				<span class="hidden sm:block">Previous</span>
			</Pagination.PrevButton>
		</Pagination.Item>
		{#each pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
			{:else}
				<Pagination.Item class="rounded-2xl hover:bg-black/50">
					<Pagination.Link
						on:click={() => {
							dispatch('search', { page: page.value });
						}}
						class="rounded-2xl hover:bg-black/50 {currentPage === page.value ? 'bg-black' : ''}"
						{page}
					>
						{page.value}
					</Pagination.Link>
				</Pagination.Item>
			{/if}
		{/each}
		<Pagination.Item>
			<Pagination.NextButton
				disabled={currentPage === paginationCount.last_page}
				on:click={() => {
					dispatch('search', 'next');
				}}
				class="hover:bg-black/50"
			>
				<span class="hidden sm:block">Next</span>
				<ChevronRight class="h-4 w-4" />
			</Pagination.NextButton>
		</Pagination.Item>
	</Pagination.Content>
</Pagination.Root>
