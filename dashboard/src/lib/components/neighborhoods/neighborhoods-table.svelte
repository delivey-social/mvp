<script lang="ts">
	import DataTable from '../layout/data-table/data-table.svelte';
	import * as Table from '$lib/components/ui/table';

	import type { Neighborhood } from '../../../app';

	import MaintainModal from './maintain-modal.svelte';
	import DeleteModal from './delete-modal.svelte';

	const { items }: { items: Neighborhood[] } = $props();
</script>

<DataTable
	columns={[
		{ name: 'Nome' },
		{ name: 'Taxa de entrega' },
		{ name: 'Ações', className: 'text-end' }
	]}
>
	{#each items as item}
		<Table.Row>
			<Table.Cell>{item.name}</Table.Cell>

			<Table.Cell>{item.deliveryFee}</Table.Cell>

			<Table.Cell class="text-end">
				<MaintainModal data={item} />
				<DeleteModal id={item.id} />
			</Table.Cell>
		</Table.Row>
	{/each}
</DataTable>
