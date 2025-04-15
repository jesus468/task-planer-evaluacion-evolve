console.log('main')
// ------------- DOM ELEMENTS -------------//
const burguerBtn = document.getElementById('burguer__nav');
const menuContent = document.getElementById('functions__burguer__container');
const blurSect = document.getElementById('blur__section');
const xBlurBtn = document.getElementById('blur__section--X');
const addGroupBtn = document.getElementById('add__group__btn');
const menuButtonsArray = document.querySelectorAll('.menu__buttons');
// ------------- END DOM ELEMENTS -------------//

const groupsContainer = document.getElementById('task__group__container');

//import from task-function
import * as taskFuntions from './assets/js/task-functions.js'


// ------------- EVENT LISTENERS -------------//

burguerBtn.addEventListener('click', ()=>{
    menuContent.classList.toggle('functions__burguer__hiden');
});
xBlurBtn.addEventListener('click', ()=>{
    blurSect.classList.add('hide');
})
addGroupBtn.addEventListener('click',()=>{
    const input = document.getElementById('add__group__input');
    taskFuntions.createGroup(input.value, groupsContainer);
    blurSect.classList.add('hide');
    menuContent.classList.toggle('functions__burguer__hiden')

    /*exportar los datos a la base de datos y empezar a hacer los contenidos fijos*/
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

