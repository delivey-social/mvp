<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="flex flex-wrap items-center gap-2 md:flex-row">
		<Button variant="destructive">Button</Button>
	</div>
</section>
