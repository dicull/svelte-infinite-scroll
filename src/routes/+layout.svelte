<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import '../app.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		margin: 0 auto;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		max-width: 500px;
		background-color: rgb(225 225 225);
	}
</style>
