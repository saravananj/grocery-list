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
	<h1>Grocery List</h1>

	<ListScreen  v-if="currentScreen == 'list'" @updateCurrentScreen="updateCurrentScreen" />
	<ExportScreen  v-if="currentScreen == 'export'" @updateCurrentScreen="updateCurrentScreen" />

</template>

<style scoped></style>
