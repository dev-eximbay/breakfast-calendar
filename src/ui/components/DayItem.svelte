<script lang="ts">
	export let date: Date;
	export let isCurrentMonth: boolean;
	export let isToday: boolean;
</script>

<div
	class={`flex h-[50px] w-full items-center justify-center rounded 
	${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}
>
	<div
		class={`flex h-[40px] w-[40px] items-center justify-center rounded-full ${isToday ? 'bg-blue-500 text-white' : 'bg-white'}`}
	>
		{date.getDate()}
	</div>
</div>
