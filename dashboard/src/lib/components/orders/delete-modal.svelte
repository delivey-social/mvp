<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '../ui/button/button.svelte';

	import { Trash } from '@lucide/svelte';
	import { buttonVariants } from '../ui/button';
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'destructive' })}>
		<Trash />
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Excluir Pedido</Dialog.Title>
			<Dialog.Description
				>Você tem certeza de que deseja excluir o pedido?<br />Essa ação não pode ser desfeita</Dialog.Description
			>
		</Dialog.Header>

		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Fechar</Dialog.Close>
			<Button variant="destructive">Excluir</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
