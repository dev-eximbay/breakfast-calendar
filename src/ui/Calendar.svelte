<script lang="ts">
	const { test }: { test: string } = $props();
	const uid = $props.id();
	console.log('calendar.svelte', test);
</script>

<div class="calendar">
	<h1>Calendar</h1>
	<p>
		{uid}
	</p>
</div>

<style>
	.calendar {
		padding: 20px;
		background-color: #f0f0f0;
		border-radius: 8px;
	}
	.calendar h1 {
		font-size: 24px;
		margin-bottom: 10px;
	}
	.calendar p {
		font-size: 16px;
		color: #333;
	}
</style>
