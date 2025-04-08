<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import Calendar from '../ui/components/Calendar.svelte';

	export const load = () => {
		const nickName = localStorage.getItem('nickName');
		console.log(nickName);

		if (!nickName) {
			alert('You are not logged in');
			throw redirect(302, '/login');
		}

		return { nickName };
	};
</script>

<div class="my-10">
	<Calendar />
</div>
