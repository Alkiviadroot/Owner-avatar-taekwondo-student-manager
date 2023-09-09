<script lang="ts">
	export let form;
</script>

<section class="container h-full mx-auto flex justify-center items-center">
	<div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
		<div class="w-full py-6 z-20">
			<h1 class="text-3xl font-bold">Σύνδεση</h1>
			<form action="?/login" method="POST" class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
				<div class="pb-2 pt-4">
					<input
						type="text"
						name="username"
						id="username"
						placeholder="Όνομα Χρήστη"
						class="input block w-full p-4 text-lg rounded-sm"
					/>
				</div>
				<div class="pb-2 pt-4">
					<input
						class="input block w-full p-4 text-lg rounded-sm"
						type="password"
						name="password"
						id="password"
						placeholder="Κωδικός"
					/>
				</div>
				<div class="px-4 pb-2 pt-4">
					<button class="btn variant-filled-primary uppercase block w-full p-4 text-lg rounded-full"
						>Συνδεθειτε</button
					>
				</div>

				{#if form?.notVerified || form?.notValid}
					<br />
					<h3 class="alert-message variant-ghost-error rounded-full p-1">{form?.message}</h3>
				{/if}
			</form>
		</div>
	</div>
</section>
