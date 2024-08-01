<script>
    import { t } from '$lib/i18n';
	import Text from '$lib/components/ui/text/text.svelte';

    const navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'Mechanism', path: '/mechanism' },
		{ name: 'Game', path: '/home' }
	];
</script>

<div class="bg-gray-500 flex flex-col items-center p-10">
    <div class="bg-gray-200 h-[100px] w-[200px] mb-10">
        <img src='' alt="chain_party_logo">
    </div>
    <div class="flex gap-10">
        {#each navLinks as link}
        <a href={link.path}>
            <Text size='2xl' class="">
                {link.name} 
            </Text>
        </a>
        {/each}
    </div>
</div>