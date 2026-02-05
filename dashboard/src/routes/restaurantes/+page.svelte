<script lang="ts">
	import type { PageProps } from './$types';

	import RestaurantTable from '$lib/components/restaurant/restaurant-table.svelte';

	let { data }: PageProps = $props();
</script>

<section class="grid gap-10 max-w-3xl mx-auto my-10">
	<h1>Restaurantes</h1>

	<RestaurantTable items={data.items} />
</section>
