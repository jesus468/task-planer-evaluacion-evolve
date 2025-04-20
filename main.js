console.log('main')
// ------------- DOM ELEMENTS -------------//
const burguerBtn = document.getElementById('burguer__nav');
const menuContent = document.getElementById('functions__burguer__container');

const blurSect = document.getElementById('blur__section');
const xBlurBtn = document.getElementById('blur__section--X');
const blurContentContainer = document.getElementById('blur__content__container');
const blurContentsForms = blurContentContainer.firstElementChild.children;
const daysTask = document.getElementById('days__task');

const addGroupBtn = document.getElementById('add__group__btn');
const menuButtonsArray = document.querySelectorAll('.menu__buttons');
const groupsContainer = document.getElementById('task__group__container');
const addGroupInner = document.getElementById('add__group__inner');

const addTaskBtn = document.getElementById('add__task__btn');
const addTaskInner = document.getElementById('add__task__inner');
const selectTaskGroup = document.getElementById('select__groups__task');

const callendarYear = document.getElementById('year__container');
const callendarmonth = document.getElementById('month__container');
const callendarWeeks = document.getElementById('days__week__container');
const callendarDays = document.getElementById('days__container');
const allCallendarCell = document.querySelectorAll('.days__cell');

const monthLeftArrow = document.getElementById('month__back__arrow');
const monthRightArrow = document.getElementById('month__next__arrow');

const footerCont = document.getElementById('footer');
const footerInner = document.getElementById('news__inner');
const TodayWeather = document.getElementById('weather__container');
const newsContainer = document.getElementById('news__container');

const todayGlobal = moment().format('YYYY-MM-DD');

// ------------- END DOM ELEMENTS -------------//

// ------------- GET CONTENT FROM LOCALSTORAGE -------------//
//localStorage.clear();

let taskGroups = JSON.parse(localStorage.getItem('task-groups'));
let tasks = JSON.parse(localStorage.getItem('task'));
let tasksArray = [];

if(tasks){
    tasksArray = tasks;
}

// creating task groups 
if(!localStorage.getItem('task-groups')){
    groupsContainer.classList.add('task__group__cont--empty');
    taskFuntions.generateText('h3', 'no hay grupos de tareas aun', groupsContainer);
}else{
    groupsContainer.classList.remove('task__group__cont--empty');
    for(let i=0 ;i<taskGroups.length; i++){
        //agregando las tareas a la seccion de grupos de tareas
        taskFuntions.createGroup(taskGroups[i] , groupsContainer);
        
        //agregando a la seleccion de crear tareas 
        taskFuntions.createGroupForTask(taskGroups[i] , selectTaskGroup);

        //validando si grupo tiene tareas, y creandolas
        if(tasksArray[i][0].name){
            for(let j=0 ; j<tasksArray[i].length; j++){
                //console.log('yes', i);
                //console.log(groupsContainer.children[i], 'container ?')
                taskFuntions.createTaskDOM(tasksArray[i][j], groupsContainer.children[i],todayGlobal)
            }
        }
    }
    validateTaskGroupContent();
    setTaskTrashEvent()
}
// ------------- END GET CONTENT FROM LOCALSTORAGE -------------//

// ------------- IMPORT -------------//
//import from task-function
import * as taskFuntions from './assets/js/task-functions.js';
// ------------- END IMPORT -------------//


// ------------- DATES / CALLENDAR -------------//
let today = moment().format('YYYY-MM-DD');
taskFuntions.createCallendar(todayGlobal, today, callendarYear, callendarmonth, callendarWeeks, callendarDays);

//poniendo las tareas en el calendario
const callendarToday = document.getElementById('today-day');
taskFuntions.setTaskOnCallendar(tasksArray, taskGroups,todayGlobal, callendarToday);

//poniendo los climas en el calendario
taskFuntions.getWeather(TodayWeather, callendarToday,todayGlobal, callendarmonth);
taskFuntions.getNews(footerInner);

// ------------- END DATES / CALLENDAR -------------//


// ------------- EVENT LISTENERS ------------//

