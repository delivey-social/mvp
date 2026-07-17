<script lang="ts">
	import type { Order } from '../../../app';

	import * as Table from '$lib/components/ui/table';
	import DataTable from '../layout/data-table/data-table.svelte';

	import EditModal from './edit-modal.svelte';
	import DeleteModal from './delete-modal.svelte';

	import { toast } from 'svelte-sonner';

	const { items }: { items: Order[] } = $props();
</script>

<DataTable
	caption="Pedidos recentes realizados no comida.app."
	columns={[
		{ name: 'id' },
		{ name: 'Status' },
		{ name: 'Forma de pagamento' },
		{ name: 'Valor total' },
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

			<Table.Cell>{item.status}</Table.Cell>

			<Table.Cell>{item.payment_method}</Table.Cell>

			<Table.Cell>{item.items_total + item.delivery_fee + item.app_fee}</Table.Cell>

			<Table.Cell class="text-end flex gap-2 justify-end">
				<!-- <EditModal /> -->

				<DeleteModal id={item.id} />
			</Table.Cell>
		</Table.Row>
	{/each}</DataTable
>
