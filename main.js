console.log('main')
// ------------- DOM ELEMENTS -------------//
const burguerBtn = document.getElementById('burguer__nav');
const menuContent = document.getElementById('functions__burguer__container');
const blurSect = document.getElementById('blur__section');
const xBlurBtn = document.getElementById('blur__section--X');
const addGroupBtn = document.getElementById('add__group__btn');
const menuButtonsArray = document.querySelectorAll('.menu__buttons');
const groupsContainer = document.getElementById('task__group__container');
const addGroupInner = document.getElementById('add__group__inner');

// ------------- END DOM ELEMENTS -------------//
// ------------- GET CONTENT FROM LOCALSTORAGE -------------//
//localStorage.clear();

let taskGroups = JSON.parse(localStorage.getItem('task-groups'));
// creating task groups 
if(!localStorage.getItem('task-groups')){
    groupsContainer.classList.add('task__group__cont--empty');
    taskFuntions.generateText('h3', 'no hay grupos de tareas aun', groupsContainer);
}else{
    groupsContainer.classList.remove('task__group__cont--empty');
    for(let i=0 ;i<taskGroups.length; i++){
        taskFuntions.createGroup(taskGroups[i] , groupsContainer);
    }

    validateTaskGroupContent();
}

// ------------- END GET CONTENT FROM LOCALSTORAGE -------------//
//import from task-function
import * as taskFuntions from './assets/js/task-functions.js';

// ------------- EVENT LISTENERS ------------//

burguerBtn.addEventListener('click', ()=>{
    menuContent.classList.toggle('functions__burguer__hiden');
});
xBlurBtn.addEventListener('click', ()=>{
    blurSect.classList.add('hide');
});
addGroupBtn.addEventListener('click',()=>{
    const input = document.getElementById('add__group__input');
   
    if(validateInput(input.value, addGroupInner)){
        console.log(validateInput(input.value));
        taskFuntions.createGroup(input.value, groupsContainer);
        blurSect.classList.add('hide');
        menuContent.classList.toggle('functions__burguer__hiden');

        if(localStorage.getItem('task-groups')){
            console.log(taskGroups);
            taskGroups.push(input.value);
            console.log('hay elementos en el local');
            localStorage.setItem('task-groups', JSON.stringify(taskGroups));
        }else{
            if(groupsContainer.children[0].classList.contains('notice-message')){
                groupsContainer.children[0].remove();
                groupsContainer.classList.remove('task__group__cont--empty');
            }
            let newTaskGroups = [];
            console.log('NO hay elementos');
            newTaskGroups.push(input.value);
            localStorage.setItem('task-groups', JSON.stringify(newTaskGroups));
        }
        input.value='';
    }else{
        console.log(validateInput(input.value));
    }
    validateTaskGroupContent()
});
// for menu buttons
menuButtonsArray.forEach(el => el.children[1].addEventListener('click',(e)=>{
    if(e.target.textContent==='Add Group'){
        console.log('clicado en ', e.target.textContent);
        blurSect.classList.remove('hide');

        taskFuntions.generateInputs(e.target.textContent);

    }else if(e.target.textContent==='Add task'){
        console.log('clicado en ', e.target.textContent);

    }else if(e.target.textContent==='Search task'){
        console.log('clicado en ', e.target.textContent);

    }else if(e.target.textContent==='Get for priority'){
        console.log('clicado en ', e.target.textContent);
    }
}));
// ------------- END EVENT LISTENERS -------------//


// ------------- FUNCTIONS -------------//
function validateInput(inp, cont){
    let aux =0;
    if(inp===''){
        console.log('vacio');
        aux++;
        taskFuntions.generateText('h4', 'no se permite campos vacios', cont);
        setTimeout(()=>{
            cont.getElementsByTagName('h4')[0].remove();
        },3000);
    }
    if(inp.length>30){
        console.log('no es menor que 30');
        aux++;
        taskFuntions.generateText('h4', 'texto muy largo', cont);
        setTimeout(()=>{
            cont.getElementsByTagName('h4')[0].remove();
        },3000);
    }

    if(aux>0){
        console.log('no valido')
        return false;
    }else{
        console.log('valido');
        return true;
    }
}
function validateTaskGroupContent(){
    const allTaskGroups = document.querySelectorAll('.task__group');
    
    for(let i=0; i<allTaskGroups.length;i++){
        //add trash if the group ist empty
        if(allTaskGroups[i].children.length<2){
            console.log('grupo vacio');
            allTaskGroups[i].firstChild.children[0].classList.remove('hide')

            //event for delete empty group
            allTaskGroups[i].firstChild.children[0].addEventListener('click',(e)=>{
                e.target.parentElement.parentElement.remove();
                taskGroups = JSON.parse(localStorage.getItem('task-groups'));

                const updatedTaskGroups = taskGroups.filter(el => el!==e.target.parentElement.firstChild.textContent);
                if(updatedTaskGroups.length===0){
                    //los datos que se van a subir a local es vacio []
                    localStorage.removeItem('task-groups');
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
// ------------- END FUNCTIONS -------------//