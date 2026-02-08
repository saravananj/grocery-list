<script setup>
	import { ref } from 'vue'

	import ListScreen from './components/screens/list.vue'
	import ExportScreen from './components/screens/export.vue'

	let currentScreen = ref("list");

	//Method to update currentScreen state
	const updateCurrentScreen = (screen) => {
		currentScreen.value = screen;
	};

</script>

<template>
	<div class="h-screen flex flex-col bg-gray-50">
		
		<header class="fixed top-0 inset-x-0 h-14 bg-purple-600 text-white flex items-center justify-center shadow z-10">
			<h1 class="text-lg font-semibold tracking-wide">Grocery List</h1>
		</header>

		<main class="flex-1 pt-14">
			<ListScreen v-if="currentScreen === 'list'" @updateCurrentScreen="updateCurrentScreen" />
			<ExportScreen v-if="currentScreen === 'export'" @updateCurrentScreen="updateCurrentScreen" />
		</main>
	</div>
</template>


<style scoped></style>
