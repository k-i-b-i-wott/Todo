document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const todoList = document.querySelector("ul");
    const itemsLeft = document.getElementById("items-left");
    const clearCompleted = document.getElementById("clear-completed");
    const filterButtons = document.querySelectorAll(".filter-button");

    let todos = [
        { text: "Sample Task 1", completed: false },
        { text: "Sample Task 2", completed: false }
    ];

    const renderTodos = (filter = "all") => {
        todoList.innerHTML = "";
        const filteredTodos = todos.filter(todo => {
            if (filter === "active") return !todo.completed;
            if (filter === "completed") return todo.completed;
            return true;
        });
        filteredTodos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.className = "todo-item";
            li.dataset.originalIndex = todos.indexOf(todo); 
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
                <span class="todo-text ${todo.completed ? "completed" : ""}">${todo.text}</span>
                <button class="delete-button">Delete</button>
            `;
            todoList.appendChild(li);
        });
        itemsLeft.textContent = `${todos.filter(todo => !todo.completed).length} items left`;
    };

    const addTodo = (text) => {
        todos.push({ text, completed: false });
        renderTodos();
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    };

    const toggleTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    };

    const clearCompletedTodos = () => {
        todos = todos.filter(todo => !todo.completed);
        renderTodos();
    };

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            renderTodos(button.dataset.filter);
        });
    });

    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && todoInput.value.trim()) {
            e.preventDefault();
            addTodo(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (todoInput.value.trim()) {
            addTodo(todoInput.value.trim());
            todoInput.value = "";
        }
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const originalIndex = parseInt(e.target.parentElement.dataset.originalIndex);
            deleteTodo(originalIndex);
        }
    });

    todoList.addEventListener("change", (e) => {
        if (e.target.classList.contains("todo-checkbox")) {
            const originalIndex = parseInt(e.target.parentElement.dataset.originalIndex);
            toggleTodo(originalIndex);
        }
    });

    clearCompleted.addEventListener("click", clearCompletedTodos);

    renderTodos();

});
        
        
