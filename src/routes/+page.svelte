<script lang="ts">
	import { redirect } from '@sveltejs/kit';

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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
