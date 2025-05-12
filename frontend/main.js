// ------------- DOM ELEMENTS -------------//
const burguerBtn = document.getElementById("burguer__nav");
const menuContent = document.getElementById("functions__burguer__container");

const blurSect = document.getElementById("blur__section");
const xBlurBtn = document.getElementById("blur__section--X");
const blurContentContainer = document.getElementById(
  "blur__content__container"
);
const blurContentsForms = blurContentContainer.firstElementChild.children;
const daysTask = document.getElementById("days__task");

const loader = document.getElementById("loader__cont");

const addGroupBtn = document.getElementById("add__group__btn");
const menuButtonsArray = document.querySelectorAll(".menu__buttons");
const groupsContainer = document.getElementById("task__group__container");
const addGroupInner = document.getElementById("add__group__inner");

const addTaskBtn = document.getElementById("add__task__btn");
const addTaskInner = document.getElementById("add__task__inner");
const selectTaskGroup = document.getElementById("select__groups__task");

const getForPriorityBtn = document.getElementById("get__for__priority__btn");
const prioritySelect = document.getElementById("priority-select");
const priorityResultContainer = document.getElementById(
  "get__for__priority__result__container"
);

const callendarYear = document.getElementById("year__container");
const callendarmonth = document.getElementById("month__container");
const callendarWeeks = document.getElementById("days__week__container");
const callendarDays = document.getElementById("days__container");
const allCallendarCell = document.querySelectorAll(".days__cell");

const monthLeftArrow = document.getElementById("month__back__arrow");
const monthRightArrow = document.getElementById("month__next__arrow");

const changeLoginBtn = document.getElementById('login__change__btn');
const loginSection = document.getElementById('login__form__cont');
const singInSection = document.getElementById('sign__in__cont');
const loginButonsSect = document.getElementById('login__buttons__cont');
const loginBtn = document.getElementById('login__btn');
const singInBtn = document.getElementById('sing__in__btn');
const singInForm = document.getElementById('sing__in__form');
const loginForm = document.getElementById('login__form__cont');
const loginCont = document.getElementById('login__cont');
const logoutBtn = document.getElementById('logout__btn');

const footerCont = document.getElementById("footer");
const footerInner = document.getElementById("news__inner");
const TodayWeather = document.getElementById("weather__container");
const newsContainer = document.getElementById("news__container");

const todayGlobal = moment();

// ------------- END DOM ELEMENTS -------------//

const requestsURL = "http://localhost:3000/api/"; 

// ------------- IMPORT -------------//
//import from task-function
import * as taskFuntions from "./assets/js/task-functions.js";
// ------------- END IMPORT -------------//

let globalData ;

// ------------- DATES / CALLENDAR -------------//
let today = moment().format("YYYY-MM-DD");
taskFuntions.createCallendar(
  todayGlobal,
  today,
  callendarYear,
  callendarmonth,
  callendarWeeks,
  callendarDays
);

//poniendo las tareas en el calendario
const callendarToday = document.getElementById("today-day");

//poniendo los climas en el calendario
taskFuntions.getWeather(
  TodayWeather,
  callendarToday,
  todayGlobal,
  callendarmonth
);
taskFuntions.getNews(footerInner);

// ------------- END DATES / CALLENDAR -------------//

// ------------- EVENT LISTENERS ------------//
document.addEventListener("DOMContentLoaded", () => {

  loadTasks();

  setTimeout(() => {
    loader.classList.add("hide");
  }, 2800);
});

