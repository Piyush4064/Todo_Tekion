import view from '../view/view.js';
import taskList, { saveData } from '../model/model.js';

// window.onload = (event) => {
//     console.log("Hello");
//     view.render();
// };

// document.addEventListener("readystatechange", (event) => {
//     view.render();
// });

const push = document.querySelector('#push');
const input = document.querySelector('#newtask input');
const dropDownSelection = document.querySelector('#taskType');

function createObj(id, category, value) {
    this.id = id;
    this.category = category;
    this.value = value;
    this.isComplete = false;
}

function createItem(newEntry) {
    const div = view.createDivWithAllElements(newEntry);
    let isPin = false;

    input.value = "";
    // console.log(div.childNodes);
    div.childNodes[2].onclick = function() {
        div.remove();
    }

    div.childNodes[0].onclick = function() {
        if(!div.classList.contains('completed')) {
            div.classList.add('completed');
        } 
        else {
            div.classList.remove("completed"); 
        }
    }

    div.childNodes[3].onclick = function(){
        if(!this.isPin) {
            view.pinButtonChanges(div.childNodes[3], this, div, "#000", true);
            view.prependItem(div, newEntry);
        }
        else {
            view.pinButtonChanges(div.childNodes[3], this, div, "grey", false);
            view.appendItem(div, newEntry);
        }
    }

    div.childNodes[1].addEventListener('click', function() {
        if(!div.classList.contains('completed')) {
            div.childNodes[1].setAttribute('contenteditable', true);
        }
    });
    
    div.childNodes[1].addEventListener('blur', function() {
        div.childNodes[1].setAttribute('contenteditable', false);
    });
    
    div.childNodes[1].addEventListener('keypress', function(event) {
        if(event.key === "Enter") {
            div.childNodes[1].setAttribute('contenteditable', false);
        }
    });

    return div;
}

function addItemAccordingToList(newEntry){
    const newItem = createItem(newEntry);
    view.appendItem(newItem, newEntry);
}

function eventListnerPushButton(){
    if(input.value.trim().length == 0){
        alert("Please Enter a Task")
    }
    else{
        const value = input.value;
        let taskCategory = dropDownSelection.value;
        let id = 0;
        if(taskList.length==0) {
            id = 1;
        }
        else {
            let lastEntry = taskList[taskList.length-1];
            id = lastEntry.id + 1;
        }
        let newEntry = new createObj(id, taskCategory, value);
        taskList.push(newEntry);
        addItemAccordingToList(newEntry);
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


const editTodo = document.querySelector('.forInsert');

editTodo.addEventListener("focusout", function(e) {
    // console.log(e.target);
});






// Jquery for select2
// TODO: do it with vanilla js

$(function(){
    $("#taskType").select2();
});


console.log(new Date().valueOf());

