import view from '../view/view.js';
import {items, categories} from '../model/model.js';

const push = document.querySelector('#push');
const input = document.querySelector('#newtask input');
const dropDownSelection = document.querySelector('#taskType');

function createObj(id, category, value, isComplete, isPin) {
    this.id = id;
    this.category = category;
    this.value = value;
    this.isComplete = isComplete;
    this.isPin = isPin;
}

function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    return capitalized;
}

function findIndexInItems(currentDivId, categoryType) {
    for(let i=0; i<items[categoryType].length; i++) {
        if(items[categoryType][i].id == Number(currentDivId)) {
            console.log("Okkk");
            return i;
        }
    }
}

function changeValueOfTodo(eventData, categoryType) {
    const currentDivId = eventData.target.getAttribute('id').slice(5);
    const index = findIndexInItems(currentDivId, categoryType);
    console.log(index);
    items[categoryType][index].value = eventData.target.textContent;
    addItemAccordingToList();
}

export function createItem(newEntry, categoryType) {
    const div = view.createDivWithAllElements(newEntry);
    let isPin = false;

    const divId = div.getAttribute("data-id");

    const checkBox = div.childNodes[0];
    const deleteButton = div.childNodes[2];
    const pinButton = div.childNodes[3];
    const editButton = div.childNodes[1];

    // Delete
    deleteButton.onclick = function(e) {
        const currentDivId = e.target.getAttribute('id').slice(13);
        const index = findIndexInItems(currentDivId, categoryType);
        items[categoryType].splice(index, 1);
        if(items[categoryType].length == 0) {
            delete items[categoryType];
        }
        addItemAccordingToList();
    }

    // checkBox;
    checkBox.onclick = function(e) {
        const currentDivId = e.target.getAttribute('id').slice(9);
        const index = findIndexInItems(currentDivId, categoryType);

        if(!div.classList.contains('completed')) {
            div.classList.add('completed');
            items[categoryType][index].isComplete = true;
        } 
        else {
            div.classList.remove("completed"); 
            items[categoryType][index].isComplete = false;
        }
    }

    // Pin Button
    pinButton.onclick = function(e){
        const currentDivId = e.target.getAttribute("id").slice(10);
        console.log(currentDivId);
        const index = findIndexInItems(currentDivId, categoryType);

        if(!items[categoryType][index].isPin) {
            view.pinButtonChanges(pinButton, "#000");
            items[categoryType][index].isPin = !items[categoryType][index].isPin;
            const targetElement = items[categoryType][index];
            items[categoryType].splice(index, 1);
            items[categoryType].unshift(targetElement);
        }
        else {
            view.pinButtonChanges(pinButton, "grey");
            items[categoryType][index].isPin = !items[categoryType][index].isPin;
            const targetElement = items[categoryType][index];
            items[categoryType].splice(index, 1);
            items[categoryType].push(targetElement);
        }
        addItemAccordingToList();
    }

    // Edit Button
    editButton.addEventListener('click', function() {
        if(!div.classList.contains('completed')) {
            editButton.setAttribute('contenteditable', true);
        }
    });
    
    editButton.addEventListener('keypress', function(e) {
        if(e.key === "Enter") {
            changeValueOfTodo(e, categoryType);
            editButton.setAttribute('contenteditable', false);
        }
    });
    // console.log(div);
    return div;
}

function addItemAccordingToList(){
    view.remove();
    view.render(items);
}

function eventListnerPushButton(){
    if(input.value.trim().length == 0){
        alert("Please Enter a Task");
    }
    else if(dropDownSelection.value == "Select a category") {
        alert("Please select a valid category");
    }
    else{
        const value = input.value;
        let taskCategory = dropDownSelection.value;
        taskCategory = capitalizeFirstLetter(taskCategory);
        const uniqueId = new Date().valueOf();
        let isComplete = false;
        let isPin = false;

        let newEntry = new createObj(uniqueId, taskCategory, value, isComplete, isPin);
        if(items.hasOwnProperty(taskCategory)) {
            items[taskCategory].push(newEntry);
        }
        else {
            items[taskCategory] = [];   
            items[taskCategory].push(newEntry);
        }

        addItemAccordingToList(items);
        input.value = "";
    }
}

function eventListnerInput(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      push.click();
    }
}

input.addEventListener("keypress", eventListnerInput);
push.addEventListener("click", eventListnerPushButton);

const inputCategory = document.getElementById('inputCategory');
const addCategory = document.querySelector('.addCategory');

addCategory.addEventListener('click', function(e) {
    let value = inputCategory.value;
    value = capitalizeFirstLetter(value);
    if(value.trim()==="") {
        alert('Please enter valid category');
    }
    else {
        categories.push(value);
        view.removeOptions();
        view.renderOptions(categories);
    }
    inputCategory.value = "";   
})

function eventListnerInputCategory(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addCategory.click();
    }
}

inputCategory.addEventListener("keypress", eventListnerInputCategory);



// Jquery for select2
// TODO: do it with vanilla js

$(function(){
    $("#taskType").select2();
});