burguerBtn.addEventListener("click", () => {
  menuContent.classList.toggle("functions__burguer__hiden");
});
xBlurBtn.addEventListener("click", () => {
  blurSect.classList.add("hide");

  taskFuntions.hideForms(blurContentsForms, daysTask);
});
addGroupBtn.addEventListener("click", (e) => {
  const input = document.getElementById("add__group__input");

  if (validateInput(input.value, addGroupInner, e.target)) {

    //taskGroups = JSON.parse(localStorage.getItem("task-groups"));
    if (taskFuntions.isRepeatedGroup2(input.value, globalData)) {

      //creo el grupo y oculto el blur
      taskFuntions.createGroup(input.value, groupsContainer);

      //actualizar los grupos en el select
      taskFuntions.createGroupForTask(input.value, selectTaskGroup);

      blurSect.classList.add("hide");
      menuContent.classList.toggle("functions__burguer__hiden");

      const newGroup = {
        nameGroup: input.value,
        taskGroup : []
      }

      createGroup(newGroup);

      input.value = "";
      taskFuntions.hideForms(blurContentsForms, daysTask);
    } else {
      taskFuntions.generateText("h4","Ya existe un grupo con ese nombre",addGroupInner, e.target);
    }
  }
  validateTaskGroupContent();
});
//que cuando se cree un grupo aqui, se suba al array task
addTaskBtn.addEventListener("click", (e) => {
  const input = document.getElementById("add__task__input");
  const dateTaskInput = document.getElementById("date__task__input");

  //validando que no este vacio el input (name)
  if (validateInput(input.value, addTaskInner, e.target)) {
    //validando que no este vacio el date
    if (validateInput(dateTaskInput.value, addTaskInner, e.target)) {
      //validar que no sea menor al dia de hoy
      if (moment(dateTaskInput.value).format("YYYY-MM-DD") > moment(todayGlobal).format("YYYY-MM-DD")) {
        //validar que no sea mayor a 50 años
        const years50 = moment(todayGlobal);
        years50.add(50, "years");
        if (!(moment(dateTaskInput.value).format("YYYY") > years50.format("YYYY"))) {
          //validar el option{
          if (selectTaskGroup.value !== "default") {
            
            if (selectTaskGroup.value === "create__group") {

              console.log('selecciono crear grupo');
              //ya hay un grupo con ese nombre ?
              console.log(globalData, 'trabajando aqui');

              //el ya existe un grupo con ese nomrbre? 
              globalData.forEach(group => console.log('nombre de los grupos', group.nameGroup));

                
              const newGroupFromTaskCont = document.getElementById("new__group__from__task__container");
              newGroupFromTaskCont.classList.remove("hide");

              
              if (newGroupFromTaskCont.getElementsByTagName("input")[0].value !=="") {
                //taskGroups = JSON.parse(localStorage.getItem("task-groups"));
                if (taskFuntions.isRepeatedGroup2(newGroupFromTaskCont.getElementsByTagName("input")[0].value,taskGroups)) {

                  taskFuntions.createGroupForTask(newGroupFromTaskCont.getElementsByTagName("input")[0].value,selectTaskGroup);
                  taskFuntions.createGroup(newGroupFromTaskCont.getElementsByTagName("input")[0].value,groupsContainer);

                  const newGroup ={
                    nameGroup: newGroupFromTaskCont.getElementsByTagName("input")[0].value,
                    taskGroups: [{
                      name: input.value,
                      dateTask: dateTaskInput.value,
                      priority: taskFuntions.getPriority(todayGlobal, dateTaskInput.value)
                    }]
                  }

                  createGroup(newGroup);

                  newGroupFromTaskCont.classList.add("hide");
                  newGroupFromTaskCont.getElementsByTagName("input")[0].value ="";
                } else {
                  taskFuntions.generateText("h4","Ya existe un grupo con ese nombre",addTaskInner, e.target);
                }
              } else {
                taskFuntions.generateText("h4","escribe aqui el nombre del grupo",addTaskInner, e.target);
              }
              validateTaskGroupContent();
            } else {

              if(!taskFuntions.isRepeatedTask2(input.value, selectTaskGroup.value, globalData)){
                const newGroupFromTaskCont = document.getElementById("new__group__from__task__container");
                newGroupFromTaskCont.classList.add("hide");

                taskFuntions.hideForms(blurContentsForms, daysTask);
                blurSect.classList.add("hide");
                menuContent.classList.toggle("functions__burguer__hiden");

                const grupo = globalData.find(grupo => grupo.nameGroup === selectTaskGroup.value);
                
                const oldsTasks = grupo.taskGroup;

                const newTask = {
                  taskGroup : [...oldsTasks, {
                    name: input.value,
                    dateTask : moment(dateTaskInput.value),
                    priority : taskFuntions.getPriority(todayGlobal, dateTaskInput.value)
                  }]
                }

                createTasks(grupo._id, newTask);

                input.value = "";
                dateTaskInput.value = "";
                selectTaskGroup.value = "Default";
              }else{
                taskFuntions.generateText("h4","Ya existe una tarea con ese nombre",addTaskInner, e.target);
              }
  
              /*
                    if (taskFuntions.isRepeatedTask(input.value,tasksArray,taskGroups,selectTaskGroup.value)) {
                      
                      //creamos la tarea
                      /*
                      taskFuntions.createTask(todayGlobal,/*callendarToday*//*taskGroups,tasksArray,groupsContainer,selectTaskGroup.value,dateTaskInput.value,input.value);

                      
                    }*/
            }
          } else {
            taskFuntions.generateText("h4", "Selecciona un grupo",addTaskInner, e.target);
          }

          //esto es para ocultar el div del input para nuevo grupo desde create task
          const newGroupFromTaskCont = document.getElementById(
            "new__group__from__task__container"
          );
          //newGroupFromTaskCont.classList.add('hide');
        } else {
          taskFuntions.generateText("h4","no se permite fecha con mas de 50 años",addTaskInner, e.target);
        }
      } else {
        taskFuntions.generateText("h4","la fecha tiene que ser futura",addTaskInner, e.target);
      }
    }
  }
  //setTaskTrashEvent();
  validateTaskGroupContent();
});
getForPriorityBtn.addEventListener("click", (e) => {
  taskFuntions.getForPriority(todayGlobal,globalData,prioritySelect,priorityResultContainer);
});
// for menu buttons
menuButtonsArray.forEach((el) =>
  el.children[1].addEventListener("click", (e) => {
    if (e.target.textContent === "Añadir grupo") {
      blurSect.classList.remove("hide");
      taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);
    } else if (e.target.textContent === "Añadir tarea") {
      //console.log('clicado en ', e.target.textContent);

      blurSect.classList.remove("hide");
      taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);
    } else if (e.target.textContent === "Search task") {
      console.log("clicado en ", e.target.textContent);
    } else if (e.target.textContent === "Obtener por prioridad") {
      console.log("clicado en ", e.target.textContent);

      blurSect.classList.remove("hide");
      taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);
    }
  })
);
//for callendars
monthLeftArrow.addEventListener("click", () => {
  let previousMonth = moment(today);
  previousMonth.subtract(1, "month");
  today = moment(previousMonth);

  taskFuntions.clearCalendar(callendarDays);
  taskFuntions.createCallendar(
    todayGlobal,
    previousMonth,
    callendarYear,
    callendarmonth,
    callendarWeeks,
    callendarDays
  );/*
  taskFuntions.setTaskOnCallendar(
    tasksArray,
    taskGroups,
    todayGlobal,
    callendarToday
  );*/

  taskFuntions.setTaskOnCallendar2(globalData, todayGlobal, callendarToday);

  taskFuntions.getWeather(
    TodayWeather,
    callendarToday,
    todayGlobal,
    callendarmonth
  );
});
monthRightArrow.addEventListener("click", () => {
  let previousMonth = moment(today);
  previousMonth.add(1, "month");

  today = moment(previousMonth);

  taskFuntions.clearCalendar(callendarDays);
  taskFuntions.createCallendar(
    todayGlobal,
    previousMonth,
    callendarYear,
    callendarmonth,
    callendarWeeks,
    callendarDays
  );
  taskFuntions.setTaskOnCallendar2(globalData, todayGlobal, callendarToday);

  taskFuntions.getWeather(
    TodayWeather,
    callendarToday,
    todayGlobal,
    callendarmonth
  );
});
//for every calendar cell
allCallendarCell.forEach((el) =>
  el.addEventListener("click", (e) => {
    if (e.target.getAttribute("data-date")) {
      //muestro la seccion blanca sobre todo
      blurSect.classList.remove("hide");
      daysTask.children[1].classList.add("hide");
      taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);

      taskFuntions.getDaysTask(e.target, daysTask);
      //puedo hacer es setear unos datos en cada celda, que si hay tarea guardo el indice de la tarea
      //no , guardar un atributo, que sea nombregrupo-nombretarea, y que luego la pueda usar para encontrarla
    } else {
      console.log("vacio celda");
    }
  })
);

