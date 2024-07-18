<script>
    const menuList = [
        {name: "Home", path: '/'},
        {name: "Game #1", path: '/game-1'},
        {name: "Stake", path: '/stake'},
        {name: "Mission", path: '/mission'},
        {name: "Leaderboard", path: '/leaderboard'}
    ]
</script>



<div class="hidden md:flex bg-gray-500 min-h-screen flex flex-col p-5 gap-5 min-w-[200px]">
    {#each menuList as menu}
        <div>
            <a href={menu.path} class="hover:text-gray-300">
                {menu.name}
            </a>
        </div>
    {/each}
</div>
