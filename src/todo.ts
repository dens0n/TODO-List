import {v4 as uuidv4} from 'uuid';

let myuuid = uuidv4();

console.log('Your UUID is: ' + myuuid);


const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoListContainer = document.getElementById(
  "todo-list-container"
) as HTMLUListElement;

let todoList: string[] = [];
let counter = 1;

function addToTodoList(value: string) {
  //skapa elementen
  const li = document.createElement("li") as HTMLLIElement;
  const div = document.createElement("div") as HTMLDivElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  const label = document.createElement("label") as HTMLLabelElement;
  const trashBtn = document.createElement("button") as HTMLButtonElement;
  const trashImg = document.createElement("img") as HTMLImageElement;

  //ge varje listitem ett id
  const itemId = `${counter++}`;
  li.id = itemId;

  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  label.setAttribute("for", itemId);
  label.innerText = value;

  trashBtn.classList.add("trash-btn");

  trashImg.src = "src/images/bin.png";
  trashImg.alt = "trashcan";
  trashImg.width = 20;

  trashBtn.appendChild(trashImg);

  div.appendChild(checkbox);
  div.appendChild(label);

  li.appendChild(div);
  li.appendChild(trashBtn);

  todoListContainer.appendChild(li);

  //checkbox eventlistener ifall todo är markerad
  checkbox.addEventListener("change", () => {
    // togglar ett sträck över texten
    if (checkbox.checked) {
      label.style.textDecoration = "line-through";
      moveItemToBottom(li);
    } else {
      label.style.textDecoration = "none";
    }
  });

  // eventlistener för att radera ett list item
  trashBtn.addEventListener("click", () => {
    todoListContainer.removeChild(li);
  });
}

function moveItemToBottom(item: HTMLLIElement) {
  // flytter item till botten
  todoListContainer.appendChild(item);
}

addBtn.addEventListener("click", () => {
  if (todoInput.value === "") {
    return;
  } else {
    todoList.push(todoInput.value);

    addToTodoList(todoInput.value);

    todoInput.value = "";
  }
});
