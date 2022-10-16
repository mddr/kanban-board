<script lang="ts">
	import { onMount } from "svelte";
	import type { field } from "svelte-forms";

	export let label: string;
	export let id: string;
	export let inputType: "text" | "color" = "text";
	export let fieldDef: ReturnType<typeof field>;

	let ref: HTMLInputElement;

	onMount(() => {
		if (ref) {
			ref.type = inputType;
		}
	});
</script>

<div class="flex flex-col">
	<label for={id}>{label}</label>
	<input
		{id}
		aria-describedby="{id}-error"
		class={$fieldDef.invalid ? "border-b-red-500" : "border-b-fuchsia-700"}
		bind:this={ref}
		bind:value={$fieldDef.value}
	/>
	{#if $fieldDef.invalid}
		<span id="{id}-error" class="text-sm text-red-500"> Field required </span>
	{/if}
</div>

<style>
	input {
		@apply border-2;
	}
</style>
