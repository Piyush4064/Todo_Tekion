import view from "../view/view.js";
import {
    todos,
    todoCategories,
    todoObject,
    updateTodosInStore,
    updateCategoriesInStore,
} from "../model/model.js";

const addTodo = document.querySelector("#addTodo");
const todoInput = document.querySelector("header input");
const addTodoCategory = document.querySelector(".addTodoCategory");
const todoCategoryInput = document.getElementById("inputForTodoCategory");
const todoCategorySelect = document.querySelector("#todoCategories");
const ENTER = "Enter";

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function findTaskId(currentDivId, todoCategory) {
    let index = todos[todoCategory].findIndex((todo) => todo.id === Number(currentDivId));
    return index;
}

function changeTodoValue(event, todoCategory, currentDivId) {
    const index = findTaskId(currentDivId, todoCategory);
    const updatedValue = event.target.textContent;
    if (updatedValue.trim() == "") {
        const deleteButton = document.getElementById(`deleteButton-${currentDivId}`);
        deleteButton.click();
        return;
    }
    todos[todoCategory][index].value = updatedValue;
}

function completeTodo(div, divId, todoCategory) {
    const index = findTaskId(divId, todoCategory);
    div.classList.toggle("completed");
    todos[todoCategory][index].isComplete = !todos[todoCategory][index].isComplete;
    updateTodosInStore();
}

function deleteTodo(div, divId, todoCategory) {
    const index = findTaskId(divId, todoCategory);
    todos[todoCategory].splice(index, 1);
    if (todos[todoCategory].length == 0) {
        delete todos[todoCategory];
        const removeCard = document.getElementById(todoCategory).parentNode;
        removeCard.remove();
    }
    div.remove();
    updateTodosInStore();
}

function pinTodo(div, divId, todoCategory) {
    const pinButton = div.childNodes[3];
    const index = findTaskId(divId, todoCategory);
    view.pinButtonChanges(pinButton);
    const isPin = todos[todoCategory][index].isPin;
    todos[todoCategory][index].isPin = !isPin;
    const todoToUpdate = todos[todoCategory][index];
    todos[todoCategory].splice(index, 1);
    const currentDisplay = document.getElementById(todoCategory);

    if (isPin) {
        todos[todoCategory].push(todoToUpdate);
        currentDisplay.append(div);
    } else {
        todos[todoCategory].unshift(todoToUpdate);
        currentDisplay.prepend(div);
    }
    updateTodosInStore();
}

function handleTodoEvents(event, edit, div, todoCategory) {
    const id = event.target.getAttribute("id");
    const divId = div.getAttribute("data-id");

    if (id == null) {
        return;
    }

    if (id.startsWith("checkBox")) {
        completeTodo(div, divId, todoCategory);
    } else if (id.startsWith("deleteButton")) {
        deleteTodo(div, divId, todoCategory);
    } else if (id.startsWith("pinButton")) {
        pinTodo(div, divId, todoCategory);
    }

    edit.addEventListener("dblclick", function () {
        if (!div.classList.contains("completed")) {
            edit.setAttribute("contenteditable", true);
            edit.focus();
        }
    });
}

export function createItem(newTodo, todoCategory) {
    const div = view.createDivWithAllElements(newTodo);
    const divId = div.getAttribute("data-id");
    const edit = div.childNodes[1];

    div.addEventListener("click", handleClick);
    function handleClick(event) {
        handleTodoEvents(event, edit, div, todoCategory);
    }

    edit.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            changeTodoValue(e, todoCategory, divId);
            edit.setAttribute("contenteditable", false);
            updateTodosInStore();
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

        let newTodo = new todoObject(uniqueId, todoCategory, value);
        view.appendNewTodo(newTodo, todos.hasOwnProperty(todoCategory));
        if (todos.hasOwnProperty(todoCategory)) {
            todos[todoCategory].push(newTodo);
        } else {
            todos[todoCategory] = [];
            todos[todoCategory].push(newTodo);
        }

        todoInput.value = "";
        updateTodosInStore();
    }
}

function addTodoEnterEvent(event) {
    if (event.key === ENTER) {
        event.preventDefault();
        addTodo.click();
    }
}

todoInput.addEventListener("keypress", addTodoEnterEvent);
addTodo.addEventListener("click", addTodoClickEvent);

addTodoCategory.addEventListener("click", function (e) {
    let value = todoCategoryInput.value;
    if (value.trim() === "") {
        alert("Please enter valid category");
    } else {
        value = capitalizeFirstLetter(value);
        if (!todoCategories.includes(value)) {
            todoCategories.push(value);
            view.appendNewCategory(value);
            updateCategoriesInStore();
        }
    }
    todoCategoryInput.value = "";
});

todoCategoryInput.addEventListener("keypress", function (event) {
    if (event.key === ENTER) {
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
