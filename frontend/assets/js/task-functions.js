// --------------- FUNCTION FOR GROUPS --------------- // 
export function generateText(typeText, Content, container){
    const notice = document.createElement(typeText);
    notice.textContent=Content;
    notice.classList.add('notice-message');
    container.append(notice);

    setTimeout(()=>{
        container.getElementsByTagName('h4')[0].remove();
    },3000);
}
export function createGroup (groupName, container){
    const detailTag = document.createElement('details');
    detailTag.classList.add('task__group');

    //const div = document.createElement('div');
    //div.classList.add('task__group__div__container');

    const summaryTag = document.createElement('summary');
    summaryTag.textContent = groupName;

    const trash = document.createElement('i');
    trash.classList.add('fa-solid');
    trash.classList.add('fa');
    trash.classList.add('fa-trash-can');
    trash.classList.add('hide');


    detailTag.append(summaryTag);
    //detailTag.append(div);
    summaryTag.append(trash)
    container.append(detailTag);
}
export function createGroupForTask (groupName, container){
    const optionTag = document.createElement('option');
    optionTag.classList.add('task__group--option');
    optionTag.textContent=groupName;
    //const div = document.createElement('div');
    //div.classList.add('task__group__div__container');

    //const summaryTag = document.createElement('summary');
    //summaryTag.textContent = ;
/*
    const trash = document.createElement('i');
    trash.classList.add('fa-solid');
    trash.classList.add('fa');
    trash.classList.add('fa-trash-can');
    trash.classList.add('hide');
*/

    //detailTag.append(summaryTag);
    //detailTag.append(div);
    //summaryTag.append(trash)
    container.append(optionTag);
}
export function hideForms(formsCont, taskOnDays){
    for (let i=0; i<formsCont.length;i++){
        formsCont[i].classList.add('hide');
    }   

    if(taskOnDays.children.length>2){
        for(let j = taskOnDays.children.length-1; j>1; j--){
            taskOnDays.children[j].remove();
        }
    }else{
        taskOnDays.children[1].classList.add('hide');
    }
}
export function generateInputs(parent , container){  
    const parentId = parent.id;

    if(parentId==='add__group'){
        console.log('container', container.firstElementChild.children[0].classList.remove('hide'));
    }else if(parentId==='add__task'){
        console.log('container', container.firstElementChild.children[1].classList.remove('hide'));
    }else if(parentId==='get__for__priority'){
        console.log('container', container.firstElementChild.children[3].classList.remove('hide'));
    }else if(parentId==='days__container'){
        console.log('container', container.firstElementChild.children[4].classList.remove('hide'));
    }
}
// --------------- END FUNCTION FOR GROUPS --------------- // 
// --------------- FUNCTION FOR TASK --------------- // 
export function createTask(today, /*todayCallendarTag */taskGroup , arrayTask, container,taskGroupSelected, dateTask, nameTask){
    if(taskGroup){
       //si el primer elemento esta vacio lo elimino
        if(!(arrayTask[taskGroup.indexOf(taskGroupSelected)][0].name)){
            arrayTask[taskGroup.indexOf(taskGroupSelected)].shift()
        }
        //creo el objeto task
        arrayTask[taskGroup.indexOf(taskGroupSelected)].push({['name']:nameTask, ['dateTask']:dateTask, ['priority']:getPriority(today, dateTask)});
        
        console.log(arrayTask);
        
        //crearlos en el dom
        for(let i=0; i<container.children.length;i++){
            if(container.children[i].children[0].textContent===taskGroupSelected){
                //container.children[i].append('tarea');

                //ocultar la papelera del grupo
                container.children[i].children[0].children[0].classList.add('hide');

                console.log('param1', arrayTask[taskGroup.indexOf(taskGroupSelected)][arrayTask[taskGroup.indexOf(taskGroupSelected)]]);
                console.log('param2', container.children[i]);
                console.log('param3', arrayTask[taskGroup.indexOf(taskGroupSelected)][arrayTask[taskGroup.indexOf(taskGroupSelected)].length-1]);
                createTaskDOM(arrayTask[taskGroup.indexOf(taskGroupSelected)][arrayTask[taskGroup.indexOf(taskGroupSelected)].length-1]   ,  container.children[i], today );
            }
        }

        //ordenar las fechas en el local
        for(let j=0; j<arrayTask.length;j++){

            arrayTask[j].sort((a,b)=>(moment(a.dateTask) - moment(b.dateTask)))

            for(let k =0 ; k<arrayTask[j].length;k++){
                
                console.log(arrayTask[j][k]);
            }
        }
        //subir datos al local
        localStorage.setItem('task', JSON.stringify(arrayTask));
    }else{
        console.log('taskGroup vacio');
    }
}
export function createTaskDOM (task, container, today){
    //creating datails
    const detailTag = document.createElement('details');
    detailTag.classList.add('task');
    
    //creating summary (title)
    const summaryTag = document.createElement('summary');
    summaryTag.classList.add('task__'+getPriority(today, task.dateTask));
    summaryTag.textContent = task.name;

    //creating date task
    const divDate = document.createElement('div');
    divDate.classList.add('task__content__container');

    const taskDate = document.createElement('p');
    taskDate.textContent = task.dateTask;

    const taskDateTitle = document.createElement('h5');
    taskDateTitle.textContent = 'Entrega';

    divDate.append(taskDateTitle);
    divDate.append(taskDate);

    //creating priority
    const divPriority = document.createElement('div');
    divPriority.classList.add('task__content__container');

    const taskPriority = document.createElement('p');
    taskPriority.textContent= task.priority;

    const taskPriorityTitle = document.createElement('h5');
    taskPriorityTitle.textContent = 'Prioridad';

    divPriority.append(taskPriorityTitle);
    divPriority.append(taskPriority);

    //creating trash
    const trash = document.createElement('i');
    trash.classList.add('fa-solid');
    trash.classList.add('fa');
    trash.classList.add('fa-trash-can');
    trash.classList.add('task-trash');

    //appends
    detailTag.append(summaryTag);
    //detailTag.append(div);
    detailTag.append(divDate);
    detailTag.append(divPriority);
    summaryTag.append(trash)
    container.append(detailTag);


    
    /*
    allTaskTrash.forEach(el => {

        el.firstChild.children[0].addEventListener('click',(e)=>{
            console.log(e.target);
        })
    })*/
}
export function isRepeatedGroup(input, local){
    let countRepeted = 0;
    console.log(input);

    if(local){
        for(let i=0;i<local.length;i++){
            console.log(local[i]);
            if(local[i]===input){
                countRepeted++;
            }
        }
    }
    
    console.log(countRepeted);
    return countRepeted>0 ?  false : true;

}
export function isRepeatedTask(input, localTask, localGroup, selectGroup){
    let countRepeted = 0;

    if(localTask){
        //conseguir el indice del grupo
        for(let k =0; k<localGroup.length;k++){
            if(localGroup[k]===selectGroup){
                for(let j =0; j<localTask[k].length;j++){
                    console.log(localTask[k][j]);
                    console.log(input);
                    if(localTask[k][j].name===input){
                        countRepeted++;
                    }
                }           
            }
        }
    }
    console.log(countRepeted);
    return countRepeted>0 ?  false : true;

}
export function getForPriority(today, locale, priority, resultCont){
        //limpiar result container
        console.log(resultCont.children);
        if(resultCont.children.length>0){
            let auxChildrenCont = resultCont.children.length;
            for(let m = 0; m<auxChildrenCont; m++){
                console.log('borrado', m)
                resultCont.children[0].remove();
            }
        }

    if(locale){
        console.log(priority.value);
        console.log(resultCont);
        console.log(locale);
        console.log(today);
        let urgentPriority = [];
        let higthPriority = [];
        let mediumPriority = [];
        let lowPriority = [];



        //quiero recorrer todas las tareas y organizarlas segun su prioridad
        for(let i = 0 ; i<locale.length; i++){
            for(let j = 0; j<locale[i].length; j++){
                //confirmo que haya una tarea
                if(locale[i][j].dateTask){
                    //añado segun su prioridad
                    if(getPriority(today, moment(locale[i][j].dateTask).format('YYYY-MM-DD'))==='Urgente'){
                        urgentPriority.push(locale[i][j]);
                    }else if(getPriority(today, moment(locale[i][j].dateTask).format('YYYY-MM-DD'))==='Alta'){
                        higthPriority.push(locale[i][j]);
                    }else if(getPriority(today, moment(locale[i][j].dateTask).format('YYYY-MM-DD'))==='Media'){
                        mediumPriority.push(locale[i][j]);
                    }else if(getPriority(today, moment(locale[i][j].dateTask).format('YYYY-MM-DD'))==='Baja'){
                        lowPriority.push(locale[i][j]);
                    }
                    console.log(locale[i][j].dateTask , getPriority(today, moment(locale[i][j].dateTask).format('YYYY-MM-DD')));
                }
            } 
        }

        //crearlo al DOM
        if(priority.value==='task__Urgente'){
            console.log('crear tareas urgente')
            if(urgentPriority.length!==0){
                for(let k = 0; k<urgentPriority.length; k++){
                    const div = document.createElement('div');
                    div.classList.add('priority__task__container');
    
                    const taskTitle = document.createElement('h3');
                    taskTitle.textContent = urgentPriority[k].name;
    
                    const dateTaskPriorityContainer = document.createElement('div');
    
                    const dateTaskPriorityTitle = document.createElement('h4');
                    dateTaskPriorityTitle.textContent = 'Fecha de entrega:'
                    
                    const dateTaskPriority = document.createElement('p');
                    dateTaskPriority.textContent = urgentPriority[k].dateTask;
    
                    resultCont.append(div);
                    div.append(taskTitle);
                    div.append(dateTaskPriorityContainer);
                    dateTaskPriorityContainer.append(dateTaskPriorityTitle);
                    dateTaskPriorityContainer.append(dateTaskPriority);
                }
            }else{
                const aviso = document.createElement('h3');
                aviso.textContent='No hay tareas de esta prioridad';
                resultCont.append(aviso);
            }
        }else if(priority.value==='task__Alta'){
            if(higthPriority.length!==0){
                console.log('crear tareas alta');
                for(let k = 0; k<higthPriority.length; k++){
                    const div = document.createElement('div');
                    div.classList.add('priority__task__container');

                    const taskTitle = document.createElement('h3');
                    taskTitle.textContent = higthPriority[k].name;

                    const dateTaskPriorityContainer = document.createElement('div');

                    const dateTaskPriorityTitle = document.createElement('h4');
                    dateTaskPriorityTitle.textContent = 'Fecha de entrega:'
                    
                    const dateTaskPriority = document.createElement('p');
                    dateTaskPriority.textContent = higthPriority[k].dateTask;

                    resultCont.append(div);
                    div.append(taskTitle);
                    div.append(dateTaskPriorityContainer);
                    dateTaskPriorityContainer.append(dateTaskPriorityTitle);
                    dateTaskPriorityContainer.append(dateTaskPriority);
                }
            }else{
                const aviso = document.createElement('h3');
                aviso.textContent='No hay tareas de esta prioridad';
                resultCont.append(aviso);
            }
            
        }else if(priority.value==='task__Media'){
            if(mediumPriority.length!==0){
                for(let k = 0; k<mediumPriority.length; k++){
                    const div = document.createElement('div');
                    div.classList.add('priority__task__container');
    
                    const taskTitle = document.createElement('h3');
                    taskTitle.textContent = mediumPriority[k].name;
    
                    const dateTaskPriorityContainer = document.createElement('div');
    
                    const dateTaskPriorityTitle = document.createElement('h4');
                    dateTaskPriorityTitle.textContent = 'Fecha de entrega:'
                    
                    const dateTaskPriority = document.createElement('p');
                    dateTaskPriority.textContent = mediumPriority[k].dateTask;
    
                    resultCont.append(div);
                    div.append(taskTitle);
                    div.append(dateTaskPriorityContainer);
                    dateTaskPriorityContainer.append(dateTaskPriorityTitle);
                    dateTaskPriorityContainer.append(dateTaskPriority);
                }
            }else{
                const aviso = document.createElement('h3');
                aviso.textContent='No hay tareas de esta prioridad';
                resultCont.append(aviso);
            }
            
        }else if(priority.value==='task__Baja'){
            console.log('crear tareas baja')
            if(lowPriority.length!==0){
                for(let k = 0; k<lowPriority.length; k++){
                    const div = document.createElement('div');
                    div.classList.add('priority__task__container');
    
                    const taskTitle = document.createElement('h3');
                    taskTitle.textContent = lowPriority[k].name;
    
                    const dateTaskPriorityContainer = document.createElement('div');
    
                    const dateTaskPriorityTitle = document.createElement('h4');
                    dateTaskPriorityTitle.textContent = 'Fecha de entrega:'
                    
                    const dateTaskPriority = document.createElement('p');
                    dateTaskPriority.textContent = lowPriority[k].dateTask;
    
                    resultCont.append(div);
                    div.append(taskTitle);
                    div.append(dateTaskPriorityContainer);
                    dateTaskPriorityContainer.append(dateTaskPriorityTitle);
                    dateTaskPriorityContainer.append(dateTaskPriority);
                }
            }else{
                const aviso = document.createElement('h3');
                aviso.textContent='No hay tareas de esta prioridad';
                resultCont.append(aviso);
            }
            
        }


        //ya los tengo por prioridades, falta crearlo al DOM
        console.log('urgente', urgentPriority );
        console.log('alta', higthPriority );
        console.log('media', mediumPriority );
        console.log('baja', lowPriority );

    }else{
        console.log('no hay tareas que organizar');
    }
    
}
// --------------- END FUNCTION FOR TASK --------------- // 
// --------------- FUNCTION FOR CALLENDAR --------------- // 
export function createCallendar(today, dat, yearDom, monthDom, weeksCont, daysCont){
    let MonthsFirstDay = '' ;
    //crear el calendario para el mes actual
    const todayOriginal = moment(today);
    const dateToWork = moment(dat);
    //colocar el año en el DOM;
    const yearTitle = yearDom.children[0];
    yearTitle.textContent=dateToWork.get('year');
    //colocar el mes en el DOM;
    const monthTitle = monthDom.children[1];
    monthTitle.textContent= dateToWork.format('MMMM');

    //ponerme al primer dia del mes
    dateToWork.set('date', 1);

    for(let j=0; j<weeksCont.children.length; j++){
        if(weeksCont.children[j].id===dateToWork.toLocaleString().slice(0,3)){
            daysCont.children[j].textContent = dateToWork.format('DD');
            daysCont.children[j].setAttribute('id', 'first-month-day');
            MonthsFirstDay = j;
        };
    }
    let getCell = document.getElementById('first-month-day');
    //dias que tiene el mes
    const fecha2 = moment(dateToWork);
    fecha2.add( 1,'month');
    const mounthDays = fecha2.diff(dateToWork, 'days') 
    //rellenar el resto del mes

    for(let i=MonthsFirstDay; i<=(MonthsFirstDay-1)+mounthDays; i++){
        getCell.setAttribute('data-date', dateToWork.format('YYYY-MM-DD'));
        dateToWork.add(1,'days');
        getCell.nextElementSibling.textContent = dateToWork.format('DD');
        
        if(todayOriginal.format('YYYY-MM-DD')===getCell.getAttribute('data-date')){
            getCell.setAttribute('id', 'today-day');
        }else if(todayOriginal.format('YYYY-MM-DD')>getCell.getAttribute('data-date')){
            getCell.classList.add('previous__days');
        }else{
            getCell.classList.add('next__days');
        }

        getCell=getCell.nextElementSibling;
        
    }
    //el ultimo dia del mes no aplicaba la clase al iterar, pone uno de mas, y lo quito (primer dia del mes siguiente)
    getCell.classList.remove('next__days');
    getCell.classList.remove('previous__days');
    getCell.textContent='';
    //getCell.removeAttribute('data-date', dateToWork.format('YYYY-MM-DD'));


}
export function clearCalendar(allCallendarDays){
    const arrayCells = allCallendarDays.querySelectorAll('.days__cell');
    arrayCells.forEach(el => {
        el.classList.remove('previous__days');
        el.classList.remove('next__days');
        el.classList.remove('task__Baja');
        el.classList.remove('task__Media');
        el.classList.remove('task__Alta');
        el.classList.remove('task__Urgente');
        el.removeAttribute('data-date');
        el.removeAttribute('id');
        el.textContent='';
    });

}
export function getPriority(todayDate, taskDate){
    let priority ;

    let diffDays = moment(taskDate).diff(moment(todayDate), 'days'); 

    if(diffDays<=5){
        priority = 'Urgente';
    }else if(diffDays>5 && diffDays<=10){
        priority = 'Alta';
    }else if(diffDays>10 && diffDays<=15){
        priority = 'Media';
    }else{
        priority = 'Baja';
    }
    /*
    console.log('hoy', moment(todayDate).format('YYYY-MM-DD'));
    console.log('fecha entrega', moment(taskDate).format('YYYY-MM-DD'));*/

    return priority;
}
export function setTaskOnCallendar(localeTasks, localeGroups,todayOrigin, todayCallendarTag){
    //console.log(localeTasks);
    //console.log(moment(today).format('YYYY-MM-DD'));
    let today = todayOrigin ;
    let datesArrayOrg=[];
    let datesDaysArrayOrg=[];
    let taskCdArray=[];
    let tasksArrayOrg=[];
    let datesDaysArray, datesArray, aux;
    //todas las tareas
    for(let i = 0; i<localeTasks.length; i++ ){
        for(let j = 0; j<localeTasks[i].length; j++){
            let dateForTask = localeTasks[i][j].dateTask;
            datesArrayOrg.push(moment(dateForTask));
            tasksArrayOrg.push({'task':localeTasks[i][j], 'taskGp':i});
            datesDaysArrayOrg.push(moment(localeTasks[i][j].dateTask).diff(moment(today), 'days'));
        }
    }

    //creo estas variables para poder añadir el atributo task__cd
    datesDaysArray = datesDaysArrayOrg; 
    datesArray = datesArrayOrg;
    aux = 0;

    datesDaysArray.sort((a,b)=> a - b);
    
    datesArray.sort((a,b)=> a - b);
    //moverme por el callendario desde la primera celda hasta la ultima
    for(let k=0; k<todayCallendarTag.parentElement.children.length;k++){

        for(let m = 0; m<datesArray.length;m++){
            if(todayCallendarTag.parentElement.children[k].getAttribute('data-date')===datesArray[m].format('YYYY-MM-DD') ){
                //crear y asignar el atributo task__cd a las celdas que contengan una o mas tareas
                taskCdArray=[];
                
                for(let aux = 0; aux<tasksArrayOrg.length; aux++){
                    if(todayCallendarTag.parentElement.children[k].getAttribute('data-date')===moment(tasksArrayOrg[aux].task.dateTask).format('YYYY-MM-DD')){
                        
                        //if ya contiene un task__cd, 
                        if(todayCallendarTag.parentElement.children[k].getAttribute('task__cd')){
                            //contiene ya una tarea
                            taskCdArray.push(`${localeGroups[tasksArrayOrg[aux].taskGp]}-${tasksArrayOrg[aux].task.name}`);

                        }else{
                            //creando por primera vez
                            taskCdArray=[];
                            taskCdArray.push(`${localeGroups[tasksArrayOrg[aux].taskGp]}-${tasksArrayOrg[aux].task.name}`);
                        }
                        todayCallendarTag.parentElement.children[k].setAttribute('task__cd', taskCdArray);
                    }
                }
                
                
                //console.log(tasksArrayOrg[aux], 'la del:', todayCallendarTag.parentElement.children[k].getAttribute('data-date'));
                todayCallendarTag.parentElement.children[k].classList.add('task__'+getPriority(today, todayCallendarTag.parentElement.children[k].getAttribute('data-date')))
            }else{
                //console.log('no entra a poner clases');
            }
        }
    }
}
export function getDaysTask(elm, cont){
    //crear contenedores de las tareas
    if(elm.getAttribute('task__cd')){

    //funcionalidad
    const separateTasks = elm.getAttribute('task__cd').split(',');
    let separateGroupTasks ;
    for(let i=0; i<separateTasks.length;i++){

        const divTarea = document.createElement('div');
        divTarea.classList.add('day__task__container')
        const divTareaTask = document.createElement('div');
        divTareaTask.classList.add('view__task__container');
        const divTareaGroup = document.createElement('div');
        divTareaGroup.classList.add('view__task__container');
        const titleTask = document.createElement('h3');
        const titleGroup = document.createElement('h3');
        
        const TaskP = document.createElement('p');
        const GroupP = document.createElement('p');
        
        titleTask.textContent='Tarea';
        titleGroup.textContent='Grupo';

        separateGroupTasks = separateTasks[i].split('-');
        //inserto el valor
        TaskP.textContent=separateGroupTasks[1];
        GroupP.textContent=separateGroupTasks[0];

        cont.append(divTarea);
        divTarea.append(divTareaGroup);
        divTarea.append(divTareaTask);
        divTareaGroup.append(titleGroup);
        divTareaGroup.append(GroupP);
        divTareaTask.append(titleTask);
        divTareaTask.append(TaskP);
    }
    }else{
        //hacer visible el texto que dice "no hay tareas para este dia"
        cont.children[1].classList.remove('hide');
    }
}
// --------------- END FUNCTION FOR CALLENDAR --------------- // 
// --------------- FETCH --------------- //
//++++++ WEATHER ++++++
export async function getWeather(todayWeatherTag, todayCellOriginal, todayGlobal, callendarmonthTag) {
    let todayCell = todayCellOriginal;
    console.log('obteniendo clima');
    try {
        const response2 = await fetch('http://api.openweathermap.org/geo/1.0/direct?q={palencia}&appid=e78f29f6caa3eaa7b4f4032bcc7a39b7');
        const data2 = await response2.json();

        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${data2[0].lat}&lon=${data2[0].lon}&appid=e78f29f6caa3eaa7b4f4032bcc7a39b7&units=metric`);
        const data = await response.json();

        //poner la nube para los 4 dias siguientes

        if(moment(todayGlobal).format('MMMM')===callendarmonthTag.children[1].textContent){
            let auxDateWeather = 0;
            for(let i = 0; i<data.list.length; i++){
                        
                if(data.list[i].dt_txt.slice(0,10)!==auxDateWeather){
                    if(i>0){
                        const imgTagCell= document.createElement('img');
                        imgTagCell.classList.add('weather__cell__img');
                        imgTagCell.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i+5].weather[0].icon}.png`);
                        todayCell.append(imgTagCell);

                    }else{
                        const imgTagCell= document.createElement('img');
                        imgTagCell.classList.add('weather__cell__img');
                        imgTagCell.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png`);
                        todayCell.append(imgTagCell);
                    }

                    auxDateWeather = data.list[i].dt_txt.slice(0,10);
                    todayCell = todayCell.nextElementSibling;
                }
            }
        }
        
        if(todayWeatherTag.children.length === 0){
        
            //poner la imagen del clima de hoy
            const imgTag= document.createElement('img');
            imgTag.setAttribute('src', `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`);

            //poner la temperatura de hoy
            const todayTemp= document.createElement('h3');
            todayTemp.textContent= Math.round(data.list[0].main.temp)+'°C';

            todayWeatherTag.append(todayTemp);
            todayWeatherTag.append(imgTag);
        }
        

    } catch (error) {
        console.log(error.message);
    }finally{
        console.log('finalizado clima');
    }
    
}
export async function getNews(newsCont){
    console.log('obteniendo noticias');
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=eae15b71457c4aeda6a1c25ab0f44705');
        const data = await response.json();


        for(let i =0; i<newsCont.children.length;i++){
            const enlace = document.createElement('a');
            enlace.textContent = data.articles[i].title;
            enlace.setAttribute('href', data.articles[i].url);

            newsCont.children[i].append(enlace);
        }
    } catch (error) {
        console.log(error.message);
    }finally{
        console.log('termino get news');
    }
}
// --------------- END FETCH --------------- // 