newsContainer.addEventListener("click", () => {
  footerCont.classList.toggle("news__open-footer");
  footerCont.children[0].classList.toggle("today__weater__open");
  newsContainer.classList.toggle("news__open");
  footerInner.classList.toggle("hide");
});

//for logins
changeLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.classList.toggle('login__sects--active');
    singInSection.classList.toggle('login__sects--active');

    const active = document.querySelector('.login__sects--active');
    
    if(active.id.startsWith('sig')){
      loginButonsSect.children[0].textContent = 'Ya tienes una cuenta?';
      loginButonsSect.children[1].children[0].value = 'Inicia sesion aqui';
    }else{
      loginButonsSect.children[0].textContent = 'No tienes una cuenta?';
      loginButonsSect.children[1].children[0].value = 'Registrate';
    }

});
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const loginInputs = loginForm.querySelectorAll('input');

  let empty = 0;
  
  loginInputs.forEach( el => {
    if(el.value===''){
      empty++
    }
  });

  if(empty>0){
    taskFuntions.generateText("h4","No deben haber campos vacios",loginSection, e.target);
  }else{
    const newUser = {
      email: loginInputs[0].value,
      password: loginInputs[1].value,
    }
    login(newUser, e);
  }
  const rol = localStorage.getItem('token');
  verifyRol(rol)
  loginInputs[0].value='';
  loginInputs[1].value='';
});
singInBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const formInputs = singInForm.querySelectorAll('input');
  let empty = 0;
  console.log(formInputs);
  
  formInputs.forEach( el => {
    if(el.value===''){
      empty++
    }
  });

  console.log(empty);
  if(empty>0){
    taskFuntions.generateText("h4","No deben haber campos vacios",singInSection, e.target);
  }else{
    const newUser = {
      name: formInputs[0].value,
      secondName: formInputs[1].value,
      email: formInputs[2].value,
      password: formInputs[3].value,
    }
    createUser(newUser);
  }

    formInputs[0].value='';
    formInputs[1].value='';
    formInputs[2].value='';
    formInputs[3].value='';
})
logoutBtn.addEventListener('click', ()=>{
    console.log('cerrando sesion');

    loginCont.style.display= 'flex';
    localStorage.clear();
})
// ------------- END EVENT LISTENERS -------------//

