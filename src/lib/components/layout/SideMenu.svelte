<script lang="ts">
	import { page } from '$app/stores';
	import { Text } from '$lib/components/ui/text';
	import { menuList } from './config';
</script>

<!-- Desktop Side Menu -->
<div class="relative z-[999] hidden w-full xl:block xl:max-w-[15%]">
	<div
		class="relative flex min-h-screen w-full flex-col items-center gap-5 p-3 xl:fixed xl:w-[15%] xl:bg-[#481555]"
	>
		<div
			id="verticalLine"
			class="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-t from-transparent via-[#FF5EDC] via-50% to-transparent"
		/>
		<img src="/img/desktopSideMenu/Chain Party Logo.png" alt="" class="w-[8.625rem]" />
		<div class="flex h-full w-full flex-col gap-3">
			{#each menuList as menu, i}
				{#if i < 4}
					<a
						href={menu.path}
						class="group relative z-20 flex w-full justify-start rounded-full bg-[#481555] py-4 text-lg font-bold hover:bg-[#481555] hover:text-white {$page
							.url.pathname == menu.path
							? ' bg-[#5c1e6c] text-white hover:bg-[#5c1e6c]'
							: 'text-white/50'}"
					>
						{#if $page.url.pathname === menu.path}
							<div class="isActive flex w-[110%] translate-x-5 items-center justify-end">
								<div
									class="dot relative w-fit -translate-x-5 rounded-full border border-white p-2"
								></div>
							</div>
						{/if}
						<div class="z-10 flex translate-x-10 items-center gap-x-2">
							<img
								src={`/img/desktopSideMenu/${menu.label}.png`}
								class="transition group-hover:opacity-100 {$page.url.pathname === menu.path
									? ''
									: 'opacity-50'}"
								alt=""
							/>
							<Text
								class="uppercase group-hover:text-white {$page.url.pathname === menu.path
									? ''
									: 'text-white/50'}">{menu.label}</Text
							>
						</div>
					</a>
				{/if}
			{/each}
			<div class="m-auto h-[1px] w-full bg-white/20" />
			{#each menuList as menu, i}
				{#if i >= 4}
					<a
						href={menu.path}
						class="group relative z-20 flex w-full justify-start rounded-full bg-[#481555] py-4 text-lg font-bold hover:bg-[#481555] hover:text-white {$page
							.url.pathname == menu.path
							? ' bg-[#5c1e6c] text-white hover:bg-[#5c1e6c]'
							: 'text-white/50'}"
					>
						{#if $page.url.pathname === menu.path}
							<div class="isActive flex w-[110%] translate-x-5 items-center justify-end">
								<div
									class="dot relative w-fit -translate-x-5 rounded-full border border-white p-2"
								></div>
							</div>
						{/if}
						<div class="z-10 flex translate-x-10 items-center gap-x-2">
							<img
								src={`/img/desktopSideMenu/${menu.label}.png`}
								class="group-hover:opacity-100 {$page.url.pathname === menu.path
									? ''
									: 'opacity-50'}"
								alt=""
							/>
							<Text
								class="uppercase group-hover:text-white {$page.url.pathname === menu.path
									? ''
									: 'text-white/50'}">{menu.label}</Text
							>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	</div>
</div>

<style scoped>
	:global(.isActive) {
		position: absolute;
		height: 100%;
		background-color: #5c1e6c;
		z-index: 10;
		top: 0%;
		border-radius: 100px;
	}

	.dot::before {
		content: '';
		position: absolute;
		background-color: white;
		width: 60%;
		height: 60%;
		border-radius: 100%;
		left: 50%;
		top: 20%;
		transform: translateY(30%);
		transform: translateX(-50%);
	}
</style>