burguerBtn.addEventListener('click', ()=>{
    menuContent.classList.toggle('functions__burguer__hiden');
});
xBlurBtn.addEventListener('click', ()=>{
    blurSect.classList.add('hide');
    
    taskFuntions.hideForms(blurContentsForms, daysTask);
});
addGroupBtn.addEventListener('click',()=>{
    const input = document.getElementById('add__group__input');
   
    if(validateInput(input.value, addGroupInner)){
        taskGroups = JSON.parse(localStorage.getItem('task-groups'))
        if(taskFuntions.isRepeatedGroup(input.value , taskGroups)){
            console.log('es 0');
            console.log(taskFuntions.isRepeatedGroup);
            //obtengo los datos para que esten actualizados
            let taskGroups = JSON.parse(localStorage.getItem('task-groups'));

            //creo el grupo y oculto el blur
            taskFuntions.createGroup(input.value, groupsContainer);
            
            //actualizar los grupos en el select
            taskFuntions.createGroupForTask(input.value , selectTaskGroup);
            
            blurSect.classList.add('hide');
            menuContent.classList.toggle('functions__burguer__hiden');

            //actualizarlo en el local, dependiendo si hay valores ya en el local
            if(localStorage.getItem('task-groups')){
                console.log('hay elementos en el local');
                //console.log(taskGroups);

                taskGroups.push(input.value);
                localStorage.setItem('task-groups', JSON.stringify(taskGroups));

                tasksArray.push([{}]);
                localStorage.setItem('task', JSON.stringify(tasksArray));

            }else{
                if(groupsContainer.children[0].classList.contains('notice-message')){
                    groupsContainer.children[0].remove();
                    groupsContainer.classList.remove('task__group__cont--empty');
                }
                let newTaskGroups = [];
                console.log('NO hay elementos');
                newTaskGroups.push(input.value);
                localStorage.setItem('task-groups', JSON.stringify(newTaskGroups));
                localStorage.setItem('task', JSON.stringify([[{}]]));
            }        
            input.value='';
            taskFuntions.hideForms(blurContentsForms, daysTask);
        }else{
            taskFuntions.generateText('h4','Ya existe un grupo con ese nombre', addGroupInner);
        }

    }else{
        console.log(validateInput(input.value));
        console.log('esta repetido');

    }
    validateTaskGroupContent()
});

