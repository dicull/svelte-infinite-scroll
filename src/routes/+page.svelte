<script lang="ts">
	import InfiniteScroll from '$lib/components/InfiniteScroll.svelte';
	import { Service } from '$lib/service';
	import { onMount } from 'svelte';

	let isLoading = false;
	let existMore = true;
	let page = 1;
	let perPage = 15;
	let thresholdPos = 400;
	let cards = [];

	const loadMore = async (e) => {
		if (existMore) {
			page += 1;
			await getCards(page);
		}
	};

	const getCards = async (page) => {
		isLoading = true;
		const response = await Service.getCards(page, perPage);

		isLoading = false;
		if (response.success) {
			existMore = response.remains > 0;

			cards = [...cards, ...response.cards];
		} else {
			existMore = false;
		}
	};

	onMount(async () => {
		await getCards(page);
	});
</script>

<div class="container text-center position-relative">
	<div class="row" style="height: 60px;padding: 10px 0;">
		<div class="col-auto">
			<label for="inputPerPage" class="col-form-label">PerPage</label>
		</div>
		<div class="col-auto">
			<input id="inputPerPage" class="form-control" style="width: 80px" min="5" type="number" bind:value={perPage} />
		</div>
		<div class="col-auto">
			<label for="inputThresholdPos" class="col-form-label">Threshold Position px</label>
		</div>
		<div class="col-auto">
			<input id="inputThresholdPos" class="form-control" style="width: 80px" min="10" type="number" bind:value={thresholdPos} />
		</div>
	</div>
	<div class="row">
		<div class="overflow-y-auto d-flex flex-column row-gap-3 py-2" style="height: calc(100vh - 60px);">
			<InfiniteScroll on:loadMore={loadMore} {thresholdPos} existMore={true}>
				{#each cards as card}
					<div class="card w-100">
						<div class="card-body">
							<h5 class="card-title">{card.title}</h5>
							<p class="card-text">
								{card.content}
							</p>
						</div>
					</div>
				{/each}
			</InfiniteScroll>
		</div>
	</div>
	<div
		class:d-none={!isLoading}
		class="position-absolute w-100 h-100 start-0 top-0 d-flex align-items-center justify-content-center"
	>
		<div class="bg-black opacity-25 w-100 h-100" />
		<div class="spinner-border text-primary position-absolute" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</div>

<style lang="scss">
</style>
