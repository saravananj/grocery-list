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
    
    <input type="search" v-model="grocerylistStore.searchText" placeholder="Search" />

    <div v-for="item in filteredList">
        <h5>{{ item.name }}</h5>
        <div>
            <span @click="decreaseQuantity(item)">-</span>
            <span>{{ item.quantity }}</span>
            <span @click="increaseQuantity(item)">+</span>
        </div>
    </div>

    <div>
        <button @click="updateCurrentScreen()">Export</button>
    </div>

</template>