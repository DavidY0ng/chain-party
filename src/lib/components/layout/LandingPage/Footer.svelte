<script lang='ts'>
	import Text from '$lib/components/ui/text/text.svelte';
    import { navLinks } from './navLinks';
    import { t } from '$lib/i18n';

</script>

<div class="bg-[#0D0320] flex flex-col items-center p-10">
    <div class=" mb-10">
        <img src='/img/landing/footer/logo.png' alt="chain_party_logo">
    </div>
    <div class="hidden xl:flex gap-[60px] mb-10">
        {#each navLinks as link}
        <a href={link.path} target={link.name === 'Mechanism'? '_blank' : ''}>
            <Text size='lg' class="pixel-font text-[25px] hover:text-[#EC05F8]">
                {$t(`landing.nav_links.${link.name}`)}
            </Text>
        </a>
        {/each}
    </div>
    <Text size='sm' class='text-[#8679B2]'>Copyright © 2023-2024 Chain Party</Text>
</div>