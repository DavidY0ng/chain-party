<script lang="ts">
	import AllHistory from '$lib/components/page/game-1/AllHistory.svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Text } from '$lib/components/ui/text';
</script>

<div class="h-full w-full min-h-screen space-y-10">
	<div id="Round Board" class="flex flex-col items-center justify-center space-y-5">
		<Text size="4xl" class="text-5xl font-bold">Finished Rounds</Text>

		<Tabs.Root value="All History" class="w-full flex flex-col items-center space-y-5">
			<Tabs.List class="bg-transparent border p-0 rounded-full overflow-hidden">
				<Tabs.Trigger value="All History" class="h-full rounded-full px-5 text-lg">
					All History
				</Tabs.Trigger>
				<Tabs.Trigger value="Your History" class="h-full rounded-full px-5 text-lg">
					Your History
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="All History" class="w-full xl:w-[60%]">
				<AllHistory />
			</Tabs.Content>
			<Tabs.Content value="Your History" class="w-full xl:w-[60%]">
				<AllHistory />
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
