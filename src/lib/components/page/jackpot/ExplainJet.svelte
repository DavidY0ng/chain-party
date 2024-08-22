<script>
    import Text from '$lib/components/ui/text/text.svelte';
    import { t } from '$lib/i18n';
    
</script>
<div class="w-full md:max-w-[40%]">
    <div class='relative'>
        
        <img src='/img/jackpot/trapezium.png' alt='img'>
        <img src='/img/jackpot/line.png' alt='line'>
        <Text class="absolute top-[50%] left-0 translate-y-[-50%] pl-4">
            {$t('jackpot.explain_jet')}
        </Text>
    </div>

    <div class="bg-black/25 rounded-b-2xl rounded-tr-2xl p-4">
        <Text tag='p'>
            {$t('jackpot.explain_desc')}
        </Text>
    
    </div>
</div>
