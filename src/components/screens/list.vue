<script setup>
import { computed } from 'vue';
import { grocerylistStore } from '../../grocerylistStore.js';

//Declare the event this component can emit
const emit = defineEmits(['updateCurrentScreen']);

//Method that updates currentScreen state in parent component
const updateCurrentScreen = () => {
    emit('updateCurrentScreen', 'export');
};

//Form displayable list based on search
const filteredList = computed(() => {
    const search = grocerylistStore.searchText.trim().toLowerCase()

    if (!search) {
        return grocerylistStore.list
    }

    return grocerylistStore.list.filter(item =>
        item.name.toLowerCase().includes(search)
    )
});

//Method to increase the quantiry, param - item reference
const increaseQuantity = (item) => {
    item.quantity++;
}

//Method to decrease the quantiry, param - item reference
const decreaseQuantity = (item) => {
    item.quantity--;
    if(item.quantity < 0)
    {
        item.quantity = 0;
    }
}
</script>

<template>
    <div class="h-full flex flex-col">
        
        <div class="px-4 py-3 bg-white border-b border-purple-300 focus-within:border-purple-600 sticky top-14 z-10">
            <input type="search" v-model="grocerylistStore.searchText" placeholder="Search groceries..."
                class="w-full text-gray-700 focus:outline-0" />
        </div>

        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3 mb-20">
            <div v-for="item in filteredList" :key="item.name"
                :class="[(item.quantity > 0) ? 'outline-1 outline-purple-500 bg-purple-50' : 'bg-white', 'rounded-xl shadow-sm px-4 py-3 flex items-center justify-between']">
                <h5 class="font-medium text-gray-600">{{ item.name }}</h5>

                <div class="flex items-center gap-3">
                    <button @click="decreaseQuantity(item)"
                        class="w-8 h-8 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-lg cursor-pointer">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                        </svg>
                    </button>

                    <span class="min-w-[24px] text-center font-semibold">
                        {{ item.quantity }}
                    </span>

                    <button @click="increaseQuantity(item)"
                        class="w-8 h-8 p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 text-lg cursor-pointer">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Bottom Action Bar -->
        <div class="fixed bottom-0 inset-x-0 bg-white border-t p-4">
            <button @click="updateCurrentScreen()"
                class="w-full bg-purple-600 text-white py-3 rounded-xl cursor-pointer font-medium hover:bg-purple-700 transition">
                Export
            </button>
        </div>
    </div>
</template>
