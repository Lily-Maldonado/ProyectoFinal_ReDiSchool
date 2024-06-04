document.addEventListener("DOMContentLoaded", () => {
  const homeTodoForm = document.getElementById("home-todo-form");
  const homeTodoInput = document.getElementById("home-todo-input");
  const homeTodoList = document.getElementById("home-todo-list");

  const workTodoForm = document.getElementById("work-todo-form");
  const workTodoInput = document.getElementById("work-todo-input");
  const workTodoList = document.getElementById("work-todo-list");

  homeTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(homeTodoInput, homeTodoList);
  });

  workTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(workTodoInput, workTodoList);
  });

  function addTodo(inputElement, listElement) {
    const todoText = inputElement.value.trim();
    if (todoText !== "") {
      const li = document.createElement("li");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          li.classList.add("completed");
        } else {
          li.classList.remove("completed");
        }
      });

      const textSpan = document.createElement("span");
      textSpan.textContent = todoText;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener("click", function () {
        listElement.removeChild(li);
      });

      li.appendChild(checkbox);
      li.appendChild(textSpan);
      li.appendChild(deleteButton);
      listElement.appendChild(li);
      inputElement.value = "";
    }
  }

  const backHomeButton = document.getElementById("back-home-button");
  backHomeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
