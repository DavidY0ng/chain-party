<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';
    import Icon from '@iconify/svelte';
    import { t } from '$lib/i18n';

    const links = [
        {link:'',icon:"ri:twitter-x-fill"},
        {link:'',icon:"lets-icons:insta"},
        {link:'',icon:"file-icons:telegram"},
        {link:'',icon:"ic:baseline-discord"},
    ]
</script>

<div class='flex flex-col gap-10'>
    <Text size='3xl'>
        {$t('landing.join_the_community')}
    </Text>
    <div class="flex justify-center  gap-10">
        {#each links as link}
            <a href={link.link} target="_blank" class='text-gray-600'>
                <Icon icon={link.icon} width="2em" height="2em" />
            </a>
        {/each}
    </div>
 
</div>