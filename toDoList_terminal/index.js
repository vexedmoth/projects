const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let taskList = [];

function addTask(taskDescription) {
  taskList.push({ done: false, description: taskDescription });
}

function printTaskList(taskList) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].done) {
      console.log(`${i + 1}.[x] ${taskList[i].description}`);
    } else {
      console.log(`${i + 1}.[ ] ${taskList[i].description}`);
    }
  }
}

function markAsDone(number) {
  if (number >= 0 && number <= taskList.length) {
    if (taskList[number].done === false) {
      taskList[number].done = true;
    } else {
      taskList[number].done = false;
    }
  } else {
    console.log("Numero de tarea inválida. Teclea un número de tarea posible");
  }
}

function checkAllDone(taskList) {
  for (let i = 0; i < taskList.length; i++) {
    if (!taskList[i].done) return false; //si hay alguna tarea sin realizar, devuelve false
  }
  return true; // en caso de que el bucle no encuentre ninguna tarea sin realizar, significará que están todas realizadas y por lo tanto, devolverá true.
}

//Primer modo: lectura de tareas necesarias
function mode1(taskList) {
  rl.question("Introduce una tarea (fin si terminas): ", function (taskDesc) {
    switch (taskDesc) {
      case "fin": //En este caso el usuario quiere marcar las tareas realizadas
        console.log("No se introducen más tareas");
        mode2(taskList);
        break;

      case "exit": //En este caso el usuario quiere salir del programa
        rl.close();
        break;

      default:
        //Default: en caso de que sea cualquier otra cosa que exit o fin.
        addTask(taskDesc);
        printTaskList(taskList);
        mode1(taskList); //Recursividad. Una vez que añadimos una tarea, se vuelve a imprimir por pantalla si queremos añadir otra.
    }
  });
}

//Segundo modo: marcar las tareas realizadas
function mode2(taskList) {
  printTaskList(taskList); //le enseñamos al usuario la lista de tareas que tiene actualmente
  rl.question("Qué tarea has realizado? (1 - N) ", function (taskNumber) {
    switch (taskNumber) {
      case "fin":
      case "exit": //Tanto escribiendo fin como exit el programa se cierra
        console.log("Bye Bye");
        rl.close();
        break;

      default:
        markAsDone(taskNumber - 1); // -1 porque vamos a comprobar un array. Si por ejemplo tecleamos 2, nos marcará la tercera opción, entonces se soluciona restandole 1 para que se marque la segunda.
        if (checkAllDone(taskList)) {
          printTaskList(taskList);
          console.log("Has completado todas las tareas!!");
          rl.close();
        } else {
          mode2(taskList);
        }
    }
  });
}

mode1(taskList); //Llamamos a al mode 1 para que arranque el programa al ejecutar el script
