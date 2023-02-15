function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  function generateID() {
    const id = new Date().getTime();
  
    return id;
  }

  let token = document.querySelector("token")
  
  const data = getLocalStorage("todo") || [];
  const confirmDeleteValue = false;
  
  const textTodo = document.getElementById("text-todo");
  const deleteButton = document.getElementById("delete-button");
  const feedBackToastEl = document.getElementById("feedback-toast");
  const listTodo = document.getElementById("list-todo");
  
  const createTodoModal = new bootstrap.Modal("#create-todo-modal");
  const deleteTodoModal = new bootstrap.Modal("#delete-todo-modal");
  const feedBackToast = new bootstrap.Toast(feedBackToastEl);

  function validaToken () {
    if(token !== '78374'){
        window.location.href="./index"
    }
}  
  
  function showFeedback(success, msg) {
    feedBackToastEl.children[0].children[0].innerHTML = msg;
  
    if (success) {
      feedBackToastEl.classList.remove("text-bg-danger");
      feedBackToastEl.classList.add("text-bg-success");
    } else {
      feedBackToastEl.classList.remove("text-bg-success");
      feedBackToastEl.classList.add("text-bg-danger");
    }
  
    feedBackToast.show();
  }
  
  function checkTodo(element) {
    const id = element.getAttribute("data-id");
  
    const filtered = data.find((item) => {
      return item.id === Number(id);
    });
  
    filtered.done = !filtered.done;
  
    if (filtered.done) {
      element.innerHTML = `<i class="bi bi-clipboard2-check fs-3"></i>`;
    } else {
      element.innerHTML = `<i class="bi bi-clipboard2 fs-3"></i>`;
    }
  }
  
  function deleteTodo(element) {
    const id = element.getAttribute("data-id");
    deleteButton.setAttribute("data-id", id);
    deleteTodoModal.show();
  }
  
  function confirmDelete(element) {
    console.log(element);
    const id = element.getAttribute("data-id");
    const index = data.findIndex((item) => item.id === id);
  
    deleteTodoModal.hide();
    document.getElementById(id).remove();
    data.splice(index, 1);
  
    saveLocalStorage("todo", data);
  }
  
  function addTodo(todo) {
    listTodo.innerHTML += `
      <li id="${
        todo.id
      }" class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo.note}</span>
        <div>
          <button
            data-id="${todo.id}"
            onclick="checkTodo(this)"
            class="btn"
          >
          <i class="bi bi-clipboard2${todo.done ? "-check" : ""} fs-3"></i>
          </button>
          <button
            data-id="${todo.id}"
            onclick="deleteTodo(this)"
            class="btn"
          >
            <i class="bi bi-trash3 fs-3 icon-delete"></i>
          </button>
        </div>
      </li>
    `;
  }
  
  function createTodo() {
    const value = textTodo.value;
    const id = generateID();
    const todo = { note: value, done: false, id: id };
  
    let success = true;
    let msg = "";
  
    if (value.length > 3) {
      data.push(todo);
      addTodo(todo);
      textTodo.value = "";
  
      createTodoModal.hide();
      msg = "Tarefa criada com sucesso!";
    } else {
      success = false;
      msg = "Ops! A descrição precisa ter mais de 3 caracteres.";
    }
  
    saveLocalStorage("todo", data);
    showFeedback(success, msg);
  }
  
  function renderFirst() {
    console.log("Executou render first.");
    data.forEach((item) => {
      addTodo(item);
    });
  }
  
  renderFirst();