<script>
    import * as Card from '$lib/components/ui/card';
	import { Text } from '$lib/components/ui/text';
	import { truncateString } from '$lib/helper';
</script>

<!-- top 1 -->
<div class="flex ">
    <div class="relative rotate-[-10deg] left-[2%]">
        <Card.Root class="flex flex-col bg-gradient-to-b from-[#251235] via-50% to-transparent p-5 border-none items-center gap-3 rounded-xl relative pt-[70px] w-[300px] overflow-hidden">
            <div class="flex flex-col items-center overflow-hidden gap-5">
                <Text size='3xl'>
                    TOP 2
                </Text>
                <div class="bg-black/15 px-[30px] py-[10px] rounded-xl">
                    <Text size='3xl'>{truncateString('0x9693CD9713496b0712f52E5F0c7b8948abdA824D',4,4)}</Text>
                </div>
                <div class="flex flex-col items-center">
                    <Text size='sm' class="text-white/60">Donated:</Text>
                    <Text size='lg' class="font-bold">1,000 pEIC</Text>
                </div>
            </div>
        </Card.Root>
        <img src='/img/donate/top2.png' alt='top2' class="absolute translate-y-[-50%] top-0 left-[50%] translate-x-[-50%]">
    </div>

    <div class="relative z-10 translate-y-[-20%]">
        <Card.Root class="flex flex-col bg-[#251235] p-5 border-none items-center gap-3 rounded-xl relative pt-[70px] w-[300px] overflow-hidden">
            <div class="flex flex-col items-center overflow-hidden gap-5">
                <Text size='3xl'>
                    TOP 1
                </Text>
                <div class="bg-black/15 px-[30px] py-[10px] rounded-xl">
                    <Text size='3xl'>{truncateString('0x9693CD9713496b0712f52E5F0c7b8948abdA824D',4,4)}</Text>
                </div>
                <div class="flex flex-col items-center">
                    <Text size='sm' class="text-white/60">Donated:</Text>
                    <Text size='lg' class="font-bold">1,000 pEIC</Text>
                </div>
                <div class="pink-eclipse w-[337px] h-[263px] top-[90%]"></div>
            </div>
        </Card.Root>
        <img src='/img/donate/top1.png' alt='top1' class="absolute translate-y-[-50%] top-0 left-[50%] translate-x-[-50%]">
    </div>
    
    <div class="relative rotate-[10deg] right-[2%]">
        <Card.Root class="flex flex-col bg-gradient-to-b from-[#251235] p-5 border-none items-center gap-3 rounded-xl relative pt-[70px] w-[300px] overflow-hidden">
            <div class="flex flex-col items-center overflow-hidden gap-5">
                <Text size='3xl'>
                    TOP 3
                </Text>
                <div class="bg-black/15 px-[30px] py-[10px] rounded-xl">
                    <Text size='3xl'>{truncateString('0x9693CD9713496b0712f52E5F0c7b8948abdA824D',4,4)}</Text>
                </div>
                <div class="flex flex-col items-center">
                    <Text size='sm' class="text-white/60">Donated:</Text>
                    <Text size='lg' class="font-bold">1,000 pEIC</Text>
                </div>
            </div>
        </Card.Root>
        <img src='/img/donate/top3.png' alt='top3' class="absolute translate-y-[-50%] top-0 left-[50%] translate-x-[-50%]">
    </div>
</div>
