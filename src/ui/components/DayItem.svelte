<script lang="ts">
	export let date: Date;
	export let isCurrentMonth: boolean;
	export let isToday: boolean;
	export let menu: string;
</script>

<div
	class={`flex min-h-[90px] w-full flex-col items-center rounded p-2 
		${isCurrentMonth ? 'bg-gray-800' : 'bg-gray-500'} 
		${isCurrentMonth ? 'text-white' : 'text-gray-400'}`}
>
	<div
		class={`flex h-[30px] w-[30px] items-center justify-center rounded-full ${isToday ? 'bg-blue-500 text-white' : 'text-white'}`}
	>
		{date.getDate()}
	</div>
	<div class="my-1 h-[1px] w-full bg-white"></div>
	<span class="mt-1 text-xs">
		{menu}
	</span>
</div>