//que cuando se cree un grupo aqui, se suba al array task
addTaskBtn.addEventListener('click', ()=>{
    const input = document.getElementById('add__task__input');
    const dateTaskInput = document.getElementById('date__task__input');

    //console.log(dateTaskInput.value);
    //validando que no este vacio el input (name)
    if(validateInput(input.value, addTaskInner)){
        //validando que no este vacio el date
        if(validateInput(dateTaskInput.value, addTaskInner)){
            //validar que no sea menor al dia de hoy
            if(moment(dateTaskInput.value).format('YYYY-MM-DD')>moment(todayGlobal).format('YYYY-MM-DD')){
                //console.log('entro a fecha input mayor que fecha hoy ');
                //validar que no sea mayor a 50 años
                const years50 = moment(todayGlobal);
                years50.add(50, 'years');
                if(!(moment(dateTaskInput.value).format('YYYY')>years50.format('YYYY'))){
                    //console.log('menos de 50 años');
                    //validar el option{
                    if(selectTaskGroup.value!=='default'){
                        //console.log(selectTaskGroup.value, 'valor del select');
                        //si option es create group

                        //para tener los datos actualizados, llamo a taskgroups y task del local
                        taskGroups = JSON.parse(localStorage.getItem('task-groups'));
                        tasks = JSON.parse(localStorage.getItem('task'));
                        tasksArray = tasks;

                        if(selectTaskGroup.value==='create__group'){
                            const newGroupFromTaskCont = document.getElementById('new__group__from__task__container');
                            newGroupFromTaskCont.classList.remove('hide');
                            
                            if(newGroupFromTaskCont.getElementsByTagName('input')[0].value!==''){

                                taskGroups = JSON.parse(localStorage.getItem('task-groups'))
                                console.log(newGroupFromTaskCont.getElementsByTagName('input')[0].value)
                                if(taskFuntions.isRepeatedGroup(newGroupFromTaskCont.getElementsByTagName('input')[0].value , taskGroups)){

                                    taskFuntions.createGroupForTask(newGroupFromTaskCont.getElementsByTagName('input')[0].value, selectTaskGroup);
                                    taskFuntions.createGroup(newGroupFromTaskCont.getElementsByTagName('input')[0].value, groupsContainer);

                                    if(localStorage.getItem('task-groups')){
                                        console.log(taskGroups);
                                        tasksArray.push([{}]);
                                        taskGroups.push(newGroupFromTaskCont.getElementsByTagName('input')[0].value);
                                        console.log('hay elementos en el local');

                                        //subiendo al local, task y taskgroup (cuando hay elementos);
                                        localStorage.setItem('task', JSON.stringify(tasksArray));
                                        localStorage.setItem('task-groups', JSON.stringify(taskGroups));
                                    }else{
                                        if(groupsContainer.children[0].classList.contains('notice-message')){
                                            groupsContainer.children[0].remove();
                                            groupsContainer.classList.remove('task__group__cont--empty');
                                        }
                                        let newTaskGroups = [];
                                        console.log('NO hay elementos');
                                        newTaskGroups.push(newGroupFromTaskCont.getElementsByTagName('input')[0].value);
                                        localStorage.setItem('task-groups', JSON.stringify(newTaskGroups));
                                        localStorage.setItem('task', JSON.stringify([[{}]]));
                                    }
                                    newGroupFromTaskCont.classList.add('hide');
                                    newGroupFromTaskCont.getElementsByTagName('input')[0].value='';

                                }else{
                                    taskFuntions.generateText('h4','Ya existe un grupo con ese nombre', addTaskInner);

                                }

                                
                            
                            }else{

                                taskFuntions.generateText('h4','escribe aqui el nombre del grupo', addTaskInner)
                            }
                            validateTaskGroupContent()
                            
                            
                        }else{
                            if(taskFuntions.isRepeatedTask(input.value, tasksArray, taskGroups, selectTaskGroup.value)){
                                const newGroupFromTaskCont = document.getElementById('new__group__from__task__container');
                                newGroupFromTaskCont.classList.add('hide');

                                //creamos la tarea
                                taskFuntions.createTask(todayGlobal, /*callendarToday*/taskGroups, tasksArray, groupsContainer , selectTaskGroup.value, dateTaskInput.value, input.value);
                                
                                taskFuntions.hideForms(blurContentsForms, daysTask);
                                blurSect.classList.add('hide');
                                menuContent.classList.toggle('functions__burguer__hiden');
                        
                                input.value='';
                                dateTaskInput.value='';
                                selectTaskGroup.value='Default';
                            }else{
                                taskFuntions.generateText('h4','Ya existe una tarea con ese nombre', addTaskInner);
                            }
                            
                        }
                    }else{        
                        taskFuntions.generateText('h4', 'Selecciona un grupo', addTaskInner);
                    }

                    //esto es para ocultar el div del input para nuevo grupo desde create task
                    const newGroupFromTaskCont = document.getElementById('new__group__from__task__container');
                    //newGroupFromTaskCont.classList.add('hide');

                }else{
                    taskFuntions.generateText('h4', 'no se permite fecha con mas de 50 años', addTaskInner)
                }
            }else{
                taskFuntions.generateText('h4', 'la fecha tiene que ser futura', addTaskInner)
            }
            //console.log('es valido fecha');
        }else{
            //console.log('rechazado fecha');
        }
        //console.log('es valido input name');

    }else{  
        //console.log('rechazado input name');
        console.log(validateInput(input.value));
    }
    setTaskTrashEvent()
    validateTaskGroupContent();
})
// for menu buttons
menuButtonsArray.forEach(el => el.children[1].addEventListener('click',(e)=>{
    if(e.target.textContent==='Add Group'){
        console.log('clicado en ', e.target.textContent);
        blurSect.classList.remove('hide');
        taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);

    }else if(e.target.textContent==='Add task'){
        //console.log('clicado en ', e.target.textContent);

        blurSect.classList.remove('hide');
        taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);


    }else if(e.target.textContent==='Search task'){
        console.log('clicado en ', e.target.textContent);

    }else if(e.target.textContent==='Get for priority'){
        console.log('clicado en ', e.target.textContent);

        blurSect.classList.remove('hide');
        taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);
    }
}));
//for callendars
monthLeftArrow.addEventListener('click',()=>{
    let previousMonth = moment(today);
    previousMonth.subtract(1,'month');
    today= moment(previousMonth);

    taskFuntions.clearCalendar(callendarDays);
    taskFuntions.createCallendar(todayGlobal, previousMonth, callendarYear, callendarmonth, callendarWeeks, callendarDays)
    taskFuntions.setTaskOnCallendar(tasksArray, taskGroups,todayGlobal, callendarToday);


    taskFuntions.getWeather(TodayWeather, callendarToday,todayGlobal, callendarmonth);

})
monthRightArrow.addEventListener('click',()=>{
    let previousMonth = moment(today);
    previousMonth.add(1,'month');

    today= moment(previousMonth);

    taskFuntions.clearCalendar(callendarDays);
    taskFuntions.createCallendar(todayGlobal, previousMonth, callendarYear, callendarmonth, callendarWeeks, callendarDays)
    taskFuntions.setTaskOnCallendar(tasksArray, taskGroups,todayGlobal, callendarToday);   ;
    taskFuntions.getWeather(TodayWeather, callendarToday,todayGlobal, callendarmonth);

})
//for every calendar cell
allCallendarCell.forEach(el => 
    el.addEventListener('click',(e)=>{
        if(e.target.getAttribute('data-date')){
            //muestro la seccion blanca sobre todo
            blurSect.classList.remove('hide');
            daysTask.children[1].classList.add('hide');
            taskFuntions.generateInputs(e.target.parentElement, blurContentContainer);
            
            taskFuntions.getDaysTask(e.target, daysTask);
            //puedo hacer es setear unos datos en cada celda, que si hay tarea guardo el indice de la tarea
            //no , guardar un atributo, que sea nombregrupo-nombretarea, y que luego la pueda usar para encontrarla 
        }else{
            console.log('vacio celda');
            
        }
    })

)

