const workList = document.querySelector('#work');
const sportsList = document.querySelector('#sports');
const householdList = document.querySelector('#household');

function createButton(type) {
    const button = document.createElement('button');
    button.innerHTML = type;
    return button;
}

const view = {
    appendItem(div, data) {
        if(data.category === "work") {
            workList.append(div);
        }
        else if(data.category === "sports") {
            sportsList.append(div);
        }
        else {
            householdList.append(div);
        }
    },
    
    prependItem(div, data) {
        if(data.category === "work") {
            workList.prepend(div);
        }
        else if(data.category === "sports") {
            sportsList.prepend(div);
        }
        else {
            householdList.prepend(div);
        }
    },

    createDivWithAllElements(newEntry) {
        const div = document.createElement('div');

        const inputCheckBox = document.createElement('input');
        inputCheckBox.setAttribute("type", "checkbox");
        inputCheckBox.classList.add("checkBox");

        const span = document.createElement('span');
        span.classList.add('inputSpan');
        span.innerText = newEntry.value;


        div.classList.add("task");

        const button = createButton('<i class="fa-solid fa-trash"></i>');
        button.classList.add("delete");

        const pinButton = createButton('<i class="fa-solid fa-thumbtack"></i>');
        pinButton.classList.add('pinStyle');


        div.appendChild(inputCheckBox);
        div.appendChild(span);
        div.appendChild(button);
        div.appendChild(pinButton);

        return div;
    },

    pinButtonChanges(pinButton, data, div, color, bool) {
        pinButton.style.backgroundColor = color;
        data.isPin = bool;
    }
}


export default view;