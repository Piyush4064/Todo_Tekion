const body = document.body;

const firstView = {
    render() {
        body.innerHTML = `<div class="container">
        <div id="newtask">
			<h1>Todo App</h1>
            <input type="text" placeholder="New Task">
            <button id="push">Add</button>
            
            <div class="dropDown">
                <label for="workCategory">Choose a category:</label>
                <select name="taskName" id="taskType" placeholder="Select a category">
                    <option value="work">Work</option>
                    <option value="sports">Sports</option>
                    <option value="household">Household</option>
                </select>   
            </div>
        </div>

        <div class="display">
            <div class="displayCategory">
                <h3>Work</h3>
                <div id="work" class="forInsert"></div>
            </div>
            
            <div class="displayCategory" id="centerDiv">
                <h3>Sports</h3>
                <div id="sports" class="forInsert"></div>
            </div>

            <div class="displayCategory">
                <h3>Household</h3>
                <div id="household" class="forInsert"></div>
            </div>
        </div>
        <div id="tasks"></div>
    </div>`;
    },
}

export default firstView;





















// const div1 = document.createElement('div');
//         div1.classList.add('container');

//         const div2 = document.createElement('div');
//         div2.setAttribute('id', 'newTask');

//         div1.append(div2);
//         const h1 = document.createElement('h1');
//         h1.textContent = "Todo App";

//         const input = document.createElement('input');
//         input.setAttribute('type', 'text');
//         input.setAttribute('placeholder', 'New Task');
        
//         const button = document.createElement('button');
//         input.setAttribute('id', 'push');
//         input.textContent = "Add";

//         div2.append(h1);
//         div2.append(input);
//         div2.append(button);

//         const div3 = document.createElement('div');
//         div2.setAttribute('class', 'dropDown');

//         const label = document.createElement('label');
//         label.setAttribute('for', 'workCategory');
//         label.textContent = "Choose a category:";

//         const select = document.createElement('select');
//         select.setAttribute('name', 'taskName');
//         select.setAttribute('id', 'taskType');
//         select.setAttribute('placeholder', 'Select a category');

//         const option1 = document.createElement('option');
//         option1.setAttribute('value', 'work');
//         const option2 = document.createElement('option');
//         option2.setAttribute('value', 'sports');
//         const option3 = document.createElement('option');
//         option3.setAttribute('value', 'household');

//         select.append(option1);
//         select.append(option2);
//         select.append(option3);
//         div3.append(label);
//         div3.append(select);

//         div2.append(div3);

//         const div4 = document.createElement('div');
//         div4.setAttribute('class', 'display');

//         const div5 = document.createElement('div');
//         div5.setAttribute('class', 'displayCategory');
//         const h31 = document.createElement('h3');
//         h31.textContent = 'Work';
//         const div6 = document.createElement('div'); 
//         div6.setAttribute('class', 'forInsert');
//         div6.setAttribute('id', 'work');
//         div5.append(h31);
//         div5.append(div6);

//         const div5 = document.createElement('div');
//         div5.setAttribute('class', 'displayCategory');
//         const h31 = document.createElement('h3');
//         h31.textContent = 'Work';
//         const div6 = document.createElement('div'); 
//         div6.setAttribute('class', 'forInsert');
//         div6.setAttribute('id', 'work');
//         div5.append(h31);
//         div5.append(div6);

//         const div5 = document.createElement('div');
//         div5.setAttribute('class', 'displayCategory');
//         const h31 = document.createElement('h3');
//         h31.textContent = 'Work';
//         const div6 = document.createElement('div'); 
//         div6.setAttribute('class', 'forInsert');
//         div6.setAttribute('id', 'work');
//         div5.append(h31);
//         div5.append(div6);