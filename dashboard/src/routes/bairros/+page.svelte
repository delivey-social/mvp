<script lang="ts">
	import type { PageProps } from './$types';

	import NeighborhoodsTable from '$lib/components/neighborhoods/neighborhoods-table.svelte';
	import MaintainModal from '$lib/components/neighborhoods/maintain-modal.svelte';

	let { data }: PageProps = $props();
</script>

<section class="grid gap-10 max-w-3xl mx-auto my-10">
	<div class="flex justify-between items-center">
		<h1>Bairros</h1>

		<MaintainModal />
	</div>

	<NeighborhoodsTable items={data.items} />
</section>
