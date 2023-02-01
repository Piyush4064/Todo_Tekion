import { createItem } from "../controller/controller.js";

const display = document.querySelector('.display');
const taskType = document.querySelector('#taskType');

function createButton(type) {
    const button = document.createElement('button');
    button.innerHTML = type;
    return button;
}

const view = {
    remove() {
        while (display.lastElementChild) {
            display.removeChild(display.lastElementChild);
        }
    },

    render(items) {
        for(let item in items) {
            const outerDiv = document.createElement('div');
            outerDiv.classList.add('displayCategory');
            const h3 = document.createElement('h3');
            h3.textContent = `${item}`;
            const innerDiv = document.createElement('div');
            innerDiv.setAttribute('class', 'forInsert');
            outerDiv.append(innerDiv);
            innerDiv.append(h3);
            for(let element of items[item]) {
                let newItem = createItem(element, item);
                innerDiv.append(newItem);
            }
            display.append(outerDiv);
        }
        // console.log(items);
    },
    
    renderOptions(categories) {
        for(let category of categories) {
            const option = document.createElement('option');
            option.setAttribute('value', `${category}`);
            option.textContent = `${category}`;
            taskType.append(option);
        }
    },

    removeOptions() {
        while (taskType.lastElementChild) {
            taskType.removeChild(taskType.lastElementChild);
        }
    },

    createDivWithAllElements(newEntry) {
        const div = document.createElement('div');
        const uniqueId = newEntry.id;
        
        div.setAttribute("data-id", `${uniqueId}`);

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute("type", "checkbox");
        inputCheckBox.classList.add("checkBox");
        inputCheckBox.setAttribute('id', `checkBox-${uniqueId}`);

        const span = document.createElement('span');
        span.classList.add('inputSpan');
        span.innerText = newEntry.value;
        span.setAttribute("id", `edit-${uniqueId}`);

        div.classList.add("task");

        const button = createButton('<i class="fa-solid fa-trash"></i>');
        button.classList.add("delete");
        button.setAttribute("id", `deleteButton-${uniqueId}`);

        const pinButton = createButton('<i class="fa-solid fa-thumbtack"></i>');
        pinButton.classList.add('pinStyle');
        pinButton.setAttribute("id", `pinButton-${uniqueId}`);


        div.appendChild(inputCheckBox);
        div.appendChild(span);
        div.appendChild(button);
        div.appendChild(pinButton);
        
        return div;
    },

    pinButtonChanges(pinButton, color) {
        pinButton.style.backgroundColor = color;
    }
}


export default view;