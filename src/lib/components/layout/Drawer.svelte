<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { connectWallet } from '$lib/web3/wagmi';
	import { toast } from 'svelte-sonner';
	import { Button } from '../ui/button';
	import * as Sheet from '../ui/sheet';
	import { menuList } from './config';
	import { t } from '$lib/i18n';

	let drawerOpen = false;

	function onHandleRedirect(path: string) {
		goto(path);
	}
</script>

<Sheet.Root bind:open={drawerOpen}>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="ghost" class="block xl:hidden">
			<img src="/img/mobileNav/drawer.png" alt="" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content
		side="left"
		class="z-[999] flex h-full flex-col justify-between bg-[#481555] px-4 pb-3"
	>
		<div class="flex flex-grow flex-col gap-y-1">
			{#each menuList as menu, i}
				<Sheet.Close asChild let:builder>
					<Button
						builders={[builder]}
						variant="ghost"
						on:click={() => {
							onHandleRedirect(menu.path);
						}}
						class="relative z-10 flex w-full items-center justify-start gap-x-3 p-0 px-6 py-7 text-sm font-bold uppercase  {$page
							.url.pathname == menu.path
							? 'rounded-full bg-[#5C1E6C] text-white'
							: 'hover:text-gray-300 '}"
					>
						<img
							src={`/img/desktopSideMenu/${menu.label}.png`}
							class="group-hover:opacity-100 {$page.url.pathname === menu.path ? '' : 'opacity-50'}"
							alt=""
						/>
						{$t(`common.menu.label.${menu.label}`)}

						{#if $page.url.pathname === menu.path}
							<div
								class="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border border-white p-1"
							>
								<div class="h-full w-full rounded-full bg-white"></div>
							</div>
						{/if}
					</Button>
				</Sheet.Close>

				{#if i === 3}
					<div class="m-auto my-5 h-[1px] w-full bg-white/20" />
				{/if}
			{/each}
		</div>
	</Sheet.Content>
</Sheet.Root>
