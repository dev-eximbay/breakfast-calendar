<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		const currentPath = window.location.pathname;
		const nickName = localStorage.getItem('nickName');
		console.log('currentPath:', currentPath, 'nickName:', nickName);

		// 로그인 페이지는 예외 처리
		if (currentPath !== '/login' && !nickName) {
			alert('로그인이 필요합니다.');
			goto('/login');
		}
	});
</script>

{@render children()}
