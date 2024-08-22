<script lang="ts">
	import { Text } from '$lib/components/ui/text';
</script>

<div class="relative z-20 flex w-full flex-col">
	<img src={'/img/footer/mobileParty.png'} alt="" class="block w-full md:hidden" />
	<img src={'/img/footer/Party.png'} alt="" class="hidden w-full md:block" />
	<div
		class="flex w-full flex-col-reverse items-center justify-between gap-y-3 bg-[#2D0B31] px-8 py-5 xl:flex-row xl:gap-y-0"
	>
		<Text class="text-center text-[12px] xl:text-left xl:text-md"
			>Copyright © 2024 Party Chain All rights reserved.</Text
		>
		<div class="flex items-center gap-x-3">
			<a href="/" class="">
				<div class="defaultButtonBg relative rounded-full p-[1px]">
					<div
						class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition"
					>
						<img src="/img/footer/telegram.png" class="" alt="" />
					</div>
				</div>
			</a>
			<a href="/" class="">
				<div class="defaultButtonBg relative rounded-full p-[1px]">
					<div
						class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition"
					>
						<img src="/img/footer/twitter.png" class="" alt="" />
					</div>
				</div>
			</a>
			<a href="/" class="">
				<div class="defaultButtonBg relative rounded-full p-[1px]">
					<div
						class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31] transition"
					>
						<img src="/img/footer/youtube.png" class="" alt="" />
					</div>
				</div>
			</a>
		</div>
	</div>
</div>
