import { v4 as uuidv4 } from "uuid";

type Todo = {
    id: string;
    text: string;
    done: boolean;
};

const list = document.getElementById("todo-list-container") as HTMLUListElement;
const form = document.getElementById("input-container") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const clearBtn = document.getElementById("clear") as HTMLButtonElement;

let todoList: Todo[] = loadTodo();
let dragItem: HTMLLIElement | null = null;
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

clearBtn.addEventListener("click", () => {
    // rensar local storage
    localStorage.clear();

    // tar bort alla listelement från ul listan
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // sätter TodoList till en tom array
    todoList = [];

    // Sparar den tomma listan till local storage
    saveTodo();
});

//funktion som lägger till alla listelement i ul listan.
function addTodoItem(todo: Todo) {
    //skapa HTML element som behövs
    const li = document.createElement("li") as HTMLLIElement;
    // Lägg till attribut för att göra listelementen dragbara
    li.draggable = true;

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
    label.contentEditable = "true";
    label.addEventListener("input", () => {
        todo.text = label.innerText;
        saveTodo();
    });
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

    // Lägg till eventlyssnare för drag-and-drop
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);
    li.addEventListener("dragend", dragEnd);
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

// DRAG AND DROP EXTRA FUNKTION//

// Funktionen som körs när drag-and-drop-operationen startar
function dragStart(e: DragEvent) {
    // Spara referensen till det listelement som dras
    dragItem = e.target as HTMLLIElement;
    // Sätt datan för drag-and-drop-operationen
    e.dataTransfer?.setData("text/plain", dragItem.id);
}

// Funktionen som körs när musen dras över ett element under drag-and-drop-operationen
function dragOver(e: DragEvent) {
    e.preventDefault(); // Förhindra standardbeteendet för elementet som dras över
}

// Funktionen som körs när det släppta elementet placeras över ett annat element
function drop(e: DragEvent) {
    e.preventDefault();
    const dropTarget = e.target as HTMLLIElement;
    if (dragItem && dropTarget && dragItem !== dropTarget) {
        // Hämta föräldern till listelementen
        const parent = dropTarget.parentNode as Node;
        // Hämta index för det drag- och drop-elementet
        const indexDrag = Array.from(parent.childNodes).indexOf(dragItem);
        const indexDrop = Array.from(parent.childNodes).indexOf(dropTarget);
        // Flytta det dragade elementet till rätt position baserat på muspekarens position
        parent.insertBefore(
            dragItem,
            indexDrag > indexDrop ? dropTarget : dropTarget.nextSibling
        );

        // Uppdatera ordningen i todoList-arrayen
        const todoIndexDrag = todoList.findIndex(
            (todo) => todo.id === dragItem!.id
        );
        const todoIndexDrop = todoList.findIndex(
            (todo) => todo.id === dropTarget!.id
        );
        const [movedItem] = todoList.splice(todoIndexDrag, 1);
        todoList.splice(todoIndexDrop, 0, movedItem);

        saveTodo(); // Spara den uppdaterade listan till local storage
    }
}

// Funktionen som körs när drag-and-drop-operationen avslutas
function dragEnd() {
    dragItem = null; // Återställ referensen till det dragade elementet
}
