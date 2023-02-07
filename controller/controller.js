import view from '../view/view.js';
import {todos, todoCategories, createObject, saveTodos, saveTodoCategories} from '../model/model.js';

const addTodo = document.querySelector('#addTodo');
const todoInput = document.querySelector('header input');
const addTodoCategory = document.querySelector('.addTodoCategory');
const inputForTodoCategory = document.getElementById('inputForTodoCategory');
const todoCategorySelect = document.querySelector('#todoCategories');


function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function findTaskId(currentDivId, todoCategory) {
    for(let index=0; index<todos[todoCategory].length; index++) {
        if(todos[todoCategory][index].id == Number(currentDivId)) {
            return index;
        }
    }
    return -1;
}

function changeValueOfTodo(event, todoCategory, currentDivId) {
    const index = findTaskId(currentDivId, todoCategory);
    const updatedValue = event.target.textContent;
    if(updatedValue.trim()=="") {
        const deleteButton = document.getElementById(`deleteButton-${currentDivId}`);
        deleteButton.click();
        return;
    }
    todos[todoCategory][index].value = updatedValue;
}

export function createItem(newEntry, todoCategory) {
    const div = view.createDivWithAllElements(newEntry);
    const divId = div.getAttribute("data-id");

    const edit = div.childNodes[1];
    const pinButton = div.childNodes[3];
    
    // Overall event listner of a todo
    div.addEventListener('click', handleAllEventsOfTodo);

    function handleAllEventsOfTodo(event) {
        const id = event.target.getAttribute('id');
        if(id!=null) {
            // edit.style.maxHeight = "auto";
            edit.classList.toggle('todoCardExpand');
        }

        if(id==null) {
            return;
        }
        else if(id.startsWith("checkBox")) {
            const index = findTaskId(divId, todoCategory);
            div.classList.toggle("completed");
            todos[todoCategory][index].isComplete = !todos[todoCategory][index].isComplete;
            saveTodos();
        }
        else if(id.startsWith("deleteButton")) {
            const index = findTaskId(divId, todoCategory);
            todos[todoCategory].splice(index, 1);
            if(todos[todoCategory].length == 0) {
                delete todos[todoCategory];
                const removeCard = document.getElementById(todoCategory).parentNode;
                removeCard.remove();
            }
            div.remove();
            saveTodos();
        }
        else if(id.startsWith("pinButton")) {
            const index = findTaskId(divId, todoCategory);
            view.pinButtonChanges(pinButton);
            const isPin = todos[todoCategory][index].isPin;
            todos[todoCategory][index].isPin = !todos[todoCategory][index].isPin;
            const todoToUpdate = todos[todoCategory][index];
            todos[todoCategory].splice(index, 1);
            const currentDisplay = document.getElementById(todoCategory);

            if(!isPin) {
                todos[todoCategory].unshift(todoToUpdate);
                currentDisplay.prepend(div);
            }
            else {
                todos[todoCategory].push(todoToUpdate);
                currentDisplay.append(div);
            }
            saveTodos();
        }

        edit.addEventListener("dblclick", function() {
            if(!div.classList.contains('completed')) {
                edit.setAttribute('contenteditable', true);
                edit.focus();
            }
        })
    }
    
    edit.addEventListener('keypress', function(e) {
        if(e.key === "Enter") {
            changeValueOfTodo(e, todoCategory, divId);
            edit.setAttribute('contenteditable', false);
            saveTodos();
        }
    });
    return div;
}

function addTodoClickEvent(){
    if(todoInput.value.trim().length == 0){
        alert("Please Enter a Task");
    }
    else if(todoCategorySelect.value == "") {
        alert("Please select a valid category");
    }
    else{
        const value = todoInput.value;
        let todoCategory = todoCategorySelect.value;
        todoCategory = capitalizeFirstLetter(todoCategory);
        const uniqueId = new Date().valueOf();
        let isComplete = false;
        let isPin = false;

        let newEntry = new createObject(uniqueId, todoCategory, value, isComplete, isPin);
        view.appendNewTodo(newEntry, todos.hasOwnProperty(todoCategory));
        if(todos.hasOwnProperty(todoCategory)) {
            todos[todoCategory].push(newEntry);
        }
        else {
            todos[todoCategory] = [];   
            todos[todoCategory].push(newEntry);
        }

        // const currentTodoCategory = structuredClone(todos[todoCategory]);
        // todos[todoCategory] = structuredClone([...currentTodoCategory || [], newEntry]);
        todoInput.value = "";
        saveTodos();
    }
}

function addTodoEnterEvent(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo.click();
    }
}

todoInput.addEventListener("keypress", addTodoEnterEvent);
addTodo.addEventListener("click", addTodoClickEvent);

addTodoCategory.addEventListener('click', function(e) {
    let value = inputForTodoCategory.value;
    if(value.trim()==="") {
        alert('Please enter valid category');
    }
    else {
        value = capitalizeFirstLetter(value);
        if(!todoCategories.includes(value)) {
            todoCategories.push(value);
            view.appendNewCategory(value);
            saveTodoCategories();
        }
    }
    inputForTodoCategory.value = "";   
})

inputForTodoCategory.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodoCategory.click();
    }
});



// Jquery for select2
// TODO: do it with vanilla js

$(function(){
    $("#todoCategories").select2();
});


window.addEventListener("load", function() {
    view.renderTodo(todos);
    view.renderCategories(todoCategories);
});