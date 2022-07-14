"use strict";

const tasksBoardEl = document.querySelector(".tasksBoard");
const buttonEl = document.querySelector(".btn");
const input = document.querySelector(".userinput");
const clearEl = document.getElementById("clear");
const ulEl = document.querySelector(".ul");
const bodyEl = document.querySelector(".body");
const overlayEl = document.querySelector(".overlay");
let key = 1;

//START function
function start() {
  tasksBoardEl.classList.add("hidden");
  document.querySelector("ul").innerHTML = "";
  key = 1;
}

//CLOSE MODAL(m) AND OVERLAY(o) function
function closeModal(m, o) {
  m.classList.add("hidden");
  o.classList.add("hidden");
}

//EDIT TASK function
function editTask(key, li) {
  overlayEl.classList.remove("hidden");
  let modalEl = document.querySelectorAll(".modal");
  for (let i = 0; i < modalEl.length; i++) {
    if (modalEl[i].getAttribute("key") === key) {
      modalEl[i].classList.remove("hidden");
      let inputModal = modalEl[i].querySelector(".input-modal");
      let content = li.firstElementChild.firstElementChild.nextElementSibling;
      inputModal.value = content.textContent;

      //Evento en el modal window (click "X" and click "Save")
      modalEl[i].addEventListener("click", function (e) {
        if (e.target.classList == "close-modal") {
          closeModal(modalEl[i], overlayEl);
        } else if (e.target.classList == "save-modal") {
          content.textContent = inputModal.value;
          closeModal(modalEl[i], overlayEl);
        }
      });

      //Evento en el modal window (pulsar enter --> save)
      modalEl[i].addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          content.textContent = inputModal.value;
          closeModal(modalEl[i], overlayEl);
        }
      });

      //Evento en el modal window (click fuera del modal window --> cerrar )
      overlayEl.addEventListener("click", function () {
        closeModal(modalEl[i], overlayEl);
      });
    }
  }
}

//ADD task function
function addTask(task) {
  tasksBoardEl.classList.remove("hidden");

  //Create each task
  let li = document.createElement("li");
  li.setAttribute("key", key);
  li.innerHTML = `
    <div class="task-box">
      <img src="DeleteButton.png" class="delete" />
      <label id="content">${task}</label>
      <img src="EditButton.png" class="edit" />
      <img src="BurgerButton.png" class="burger" />
    </div>
    <div class="priority-menu">
      <p class="priority-text">Priority level</p>
      <div class= "priority-options">
        <a id="none">None</a>
        <a id="low">Low</a>
        <a id="medium">Medium</a>
        <a id="high">High</a>
      </div>
    </div>`;
  ulEl.appendChild(li);
  input.value = null; //null = any object value

  //Create each modal edit window
  let divModal = document.createElement("div");
  divModal.setAttribute("key", key++);
  divModal.classList.add("modal");
  divModal.classList.add("hidden");
  divModal.innerHTML = ` 
    <button class="close-modal">&times;</button>
    <h1 class="title-modal">Edit Task</h1>
    <form class="form-modal"action="index.html" method="post">
      <input class="input-modal" type="text" />
      <button class="save-modal" type="button">Save</button>
    </form>`;
  bodyEl.insertBefore(divModal, overlayEl);
  //bodyEl.appendChild(divModal);
  //Podríamos utilizar bodyEl.appendChild(divModal); pero sino se nos crea debajo de la etiqueta script (ya que le estamos diciendo que divModal sea hijo de bodyEl, pero el último hijo de bodyEl es script, por lo que se nos crea justo debajo)
}

//Calling starting conditions
start();

//ADD Button Event
buttonEl.addEventListener("click", function () {
  if (input.value !== "") addTask(input.value);
});

//ENTER Event
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); //prevent from submitting and log an error
    if (input.value !== "") addTask(input.value);
  }
});

//Clear button Event
clearEl.addEventListener("click", function () {
  let modalList = document.querySelectorAll(".modal");
  for (let i = 0; i < modalList.length; i++) {
    modalList[i].remove();
  }
  start();
});

