<script>
    export let roadmap;
</script>

<div class="bg-[#3C3A61]/60 rounded-2xl p-5 w-[300px] h-[280px]">
    <div class="pixel-font text-[#EC05F8]">
        {roadmap.year}
    </div>
    <ul class="list-disc pl-10">
        {#each roadmap.description as item}
            <li>{item}</li>
        {/each}
    </ul>
</div>