// ------------- FUNCTIONS -------------//
function validateInput(inp, cont, btn) {

  let aux = 0;
  if (inp === "") {
    //console.log("vacio");
    aux++;
    taskFuntions.generateText("h4", "no se permite campos vacios", cont, btn);
  }
  if (inp.length > 30) {
    //console.log("no es menor que 30");
    aux++;
    taskFuntions.generateText("h4", "texto muy largo", cont, btn);
  }

  if (aux > 0) {
    //console.log("no valido");
    return false;
  } else {
    //console.log('valido');
    return true;
  }
}
function validateTaskGroupContent() {
  //para saber si se le tiene que añadir la papelera a los grupos;
  const allTaskGroups = document.querySelectorAll(".task__group");

  for (let i = 0; i < allTaskGroups.length; i++) {
    //add trash if the group ist empty
    if (allTaskGroups[i].children.length < 2) {
      allTaskGroups[i].firstChild.children[0].classList.remove("hide");

      //event for delete empty group
      allTaskGroups[i].firstChild.children[0].addEventListener("click", (e) => {

        const groupToDelete = globalData.find( group => group.nameGroup===e.target.parentElement.textContent);

        deleteGroup(groupToDelete._id);

        //quitar el elemento del select
        for (let i2 = 0; i2 < selectTaskGroup.children.length; i2++) {
          if (
            e.target.parentElement.textContent ===
            selectTaskGroup.children[i2].textContent
          ) {
            selectTaskGroup.children[i2].remove();
          }
        }

      });
    }
  }
}
function setTaskTrashEvent() {
  //Event listeners for trash task
  const allTaskTrash = document.querySelectorAll(".task");
  //console.log(allTaskTrash)
  for (let k = 0; k < allTaskTrash.length; k++) {
    allTaskTrash[k].firstChild.children[0].addEventListener("click", (e) => {

      
      const group = globalData.find(group => group.nameGroup === e.target.parentElement.parentElement.parentElement.children[0].textContent);
      const toDeleteTask = group.taskGroup.find(task => task.name === e.target.parentElement.textContent);

      const newTaskArray = group.taskGroup.filter(el => el._id!==toDeleteTask._id);
      const newTasks = {
        taskGroup : newTaskArray
      } 

      deleteTask(group._id, newTasks);

      //quitarlo del DOM
      e.target.parentElement.parentElement.remove();

    });
  }
}


const verifyRol = (rol) => {
  console.log(rol);

  const addGroups = document.getElementById('add__group');
  const addtask = document.getElementById('add__task');
  const allTrash = document.querySelectorAll('.fa-trash-can');
  if(!rol){
    addGroups.style.display='none';
    addtask.style.display='none';
    allTrash.forEach(el => el.style.display='none');
  }else{
    addGroups.style.display='flex';
    addtask.style.display='flex';
    allTrash.forEach(el => el.style.display='block');
  }
}

