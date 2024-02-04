import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

const list = document.getElementById("todo-list-container") as HTMLUListElement;
const form = document.getElementById("input-container") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;

let todoList: Todo[] = loadTodo();
todoList.forEach(addTodoItem);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "" || input.value === null) {
    return;
  } else {
    const newTodo: Todo = {
      id: uuidv4(),
      text: input.value,
      done: false,
    };

    todoList.push(newTodo);
    saveTodo();
    addTodoItem(newTodo);
    input.value = "";
  }
});

function addTodoItem(todo: Todo) {
  const li = document.createElement("li") as HTMLLIElement;
  const div = document.createElement("div") as HTMLDivElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  const label = document.createElement("label") as HTMLLabelElement;
  const trashBtn = document.createElement("button") as HTMLButtonElement;
  const trashImg = document.createElement("img") as HTMLImageElement;

  //ge varje listitem ett id
  li.id = todo.id;

  //klar-knappen
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = todo.done;
  //eventlistener som uppdaterar true or false på checkboxen i local storage
  checkbox.addEventListener("change", () => {
    todo.done = checkbox.checked;
    saveTodo();
    label.style.textDecoration = todo.done ? "line-through" : "none";
  });

  //texten
  label.setAttribute("for", todo.id);
  label.innerText = todo.text;
  label.style.textDecoration = todo.done ? "line-through" : "none";

  //raderaknappen
  trashBtn.classList.add("trash-btn");
  trashImg.src = "src/images/bin.png";
  trashImg.alt = "trashcan";
  trashImg.width = 20;
  trashBtn.addEventListener("click", () => {
    removeTodoItem(todo.id);
  });

  trashBtn.appendChild(trashImg);
  div.appendChild(checkbox);
  div.appendChild(label);
  li.appendChild(div);
  li.appendChild(trashBtn);
  list.appendChild(li);
}

function saveTodo() {
  localStorage.setItem("TODOS", JSON.stringify(todoList));
}

//laddar sparade todos från local storage och om ingen finns sparad så skickas en tom lista
function loadTodo(): Todo[] {
  const storedTodos = localStorage.getItem("TODOS");

  if (!storedTodos) {
    return [];
  } else {
    return JSON.parse(storedTodos) as Todo[];
  }
}

function removeTodoItem(todoId: string) {
  // filter uppdaterar todolist med alla som inte har samma id som den man vill ta bort
  todoList = todoList.filter((todo) => todo.id !== todoId);

  // spara den uppdaterade listan till local storage
  saveTodo();

  // tar bort den valda todon från html
  const liToRemove = document.getElementById(todoId);
  if (liToRemove) {
    liToRemove.remove();
  }
}
