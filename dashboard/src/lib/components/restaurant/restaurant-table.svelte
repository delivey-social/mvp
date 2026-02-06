<script lang="ts">
	import type { Restaurant } from '../../../app';

	import * as Table from '$lib/components/ui/table/index.js';
	import DataTable from '../layout/data-table/data-table.svelte';

	import { toast } from 'svelte-sonner';
	import DeleteModal from './delete-modal.svelte';

	const { items }: { items: Restaurant[] } = $props();
</script>

<DataTable
	caption="Pedidos recentes realizados no comida.app."
	columns={[
		{ name: 'id' },
		{ name: 'Nome' },
		{ name: 'Status' },
		{ name: 'Endereço' },
		{ name: 'Ações', className: 'text-end' }
	]}
>
	{#each items as item}
		<Table.Row>
			<Table.Cell
				class="max-w-10 truncate cursor-pointer"
				onclick={() => {
					navigator.clipboard.writeText(item.id);
					toast.success('id copiado para a área de transferência!');
				}}
				title={item.id}>{item.id}</Table.Cell
			>

			<Table.Cell>{item.name}</Table.Cell>

			<Table.Cell>Ativo</Table.Cell>

			<Table.Cell>{item.address}</Table.Cell>

			<Table.Cell class="text-end">
				<DeleteModal id={item.id} />
			</Table.Cell>
		</Table.Row>
	{/each}
</DataTable>
