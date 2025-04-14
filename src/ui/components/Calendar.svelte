<script lang="ts">
	import breakfastMenu from '../../store/breakfast-menu';
	import DayItem from './DayItem.svelte';

	let today = new Date();
	let year = $state(today.getFullYear());
	let month = $state(today.getMonth()); // 0 ~ 11

	interface Day {
		date: Date;
		menu: string;
		isCurrentMonth: boolean;
	}

	let days: Day[] = $state([]);

	$effect(() => {
		breakfastMenu.fetchItems(year, month + 1).then(() => {
			days = generateCalendar(year, month);
		});
	});

	function generateCalendar(year: number, month: number): Day[] {
		const startOfMonth = new Date(year, month, 1);
		const endOfMonth = new Date(year, month + 1, 0);
		const firstDayOfWeek = startOfMonth.getDay();

		const totalDays = endOfMonth.getDate();
		const days: Day[] = [];

		const prevMonth = new Date(year, month, 0);
		const prevMonthDays = prevMonth.getDate();
		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthDays - i),
				isCurrentMonth: false,
				menu: ''
			});
		}

		for (let i = 1; i <= totalDays; i++) {
			days.push({
				date: new Date(year, month, i),
				isCurrentMonth: true,
				menu: breakfastMenu.getMenu(year, month + 1, i)
			});
		}

		while (days.length < 42) {
			const last = days[days.length - 1].date;
			const next = new Date(last);
			next.setDate(last.getDate() + 1);
			days.push({
				date: next,
				isCurrentMonth: false,
				menu: '' // 다음 달의 날짜
			});
		}

		return days;
	}

	function prevMonth() {
		if (month === 0) {
			month = 11;
			year--;
		} else {
			month--;
		}
	}

	function nextMonth() {
		if (month === 11) {
			month = 0;
			year++;
		} else {
			month++;
		}
	}
</script>

<div class="mb-4 flex items-center justify-between">
	<button onclick={prevMonth} class="cursor-pointer rounded bg-gray-200 p-3">&lt;</button>
	<h2 class="text-xl font-bold">{year}년 {month + 1}월</h2>
	<button onclick={nextMonth} class="cursor-pointer rounded bg-gray-200 p-3">&gt;</button>
</div>

<div class="grid grid-cols-7 gap-1">
	<!-- 요일 -->
	{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
		<div class="text-center font-bold">{day}</div>
	{/each}

	<!-- 날짜 -->
	{#each days as { date, isCurrentMonth, menu }}
		{#if date.toDateString() === today.toDateString()}
			<DayItem {date} {isCurrentMonth} {menu} isToday />
		{:else}
			<DayItem {date} {isCurrentMonth} {menu} isToday={false} />
		{/if}
	{/each}
</div>