//X button, task strikethrough and burger button event
ulEl.addEventListener("click", function (e) {
  //El evento ocurre dentro de todo el <ul></ul>. e.target es el elemento en el cual se lanzó el evento (en el cual se clickó). Por ejemplo: Si clickamos la X (que es una img), e.target = <img src="DeleteButton.png" class="delete" />. Si por ejemplo clickamos la task (que es un label), e.target = <label class="content">task</label> Demostración:
  //console.log(e.target);

  //BORRAR TASK: Si dicho e.target tiene una clase llamada delete, entonces:
  if (e.target.classList == "delete") {
    //e.target = <img src="DeleteButton.png" class="delete" />. Seleccionamos al padre de esa img (que es un div) con parentNode: e.target.parentNode = <div><img...<label...<img...></div>. Y finalmente seleccionamos al padre de ese div usando parentNode: e.target.parentNode.parentNode = <li>...</li>
    //Los guardamos en variables para que sea más facil de leer.
    let div = e.target.parentNode;
    let li = div.parentNode;

    //Al igual que en la funcion addTask usamos ul.appendChild(li) para ir agrupando los li dentro del ul, ahora tenemos que hacer lo contrario (eliminar la task) con removeChild. Tenemos que hacer ul.removeChild(li)
    ulEl.removeChild(li);

    //Eliminando el correspondiente div modal de ese li (de esa task)
    let modalEl = document.querySelectorAll(".modal");
    for (let i = 0; i < modalEl.length; i++) {
      if (modalEl[i].getAttribute("key") === li.getAttribute("key")) {
        modalEl[i].remove();
      }
    }

    //TACHAR o QUITAR TACHADO: Si e.target tiene un ID llamado content, entonces:
  } else if (e.target.id == "content") {
    e.target.classList.toggle("strike");

    //PRIORITY MENU: Si e.target tiene una clase llamada burger, entonces:
  } else if (e.target.classList == "burger") {
    let priorityMenu = e.target.parentNode.parentNode.lastChild; //seleccionamos la caja que contiene el menú de prioridades: priorityMenu = <div class="priority-menu">....</div>

    //Si el elemento contiene la clase show-priorityMenu, borrala
    if (priorityMenu.classList.contains("show-priorityMenu")) {
      priorityMenu.classList.remove("show-priorityMenu");

      //Si no contiene show-priorityMenu, borra todos los show-priorityMenus de el resto de elementos y lo añade al actual.
    } else {
      let showedList = document.querySelectorAll(".show-priorityMenu");
      for (let i = 0; i < showedList.length; i++) {
        showedList[i].classList.remove("show-priorityMenu");
      }
      priorityMenu.classList.add("show-priorityMenu");
    }

    //PRIORITY BORDERS
  } else if (e.target.id == "low") {
    let li = e.target.parentNode.parentNode.parentNode;
    li.style.boxShadow = "-5px 0px 0px 0px green";
  } else if (e.target.id == "medium") {
    let li = e.target.parentNode.parentNode.parentNode;
    li.style.boxShadow = "-5px 0px 0px 0px orange";
  } else if (e.target.id == "high") {
    let li = e.target.parentNode.parentNode.parentNode;
    li.style.boxShadow = "-5px 0px 0px 0px red";
  } else if (e.target.id == "none") {
    let li = e.target.parentNode.parentNode.parentNode;
    li.style.boxShadow = "none";

    //EDIT MODAL WINDOW
  } else if (e.target.classList == "edit") {
    let li = e.target.parentNode.parentNode;
    editTask(li.getAttribute("key"), li);
  }
});

//Exit event. When user click on body, show-priorityMenus disappear
bodyEl.addEventListener("click", function (e) {
  if (e.target.classList == "body") {
    let showedList = document.querySelectorAll(".show-priorityMenu");
    for (let i = 0; i < showedList.length; i++) {
      showedList[i].classList.remove("show-priorityMenu");
    }
  }
});
