<script>

	import { Button } from "$lib/components/ui/button";
	import * as Card from '$lib/components/ui/card';
    import Text from "$lib/components/ui/text/text.svelte";
    import Separator from "$lib/components/ui/separator/separator.svelte";

    const statusList = [
        {name:"Your Points", value:'1000'},
        {name:"Completed Mission", value:'10'},
        {name:"Ongoing Mission", value:'8'}
    ]

    const sampleMissionData = ['Mission 1', 'Mission 2', 'Mission 3']

</script>
<div class="h-full w-full min-h-screen p-3 xl:p-5 space-y-10">
	<div id="Mission" class="space-y-5 flex flex-col w-full">
		<div class="flex justify-between w-full">
			<Text tag="h1" size="_4xl">Mission</Text>
			<Button class=""><Text tag="p" size="lg" class="text-white">Bind Referral</Text></Button>
		</div>

        <!-- mobile view of status-->
        <div id="Status" class="flex flex-col xl:hidden ">
            <Text tag='h4' size='lg' class='font-semibold'>Your Status</Text>
            <Card.Root class="w-full xl:w-1/4 flex flex-col justify-center p-3 rounded-xl">
                {#each statusList as status}
                    <div class="flex justify-between">
                        <Text>{status.name}:</Text>
                        <Text class='font-bold'>{status.value}</Text>
                    </div>
    
                {/each}
            </Card.Root>
        </div>

        <!-- desktop view of status-->
        <div class="flex justify-center hidden xl:flex">
            <div class="grid grid-cols-5 h-[100px] w-[80%]">
                {#each statusList as status, i}
                <div class="flex flex-col items-center gap-3">
                    <Text tag='h1' size='_2xl' class='whitespace-nowrap overflow-hidden'>{status.name}:</Text>
                    
                    <Text tag='h1' size='_4xl' class='font-bold text-[35px]'>{status.value}</Text>
                </div>
    
                <div class="flex justify-center h-full">
                    {#if i !== statusList.length - 1}
                    <Separator orientation='vertical' class='h-full bg-gray-300 max-w-[1px]' />
                    {/if}
                </div>
    
                {/each}
            </div>
        </div>
      

        <div id="Mission List" class="flex flex-col w-full">
            <Text tag='h1' size='_4xl' class='font-bold '>Mission List</Text>
            <Card.Root class="w-full flex flex-col justify-center p-3 gap-3 rounded-xl">
                {#each sampleMissionData as mission}
                    <Card.Root class="flex justify-between p-2 items-center rounded-sm">
                        <Text>{mission}</Text>
                        <Button size='sm' class='px-5 '>Start</Button>
                    </Card.Root>
    
                {/each}
            </Card.Root>
        </div>
	</div>
</div>
