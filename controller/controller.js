import view from "../view/view.js";
import {
    todos,
    todoCategories,
    todoObject,
    saveTodos,
    saveTodoCategories,
} from "../model/model.js";

const addTodo = document.querySelector("#addTodo");
const todoInput = document.querySelector("header input");
const addTodoCategory = document.querySelector(".addTodoCategory");
const inputForTodoCategory = document.getElementById("inputForTodoCategory");
const todoCategorySelect = document.querySelector("#todoCategories");

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function findTaskId(currentDivId, todoCategory) {
    for (let index = 0; index < todos[todoCategory].length; index++) {
        if (todos[todoCategory][index].id == Number(currentDivId)) {
            return index;
        }
    }
    return -1;
}

function changeValueOfTodo(event, todoCategory, currentDivId) {
    const index = findTaskId(currentDivId, todoCategory);
    const updatedValue = event.target.textContent;
    if (updatedValue.trim() == "") {
        const deleteButton = document.getElementById(
            `deleteButton-${currentDivId}`
        );
        deleteButton.click();
        return;
    }
    todos[todoCategory][index].value = updatedValue;
}

function handleCheckBoxEvent(div, divId, todoCategory) {
    const index = findTaskId(divId, todoCategory);
    div.classList.toggle("completed");
    todos[todoCategory][index].isComplete =
        !todos[todoCategory][index].isComplete;
    saveTodos();
}

function handleDeleteButtonEvent(div, divId, todoCategory) {
    const index = findTaskId(divId, todoCategory);
    todos[todoCategory].splice(index, 1);
    if (todos[todoCategory].length == 0) {
        delete todos[todoCategory];
        const removeCard = document.getElementById(todoCategory).parentNode;
        removeCard.remove();
    }
    div.remove();
    saveTodos();
}

function handlePinButtonEvent(div, divId, todoCategory) {
    const pinButton = div.childNodes[3];
    const index = findTaskId(divId, todoCategory);
    view.pinButtonChanges(pinButton);
    const isPin = todos[todoCategory][index].isPin;
    todos[todoCategory][index].isPin = !isPin;
    const todoToUpdate = todos[todoCategory][index];
    todos[todoCategory].splice(index, 1);
    const currentDisplay = document.getElementById(todoCategory);

    if (!isPin) {
        todos[todoCategory].unshift(todoToUpdate);
        currentDisplay.prepend(div);
    } else {
        todos[todoCategory].push(todoToUpdate);
        currentDisplay.append(div);
    }
    saveTodos();
}

export function createItem(newEntry, todoCategory) {
    const div = view.createDivWithAllElements(newEntry);
    const divId = div.getAttribute("data-id");

    const edit = div.childNodes[1];

    div.addEventListener("click", handleTodoEvents);

    function handleTodoEvents(event) {
        const id = event.target.getAttribute("id");
        if (id != null) {
            edit.classList.toggle("todoCardExpand");
        }

        if (id == null) {
            return;
        }

        if (id.startsWith("checkBox")) {
            handleCheckBoxEvent(div, divId, todoCategory);
        } else if (id.startsWith("deleteButton")) {
            handleDeleteButtonEvent(div, divId, todoCategory);
        } else if (id.startsWith("pinButton")) {
            handlePinButtonEvent(div, divId, todoCategory);
        }

        edit.addEventListener("dblclick", function () {
            if (!div.classList.contains("completed")) {
                edit.setAttribute("contenteditable", true);
                edit.focus();
            }
        });
    }

    edit.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            changeValueOfTodo(e, todoCategory, divId);
            edit.setAttribute("contenteditable", false);
            saveTodos();
        }
    });
    return div;
}

function addTodoClickEvent() {
    if (todoInput.value.trim().length == 0) {
        alert("Please Enter a Task");
    } else if (todoCategorySelect.value == "") {
        alert("Please select a valid category");
    } else {
        const value = todoInput.value;
        let todoCategory = todoCategorySelect.value;
        todoCategory = capitalizeFirstLetter(todoCategory);
        const uniqueId = new Date().valueOf();

        let newEntry = new todoObject(uniqueId, todoCategory, value);
        view.appendNewTodo(newEntry, todos.hasOwnProperty(todoCategory));
        if (todos.hasOwnProperty(todoCategory)) {
            todos[todoCategory].push(newEntry);
        } else {
            todos[todoCategory] = [];
            todos[todoCategory].push(newEntry);
        }

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

addTodoCategory.addEventListener("click", function (e) {
    let value = inputForTodoCategory.value;
    if (value.trim() === "") {
        alert("Please enter valid category");
    } else {
        value = capitalizeFirstLetter(value);
        if (!todoCategories.includes(value)) {
            todoCategories.push(value);
            view.appendNewCategory(value);
            saveTodoCategories();
        }
    }
    inputForTodoCategory.value = "";
});

inputForTodoCategory.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTodoCategory.click();
    }
});

$(function () {
    $("#todoCategories").select2();
});

window.addEventListener("load", function () {
    view.renderTodo(todos);
    view.renderCategories(todoCategories);
});
