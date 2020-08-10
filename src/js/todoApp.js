class TodoApp {
    constructor() {
        this.tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
        document.querySelector("#todoAppButton").addEventListener("click", this.handleClick.bind(this));
        document.querySelector("#todoAppList").addEventListener("click", this.handleRemove.bind(this));
        if (this.tasks.length > 0) this.showTodos();
    }
    // save todos to localStorage
    saveTodos() {
        window.localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }
    // load todos from localStorage
    loadTodos() {
        return JSON.parse(window.localStorage.getItem("tasks"));
    }
    // show todos on page
    showTodos() {
        document.querySelector("#todoAppList").innerHTML = "";
        this.tasks = this.loadTodos();
        this.tasks.forEach((value, index, tasks, self) => {
            document.querySelector("#todoAppList").innerHTML += `
                <li class="todo-list__item">
                    <span>${value}</span>
                    <i class="fa fa-trash delete"></i>
                </li>
            `
        })
    }
    // handle button click
    handleClick(event) {
        event.preventDefault();
        document.querySelector(".error").innerText = "";
        const input = document.querySelector("#todoAppInput");
        const newTask = input.value.trim();
        input.value = "";
        if (newTask !== "") {
            this.tasks.push(newTask);
            this.saveTodos();
            this.showTodos();
        } else {
            document.querySelector(".error").innerText = "Wprowadź zadanie";
        } 
    }
    // handle remove
    handleRemove(event) {
        event.preventDefault();
        if (Array.from(event.target.classList).indexOf("delete") === -1) return;
        const listElements = Array.from(document.querySelectorAll(".todo-list__item"));

        const elementIndex = listElements.indexOf(event.target.parentElement);
        this.tasks.splice(elementIndex, 1);
        this.saveTodos();
        this.showTodos();
    }
}

export default TodoApp;
