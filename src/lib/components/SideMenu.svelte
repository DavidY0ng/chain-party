<script>
	import { page } from "$app/stores";
    export let isMobileSideMenu = false

    const menuList = [
        {name: "Home", path: '/'},
        {name: "Game #1", path: '/game-1'},
        {name: "Stake", path: '/stake'},
        {name: "Mission", path: '/mission'},
        {name: "Leaderboard", path: '/leaderboard'}
    ]
</script>


<!-- {#if !isMobileSideMenu} -->
<div class=" {isMobileSideMenu ? '' : 'hidden md:flex'} bg-gray-500 min-h-screen flex flex-col p-3 gap-5 min-w-[200px]">
    {#each menuList as menu}
        <div class='flex justify-center p-2 {($page.url.pathname == menu.path)? 'bg-gray-700/50 text-white rounded-md' : 'hover:text-gray-300 '}'>
            <a href={menu.path} class="">
                {menu.name}
            </a>
        </div>
    {/each}
</div>
