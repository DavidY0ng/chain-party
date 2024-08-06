<script lang="ts">
	import { Text } from '$lib/components/ui/text';
	</script>

<div class="flex w-full flex-col">
	<img src="/img/footer/Party.png" alt="" class="w-full" />
	<div class="flex w-full items-center justify-between bg-[#2D0B31] px-8 py-5">
		<Text>Copyright © 2024 Party Chain All rights reserved.</Text>
		<div class="flex items-center gap-x-3">
			<a href="/" class="">
				<div class="socialButton relative rounded-full p-[1px]">
					<div class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31]">
						<img src="/img/footer/telegram.png" class="" alt="" />
					</div>
				</div>
			</a>
			<a href="/" class="">
				<div class="socialButton relative rounded-full p-[1px]">
					<div class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31]">
						<img src="/img/footer/twitter.png" class="" alt="" />
					</div>
				</div>
			</a>
			<a href="/" class="">
				<div class="socialButton relative rounded-full p-[1px]">
					<div class="inner flex h-10 w-10 items-center justify-center rounded-full bg-[#2D0B31]">
						<img src="/img/footer/youtube.png" class="" alt="" />
					</div>
				</div>
			</a>
		</div>
	</div>
</div>

<style>
	.socialButton {
		background: linear-gradient(360deg, #ac4ff4 -0.92%, #f72e9a 99.08%);
		border-radius: 50%;
		transition: 0.3s ease;
	}

	.inner {
		background: #2d0b31;
		border-radius: 50%;
		transition: 0.3s ease;
	}

	.socialButton:hover .inner {
		background: linear-gradient(360deg, #ac4ff4 -0.92%, #f72e9a 99.08%);
	}
</style>
