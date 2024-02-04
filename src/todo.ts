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

//funktion som lägger till alla listelement i ul listan.
function addTodoItem(todo: Todo) {
  //skapa HTML element som behövs
  const li = document.createElement("li") as HTMLLIElement;
  const div = document.createElement("div") as HTMLDivElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  const label = document.createElement("label") as HTMLLabelElement;
  const trashBtn = document.createElement("button") as HTMLButtonElement;
  const trashImg = document.createElement("img") as HTMLImageElement;

  //ge varje listitem ett unikt id
  li.id = todo.id;

  //"klar-knappen"
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = todo.done;
  //eventlistener som uppdaterar true or false på checkboxen i local storage
  checkbox.addEventListener("change", () => {
    todo.done = checkbox.checked;
    label.style.textDecoration = todo.done ? "line-through" : "none";
    saveTodo();
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

//Sparar ner de todos som finns i listan till local storage
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

//raderar den todo man vill ta bort
function removeTodoItem(todoId: string) {
  const liToRemove = document.getElementById(todoId);

  if (liToRemove) {
    // transition när elementet tas bort
    liToRemove.classList.add("removing");

    setTimeout(() => {
      // Tar bort elementet från HTML
      liToRemove.remove();

      // filter uppdaterar todolist med alla som inte har samma id som den man vill ta bort
      todoList = todoList.filter((todo) => todo.id !== todoId);

      // spara den uppdaterade listan till local storage
      saveTodo();
    }, 300);
  }
}
