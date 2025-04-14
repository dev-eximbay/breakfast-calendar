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

	function generateCalendar(y: number, m: number): Day[] {
		const result: Day[] = [];

		const startOfMonth = new Date(y, m, 1);
		const endOfMonth = new Date(y, m + 1, 0);
		const totalDays = endOfMonth.getDate();

		// 이전 달 앞부분 보정
		const firstDayOfWeek = startOfMonth.getDay(); // 0 = Sunday, 1 = Monday
		const prevMonth = new Date(y, m, 0);
		const prevMonthDays = prevMonth.getDate();

		for (let i = firstDayOfWeek - 1; i >= 0; i--) {
			const d = new Date(y, m - 1, prevMonthDays - i);
			if (d.getDay() >= 1 && d.getDay() <= 5) {
				result.push({ date: d, isCurrentMonth: false, menu: '' });
			}
		}

		for (let i = 1; i <= totalDays; i++) {
			const d = new Date(y, m, i);
			if (d.getDay() >= 1 && d.getDay() <= 5) {
				result.push({
					date: d,
					isCurrentMonth: true,
					menu: breakfastMenu.getMenu(y, m + 1, i)
				});
			}
		}

		// 다음 달 채우기
		while (result.length < 25) {
			// 평일만 기준으로 5x5 보장
			const last = result[result.length - 1].date;
			const next = new Date(last);
			next.setDate(last.getDate() + 1);
			if (next.getDay() >= 1 && next.getDay() <= 5) {
				result.push({
					date: next,
					isCurrentMonth: false,
					menu: ''
				});
			}
		}

		return result;
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

<div class="grid grid-cols-5 gap-1">
	<!-- 요일 -->
	{#each ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as day}
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