newsContainer.addEventListener('click', ()=>{
    footerCont.classList.toggle('news__open-footer');
    footerCont.children[0].classList.toggle('today__weater__open');
    newsContainer.classList.toggle('news__open')
    footerInner.classList.toggle('hide');
});
// ------------- END EVENT LISTENERS -------------//


// ------------- FUNCTIONS -------------//
function validateInput(inp, cont){
    let aux =0;
    if(inp===''){
        console.log('vacio');
        aux++;
        taskFuntions.generateText('h4', 'no se permite campos vacios', cont);
        
    }
    if(inp.length>30){
        console.log('no es menor que 30');
        aux++;
        taskFuntions.generateText('h4', 'texto muy largo', cont);
    }

    if(aux>0){
        console.log('no valido')
        return false;
    }else{
        //console.log('valido');
        return true;
    }
}
function validateTaskGroupContent(){
    //para saber si se le tiene que añadir la papelera a los grupos;
    const allTaskGroups = document.querySelectorAll('.task__group');
    
    for(let i=0; i<allTaskGroups.length;i++){
        //add trash if the group ist empty
        if(allTaskGroups[i].children.length<2){
            console.log('grupo vacio');
            allTaskGroups[i].firstChild.children[0].classList.remove('hide')

            //event for delete empty group
            allTaskGroups[i].firstChild.children[0].addEventListener('click',(e)=>{
                e.target.parentElement.parentElement.remove();
                
                //quitar el elemento del select 
                for(let i2=0; i2<selectTaskGroup.children.length;i2++){
                    if(e.target.parentElement.textContent===selectTaskGroup.children[i2].textContent){
                        selectTaskGroup.children[i2].remove();
                    }
                }

                //quitar un objeto del array Tasks EN LOCAL (mejorar- no  es especifico, solo quito con un .pop());
                taskGroups = JSON.parse(localStorage.getItem('task-groups'));
                tasksArray=JSON.parse(localStorage.getItem('task'));
                console.log(tasksArray);
                tasksArray.pop();
                console.log(tasksArray);

                localStorage.setItem('task', JSON.stringify(tasksArray));


                const updatedTaskGroups = taskGroups.filter(el => el!==e.target.parentElement.firstChild.textContent);
                if(updatedTaskGroups.length===0){
                    //los datos que se van a subir a local es vacio []
                    localStorage.removeItem('task-groups');
                    localStorage.removeItem('task');
                    taskFuntions.generateText('h3', 'no hay grupos de tareas', groupsContainer);
                }else{
                    //new localStorage taskGroups
                    localStorage.setItem('task-groups', JSON.stringify(updatedTaskGroups));
                    console.log(updatedTaskGroups);
                }
            })
        }
    }
}
function setTaskTrashEvent(){
    //Event listeners for trash task
    const allTaskTrash = document.querySelectorAll('.task');
    //console.log(allTaskTrash)
    for(let k=0; k<allTaskTrash.length; k++){
        allTaskTrash[k].firstChild.children[0].addEventListener('click',(e)=>{

            //quitarlo del Local
            taskGroups = JSON.parse(localStorage.getItem('task-groups'));
            tasksArray =JSON.parse(localStorage.getItem('task'));

            for(let j=0; j<taskGroups.length; j++){
                //encuentro de que grupo es el trash clicado
                if(taskGroups[j]===e.target.parentElement.parentElement.parentElement.children[0].textContent){
                    //console.log('es de:', e.target.parentElement.parentElement.parentElement.children[0].textContent, 'indice en local', j);

                    //entro a las tareas del grupo
                    console.log('esta aqui', tasksArray[j]);

                    //reviso las clases que tiene el grupo, 
                    console.log(e.target.parentElement.parentElement.children);

                    //todas las tareas, menos la que he clicado
                    const tareas = tasksArray[j];
                    let newTareas = tareas.filter(el => el.name!==e.target.parentElement.textContent)
                    //pongo el nuevo contenido de las tareas
                    tasksArray[j]=newTareas;

                    //asegurarme que en el local, task no quede [] sino [{}]
                    if(tasksArray[j].length===0){
                        tasksArray[j].push({});
                        //poner la papelera del grupo
                        console.log(e.target.parentElement.parentElement.parentElement.children[0].children[0].classList.remove('hide'))
                        validateTaskGroupContent();

                        console.log('vacio');
                    }
                    //subir
                    localStorage.setItem('task', JSON.stringify(tasksArray));
                }
            }

            //quitarlo del DOM
            e.target.parentElement.parentElement.remove();

            // y que le ponga la papelera de una vez a el grupo
            console.log(tasksArray)
            /*if(tasksArray.length<1){

            }*/

        })
    }
}
// ------------- END FUNCTIONS -------------//
