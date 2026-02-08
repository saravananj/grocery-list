import { reactive } from 'vue'

import inventoryData from './inventory.json';

let groceryList = [];

//Form the groceryList object from the available inventry
inventoryData.list.forEach(function(item){
    let groceryItem = {
        name: item,
        quantity: 0
    };

    groceryList.push(groceryItem);
});

export const grocerylistStore = reactive({
    list: groceryList,
    searchText: '',
    prependContent: inventoryData.prependContent,
    appendContent: inventoryData.appendContent
})