const loadTasks = async () => {
    try {
        const response = await fetch(`${requestsURL}tasks/`,{method:'GET'});
        const data = await response.json();

        globalData = data;

      if(data.length ===0){
        console.log('no hay datos', data);
      }else{
        data.forEach((el, i) => {
            taskFuntions.createGroup(el.nameGroup , groupsContainer);
            taskFuntions.createGroupForTask(el.nameGroup, selectTaskGroup);

            if(el.taskGroup.length===0){
              validateTaskGroupContent();
            }

            el.taskGroup.forEach(task => {
              taskFuntions.createTaskDOM(task, groupsContainer.children[i], todayGlobal);
            });
            setTaskTrashEvent();
            taskFuntions.setTaskOnCallendar2(data, todayGlobal, callendarToday);
        });

      }

    } catch (error) {
        console.log('Error pidiendo datos', error);       
        if(error.message==='Failed to fetch'){
          alert('No esta conectado a la base de datos')
        }

    }finally{
      const rol = localStorage.getItem('token'); 
      verifyRol(rol);
    }
}

//localStorage.clear()

const clearTasks = () => {
  const NowGroupsContainer = document.getElementById("task__group__container");
  const nowSelectTaskGroup = document.getElementById("select__groups__task"); 

  let childrensGroups = NowGroupsContainer.children.length; 
  let childrensSelectTaskGroup = nowSelectTaskGroup.children.length; 

  for(let i=0 ; i<callendarToday.parentElement.children.length ; i++){
    
    if(callendarToday.parentElement.children[i].getAttribute('data-date')){
      callendarToday.parentElement.children[i].classList.remove('task__Media');
      callendarToday.parentElement.children[i].classList.remove('task__Urgente');
      callendarToday.parentElement.children[i].classList.remove('task__Alta');
      callendarToday.parentElement.children[i].classList.remove('task__Baja');
    }
  }

  if(NowGroupsContainer.children.length>0 || nowSelectTaskGroup.children.length>0){
    for(let i=0 ; i<childrensGroups; i++){
      NowGroupsContainer.children[0].remove();
    }
    for(let j=2 ; j<childrensSelectTaskGroup; j++){
      nowSelectTaskGroup.children[2].remove();
    }
  }
}
const createTasks = async (id, taskData) => {
  const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${requestsURL}tasks/${id,token}`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });
        const data = await response.json();
        
    } catch (error) {
        console.log('Error subiendo datos', error);       
    }finally{
      clearTasks();
      loadTasks();
    }
}
const deleteTask = async (id , taskData) => {
  const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${requestsURL}tasks/delete/${id, token}`, {
          method: 'PUT',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
        });
        const data = await response.json();

        console.log('DATA DE peticion DELETE TASKS' ,data);
        
    } catch (error) {
        console.log('Error borrando tarea', error);       
    }finally{
      console.log('delete task finalized');
      clearTasks();
      loadTasks();
    }
}
const createGroup = async (groupData) => {
    const token = localStorage.getItem('token');  
    try {
        const response = await fetch(`${requestsURL}tasks/group/${token}`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(groupData)
        });
        const data = await response.json();
        
    } catch (error) {
        console.log('Error subiendo datos', error);       
    }finally{
      clearTasks();
      loadTasks();
    }
}
const deleteGroup = async (id) => {

    try {
        const response = await fetch(`${requestsURL}tasks/group/${id}`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        
    } catch (error) {
        console.log('Error borrando GRUPO', error);       
    }finally{
      console.log('DELETE GROUP finalized');
      clearTasks();
      loadTasks();
    }
}

const createUser = async (userData) => {
  console.log(userData);
  try {
        const response = await fetch(`${requestsURL}user/new`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log('data del front', data);
        
    } catch (error) {
        console.log('Error subiendo datos', error.message);       
        console.log('Error subiendo datos', error.statusCode);       
        console.log('Error subiendo datos', error);       
    }finally{
      console.log('create user finished on front');
    }
}
const login = async (userData, e) => {
  console.log(userData);
  try {
        const response = await fetch(`${requestsURL}user/log`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log('data del front', data);
        console.log(data.code);

        if(data.code === 401){
          taskFuntions.generateText("h4","Correo o contraseña invalidos",loginSection, e.target);
        }
        
        if(data.message==='login exitoso'){
          loginCont.style.display= 'none';
        }

        console.log('el token', data.token);
        if(data.token!==0){
          localStorage.setItem('token', data.token);
        }
    } catch (error) {
        console.log('Error subiendo datos', error);       
    }finally{
      console.log('create user finished on front');
      const rol = localStorage.getItem('token');
      verifyRol(rol);
    }
}

// ------------- END FUNCTIONS -------------//
