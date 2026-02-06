<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';

	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	import { buttonVariants } from '../ui/button';
	import type { Restaurant } from '../../../app';
	import { Pencil } from '@lucide/svelte';

	const { data }: { data?: Restaurant } = $props();
	const isEdit = $derived(Boolean(data));

	const TITLE = $derived(isEdit ? 'Editar restaurante' : 'Criar restaurante');
	const DESCRIPTION = $derived(isEdit ? 'Atualize o restaurante' : 'Crie um novo restaurante');
	const CONFIRM_BUTTON = $derived(isEdit ? 'Editar' : 'Criar');
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
		{#if isEdit}
			<Pencil />
		{:else}
			Criar restaurantes
		{/if}
	</Dialog.Trigger>

	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>{TITLE}</Dialog.Title>
			<Dialog.Description>{DESCRIPTION}</Dialog.Description>
		</Dialog.Header>

		<form class="grid gap-6" method="POST" action={`?/maintain`}>
			<input type="hidden" name="id" value={data?.id} />

			<div class="grid gap-3">
				<Label>Nome</Label>
				<Input
					type="text"
					placeholder="Nome do restaurante"
					name="name"
					defaultValue={data?.name}
				/>
			</div>

			<div class="grid gap-3">
				<Label>Endereço</Label>
				<Input
					type="text"
					placeholder="Endereço do restaurante"
					name="address"
					defaultValue={data?.address}
				/>
			</div>

			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Fechar</Dialog.Close>
				<Button type="submit">{CONFIRM_BUTTON}</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
