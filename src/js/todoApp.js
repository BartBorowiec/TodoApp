import Sortable from 'sortablejs';

class TodoApp {
    constructor() {
        const el = document.getElementById('todoAppList');
        const sortable = Sortable.create(el, {
            onEnd: this.handleDragEnd.bind(this)
        });
        document.querySelector("#todoAppButton").addEventListener("click", this.handleAdd.bind(this));
        document.querySelector("#todoAppList").addEventListener("click", this.handleRemove.bind(this));
        this.showTodos();
    }
    saveTodos(tasks) {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        this.showTodos();
    }
    loadTodos() {
        return JSON.parse(window.localStorage.getItem("tasks")) || [];
    }
    showTodos() {
        document.querySelector("#todoAppList").innerHTML = "";
        const tasks = this.loadTodos();
        tasks.forEach((value) => {
            document.querySelector("#todoAppList").innerHTML += `
                <li class="todo-list__item">
                    <span>${value}</span>
                    <i class="fa fa-trash delete"></i>
                </li>
            `
        })
    }
    handleAdd(event) {
        event.preventDefault();
        document.querySelector(".error").innerText = "";
        const input = document.querySelector("#todoAppInput");
        const newTask = input.value.trim();
        const tasks = this.loadTodos();
        input.value = "";
        if (newTask === "") {
            document.querySelector(".error").innerText = "Wprowadź zadanie";
        } else if (tasks.indexOf(newTask)!== -1) {
            document.querySelector(".error").innerText = "Zadanie już istnieje";
            return;
        } else {
            tasks.push(newTask);
            this.saveTodos(tasks);
        }
    }
    handleRemove(event) {
        event.preventDefault();
        if (Array.from(event.target.classList).indexOf("delete") === -1) return;
        const listElements = Array.from(document.querySelectorAll(".todo-list__item"));

        const elementIndex = listElements.indexOf(event.target.parentElement);
        const tasks = this.loadTodos();
        tasks.splice(elementIndex, 1);
        this.saveTodos(tasks);
    }
    handleDragEnd() {
        const listElements = Array.from(document.querySelectorAll(".todo-list__item"));
        const newArray = listElements.map(value => {
            return value.innerText;
        });
        this.saveTodos(newArray);
    }
}

export default TodoApp;
