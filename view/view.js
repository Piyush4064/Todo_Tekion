import { createItem } from "../controller/controller.js";

const cardsForAllCategories = document.querySelector(".cardsForAllCategories");
const todoCategories = document.querySelector("#todoCategories");

function createButton(iconType, className) {
    const button = document.createElement("button");
    button.innerHTML = iconType;
    button.classList.add(className);
    return button;
}

function createCardForNewCategory(todoCategory) {
    const cardForCategory = document.createElement("div");
    cardForCategory.classList.add("card");
    const h3 = document.createElement("h3");
    h3.textContent = todoCategory;
    const cardForTodo = document.createElement("div");
    cardForTodo.setAttribute("class", "forInsert");
    cardForTodo.setAttribute("id", todoCategory);
    cardForCategory.append(h3);
    cardForCategory.append(cardForTodo);
    return [cardForCategory, cardForTodo];
}

function checkForCompletedAndPinned(newItem, data) {
    const checkBox = newItem.childNodes[0];
    const pinButton = newItem.childNodes[3];
    if (data.isComplete) {
        checkBox.checked = true;
        newItem.classList.toggle("completed");
    }
    if (data.isPin) {
        pinButton.classList.add("pinButtonToggle");
    }
}

const view = {
    renderTodo(todos) {
        for (let categoryOfTodo in todos) {
            const [cardForCategory, cardForTodo] =
                createCardForNewCategory(categoryOfTodo);
            for (let entry of todos[categoryOfTodo]) {
                let newTodo = createItem(entry, categoryOfTodo);
                checkForCompletedAndPinned(newTodo, entry);
                cardForTodo.append(newTodo);
            }
            cardsForAllCategories.append(cardForCategory);
        }
    },

    renderCategories(categorySelectOptions) {
        for (let item of categorySelectOptions) {
            const option = document.createElement("option");
            option.setAttribute("value", item);
            option.textContent = item;
            todoCategories.append(option);
        }
    },

    appendNewCategory(value) {
        const option = document.createElement("option");
        option.setAttribute("value", value);
        option.textContent = value;
        todoCategories.append(option);
    },

    appendNewTodo(newEntry, cardForNewCategory) {
        if (!cardForNewCategory) {
            const [cardForCategory, cardForTodo] = createCardForNewCategory(
                newEntry.todoCategory
            );
            cardsForAllCategories.append(cardForCategory);
        }
        const currentDisplay = document.getElementById(newEntry.todoCategory);
        let newTodo = createItem(newEntry, newEntry.todoCategory);
        currentDisplay.append(newTodo);
    },

    createDivWithAllElements(newEntry) {
        const div = document.createElement("div");
        const uniqueId = newEntry.id;
        div.setAttribute("data-id", uniqueId);

        const inputCheckBox = document.createElement("input");
        inputCheckBox.setAttribute("type", "checkbox");
        inputCheckBox.classList.add("checkBox");
        inputCheckBox.setAttribute("id", `checkBox-${uniqueId}`);

        const span = document.createElement("span");
        span.classList.add("inputSpan");
        span.innerText = newEntry.value;
        span.setAttribute("id", `edit-${uniqueId}`);

        div.classList.add("todoCard");

        const button = createButton(
            '<i class="fa-solid fa-trash"></i>',
            "delete"
        );
        button.setAttribute("id", `deleteButton-${uniqueId}`);

        const pinButton = createButton(
            '<i class="fa-solid fa-thumbtack"></i>',
            "pinStyle"
        );
        pinButton.setAttribute("id", `pinButton-${uniqueId}`);

        div.appendChild(inputCheckBox);
        div.appendChild(span);
        div.appendChild(button);
        div.appendChild(pinButton);
        return div;
    },

    pinButtonChanges(pinButton) {
        pinButton.classList.toggle("pinButtonToggle");
    },
};

export default view;
