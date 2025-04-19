<script lang="ts">
	import '../app.css';

	let { children } = $props();

	// onMount(() => {
	// 	const currentPath = window.location.pathname;
	// 	const nickName = localStorage.getItem('nickName');
	// 	console.log('currentPath:', currentPath, 'nickName:', nickName);

	// 	// 로그인 페이지는 예외 처리
	// 	if (currentPath !== '/login' && !nickName) {
	// 		alert('로그인이 필요합니다.');
	// 		goto('/login');
	// 	}
	// });
</script>

<main
	class="relative mx-auto flex max-h-[100svh] min-h-screen max-w-[800px] flex-col overflow-scroll bg-gray-100"
>
	<header>
		<div class="flex h-16 items-center justify-between bg-gray-800 px-4 text-white">
			<div class="text-lg font-bold">EXIMBAY 조식 캘린더</div>
			<div class="flex items-center space-x-4">
				<a href="/login" class="text-gray-300 hover:text-white">Login</a>
			</div>
		</div>
	</header>
	<div class="flex-1">
		{@render children()}
	</div>
	<footer class="w-full">
		<div class="flex h-16 flex-col items-center justify-center bg-gray-800 text-white">
			<p>© 2023 EXIMBAY. All rights reserved.</p>
			<!-- <p class="text-sm font-thin">
				made by <a
					class="font-normal text-blue-400"
					href="https://eximbay-hq.slack.com/team/U04V07D0D4M"
					target="_blank">Robin</a
				>
			</p> -->
		</div>
	</footer>
</main>

<style>
	main {
		scrollbar-width: none;
	}
	::-webkit-scrollbar {
		display: none;
	}
</style>
