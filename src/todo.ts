import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  date: Date;
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
      date: new Date(),
    };

    todoList.push(newTodo);
    saveTodo();
    addTodoItem(newTodo);
    input.value = "";
    console.log(todoList);
  }
});

function addTodoItem(newTodo: Todo) {
  const li = document.createElement("li") as HTMLLIElement;
  const div = document.createElement("div") as HTMLDivElement;
  const checkbox = document.createElement("input") as HTMLInputElement;
  const label = document.createElement("label") as HTMLLabelElement;
  const trashBtn = document.createElement("button") as HTMLButtonElement;
  const trashImg = document.createElement("img") as HTMLImageElement;

  //ge varje listitem ett id
  li.id = newTodo.id;

  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("change", () => {
    newTodo.done = checkbox.checked;
    saveTodo();
  });

  label.setAttribute("for", newTodo.id);
  label.innerText = newTodo.text;

  trashBtn.classList.add("trash-btn");

  trashImg.src = "src/images/bin.png";
  trashImg.alt = "trashcan";
  trashImg.width = 20;

  trashBtn.appendChild(trashImg);

  div.appendChild(checkbox);
  div.appendChild(label);

  li.appendChild(div);
  li.appendChild(trashBtn);

  list.appendChild(li);
  console.log(li);
}

function saveTodo() {
  localStorage.setItem("TODOS", JSON.stringify(todoList));
}

function loadTodo(): Todo[] {
  const storedTodos = localStorage.getItem("TODOS");

  if (!storedTodos) {
    return [];
  } else {
    return JSON.parse(storedTodos) as Todo[];
  }
}
