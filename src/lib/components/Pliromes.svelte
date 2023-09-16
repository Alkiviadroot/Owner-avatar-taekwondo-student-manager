<script lang="ts">
	export let data: any;
	import { Icon, Check } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms/client';
	import { timi } from '$lib/schemas';

	const { form, errors, constraints } = superForm(data.timiForm, {
		taintedMessage: 'Are you sure you want leave??',
		resetForm: true,
		validators: timi
	});
</script>

<div id="timi">
	<form id="genikiTimi" action="?/defaultTimi" method="POST">
		<label class="label">
			<span>Γενική τιμή Μήνα</span>{#if $errors.timi}
				<small class="variant-filled-error p-1 px-2 rounded-full ml-2">⚠ {$errors.timi}</small>
			{/if}
			<div class="input-group input-group-divider grid-cols-[1fr_auto]">
				<input
					type="number"
					name="timi"
					id="timi"
					class="input"
					value={$form.timi}
					{...$constraints.timi}
				/>
				<button type="submit" class="btn variant-filled-success">
					<Icon src={Check} class="w-4 h-4 mr-1" />
				</button>
			</div>
		</label>
	</form>
</div>
