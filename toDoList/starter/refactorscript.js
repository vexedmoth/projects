"use strict";

const tasksBoardEl = document.querySelector(".tasksBoard");
const buttonEl = document.querySelector(".btn");
const input = document.querySelector(".userinput");
const clearEl = document.getElementById("clear");
const deleteEl = document.getElementsByClassName("delete");
const ulEl = document.querySelector(".ul");
const burgerEl = document.querySelector(".burger");
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
          //e.preventDefault(); //prevent from submitting and log an error
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
  let liID = e.target.parentNode.parentNode.parentNode;
  let liClass = e.target.parentNode.parentNode;
  let priorityMenu = e.target.parentNode.parentNode.lastChild;

  switch (e.target.id) {
    //PRIORITY BORDERS
    case "low":
      liID.style.boxShadow = "-5px 0px 0px 0px green";
      break;
    case "medium":
      liID.style.boxShadow = "-5px 0px 0px 0px orange";
      break;
    case "high":
      liID.style.boxShadow = "-5px 0px 0px 0px red";
      break;
    case "none":
      liID.style.boxShadow = "none";
      break;

    //TACHAR o QUITAR TACHADO: Si e.target tiene un ID llamado content, entonces:
    case "content":
      e.target.classList.toggle("strike");
      break;
  }

  switch (e.target.classList) {
    case "delete":
      ulEl.removeChild(liClass);
      let modalEl = document.querySelectorAll(".modal");
      for (let i = 0; i < modalEl.length; i++) {
        if (modalEl[i].getAttribute("key") === li.getAttribute("key")) {
          modalEl[i].remove();
        }
      }
      break;
    case "burger":
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
      break;
    case "edit":
      editTask(liClass.getAttribute("key"), liClass);
      break;
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
