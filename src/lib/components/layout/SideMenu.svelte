<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { menuList } from './config';

	function onHandleRedirect(path: string) {
		goto(path);
	}
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
						class="relative z-20 flex w-full justify-center rounded-full bg-[#481555] py-4 text-lg font-bold text-white/50 hover:bg-[#481555] hover:text-white {$page
							.url.pathname == menu.path
							? ' bg-[#5c1e6c] text-white hover:bg-[#5c1e6c]'
							: ''}"
					>
						{#if $page.url.pathname === menu.path}
							<div class="isActive flex w-[110%] translate-x-5 items-center justify-end">
								<div
									class="dot relative w-fit -translate-x-5 rounded-full border border-white p-2"
								></div>
							</div>
						{/if}
						<p class="z-10">{menu.label}</p>
					</a>
				{/if}
			{/each}
			<div class="m-auto h-[1px] w-[80%] bg-white/20" />
			{#each menuList as menu, i}
				{#if i >= 4}
					<a
						href={menu.path}
						class="relative z-20 flex w-full justify-center rounded-full bg-[#481555] py-4 text-lg font-bold text-white/50 hover:bg-[#481555] hover:text-white {$page
							.url.pathname == menu.path
							? ' bg-[#5c1e6c] text-white hover:bg-[#5c1e6c]'
							: ''}"
					>
						{#if $page.url.pathname === menu.path}
							<div class="isActive flex w-[110%] translate-x-5 items-center justify-end">
								<div
									class="dot relative w-fit -translate-x-5 rounded-full border border-white p-2"
								></div>
							</div>
						{/if}
						<p class="z-10">{menu.label}</p>
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
