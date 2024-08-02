<script lang='ts'>
	import Text from '$lib/components/ui/text/text.svelte';
    import { navLinks } from './navLinks';
    import { t } from '$lib/i18n';

</script>

<div class="bg-gray-500 flex flex-col items-center p-10">
    <div class="bg-gray-200 h-[100px] w-[200px] mb-10">
        <img src='' alt="chain_party_logo">
    </div>
    <div class="hidden xl:flex gap-10">
        {#each navLinks as link}
        <a href={link.path} target={link.name === 'Mechanism'? '_blank' : ''}>
            <Text size='2xl' class="">
                {$t(`landing.nav_links.${link.name}`)}
            </Text>
        </a>
        {/each}
    </div>
</div>