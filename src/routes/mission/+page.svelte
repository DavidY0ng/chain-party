<script>

	import { Button } from "$lib/components/ui/button";
	import * as Card from '$lib/components/ui/card';
    import Text from "$lib/components/ui/text/text.svelte";

    const statusList = [
        {name:"Your Points", value:'100,000 points'},
        {name:"Completed Mission", value:'10'},
        {name:"Ongoing Mission", value:'8'}
    ]

    const sampleMissionData = ['Mission 1', 'Mission 2', 'Mission 3']

</script>
<div class="h-full w-full min-h-screen p-3 xl:p-5 space-y-10">
	<div id="Mission" class="space-y-5 flex flex-col">
		<div class="flex justify-between w-full">
			<Text tag="h1" size="_4xl">Mission</Text>
			<Button class=""><Text tag="p" size="lg" class="text-white">Bind Referral</Text></Button>
		</div>

        <div id="Status" class="flex flex-col">
            <Text tag='h4' size='lg' class='font-semibold'>Your Status</Text>
            <Card.Root class="w-full xl:w-1/4 flex flex-col justify-center p-3">
                {#each statusList as status}
                    <div class="flex justify-between">
                        <Text>{status.name}:</Text>
                        <Text class='font-bold'>{status.value}</Text>
                    </div>
    
                {/each}
            </Card.Root>
        </div>

        <div id="Mission List" class="flex flex-col">
            <Text tag='h1' size='_3xl' class='font-bold'>Mission List</Text>
            <Card.Root class="w-full xl:w-1/4 flex flex-col justify-center p-3 gap-3">
                {#each sampleMissionData as mission}
                    <Card.Root class="flex justify-between p-2 items-center">
                        <Text>{mission}</Text>
                        <Button size='sm' class='px-5 '>Start</Button>
                    </Card.Root>
    
                {/each}
            </Card.Root>
        </div>
	</div>
</div>
