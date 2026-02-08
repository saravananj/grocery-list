<script setup>
import { ref, computed  } from 'vue';
import { grocerylistStore } from '../../grocerylistStore.js';

//Define compute for the exported text to be used to display and copy
const exportText = computed(() => {

    let exportTextVal = '';
    let slNo = 1;

    exportTextVal += grocerylistStore.prependContent + '\n\n';

    grocerylistStore.list.forEach((item) => {

        if(item.quantity > 0) {
            exportTextVal += slNo + '. ' + item.name;
            if(item.quantity > 1) {
                exportTextVal += ' x ' + item.quantity;
            }
            exportTextVal += '\n';

            slNo++;
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
    <div class="h-full flex flex-col">
        
        <div class="px-4 py-3 border-b border-purple-300 bg-white sticky top-14 z-10">
            <h3 class="text-lg font-semibold text-gray-800">
                Export Grocery List
            </h3>
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-4">
            <textarea v-model="exportText" readonly disabled
                class="w-full h-full resize-none rounded-xl border-gray-300 bg-gray-50 p-4 text-sm leading-relaxed"></textarea>
        </div>

        <div class="fixed bottom-0 inset-x-0 bg-white border-t p-4 flex gap-3">
            <button @click="updateCurrentScreen()"
                class="flex-1 border border-gray-300 py-3 rounded-xl cursor-pointer font-medium hover:bg-gray-100">
                Back to list
            </button>

            <button @click="copyListContent()"
                class="flex-1 bg-purple-600 text-white py-3 rounded-xl cursor-pointer font-medium hover:bg-purple-700 transition">
                {{ copied ? 'Copied!' : 'Copy list' }}
            </button>
        </div>
    </div>
</template>
