<script lang="ts">
	import type { PageProps } from './$types';

	import RestaurantTable from '$lib/components/restaurant/restaurant-table.svelte';
	import MaintainModal from '$lib/components/restaurant/maintain-modal.svelte';

	let { data }: PageProps = $props();
</script>

<section class="grid gap-10 max-w-3xl mx-auto my-10">
	<div class="flex justify-between">
		<h1>Restaurantes</h1>

		<MaintainModal />
	</div>

	<RestaurantTable items={data.items} />
</section>
