<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type DataTableProps = {
		caption?: string;
		columns: {
			name: string;
			className?: HTMLAttributes<HTMLElement>['class'];
		}[];
		children: Snippet;
	};

	const { caption, columns, children }: DataTableProps = $props();
</script>

<Table.Root>
	{#if caption}
		<Table.Caption>{caption}</Table.Caption>
	{/if}

	<Table.Header>
		<Table.Row>
			{#each columns as { name, className }}
				<Table.Head class={className}>{name}</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{@render children()}
	</Table.Body>
</Table.Root>
