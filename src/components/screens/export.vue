<script setup>
import { ref, computed  } from 'vue';
import { grocerylistStore } from '../../grocerylistStore.js';

//Define compute for the exported text to be used to display and copy
const exportText = computed(() => {

    let exportTextVal = '';

    exportTextVal += grocerylistStore.prependContent + '\n\n';

    grocerylistStore.list.forEach((item) => {

        if(item.quantity > 0) {
            exportTextVal += item.name;
            if(item.quantity > 1) {
                exportTextVal += ' x ' + item.quantity;
            }
            exportTextVal += '\n';
        }

    });

    exportTextVal += '\n\n' + grocerylistStore.appendContent;

    return exportTextVal;

});

//Declare the event this component can emit
const emit = defineEmits(['updateCurrentScreen']);

//Method that updates currentScreen state in parent component
const updateCurrentScreen = () => {
    emit('updateCurrentScreen', 'list');
};

//Method to copy the export text to the clipboard
const copyListContent = async () => {
    try {
        await navigator.clipboard.writeText(exportText.value);
        copied.value = true;
        setTimeout(() => copied.value = false, 1500); // Reset "Copied!" status
    } catch (err) {
        console.error('Failed to copy text: ', err);
        alert('Failed to copy text to clipboard');
    }
}

const copied = ref(false);

</script>

<template>
    <h3>Export Grocery list</h3>

    <div>
        <textarea v-model="exportText" readonly disabled></textarea>
    </div>

    <div>
        <button @click="updateCurrentScreen()">Back to list</button>
        <button @click="copyListContent()">{{ copied ? 'Copied!' : 'Copy list' }}</button>
    </div>
</template>