<script lang="ts">
	import type { PageProps } from './$types';

	import OrderTable from '$lib/components/orders/order-table.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="grid gap-10 max-w-3xl mx-auto my-10">
	<h1>Pedidos</h1>

	<OrderTable items={data.items} />
</section>
