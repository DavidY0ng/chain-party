<script lang='ts'>
    import Text from '$lib/components/ui/text/text.svelte';
    import { t } from '$lib/i18n';
</script>


<div class="flex flex-col gap-5 items-center justify-center">
    <div class="bg-gray-500 h-[400px] max-w-[600px] w-full">
        <img src='' class='' alt='chain_party_mascot'>
        <Text size='3xl'>
            {$t('landing.coming_soon.title')}
        </Text>
    </div>

    <div class="bg-gray-500 h-[100px] max-w-[600px] w-full">
        <img src='' alt="chain_party_logo">
    </div>

    <div class="bg-gray-500 h-[100px] max-w-[600px] w-full">
        <img src='' alt="investor_logo">
    </div>
</div>

