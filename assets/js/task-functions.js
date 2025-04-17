// --------------- FUNCTION FOR GROUPS --------------- // 
export function generateText(typeText, Content, container){
    const notice = document.createElement(typeText);
    notice.textContent=Content;
    notice.classList.add('notice-message');
    container.append(notice);
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
export function generateInputs(inputType , container){
    if(inputType==='Add Group'){
        //const inp = console.log('este es el espacio para crear el beta');
    }
}
// --------------- END FUNCTION FOR GROUPS --------------- // 


// --------------- FUNCTION FOR CALLENDAR --------------- // 
export function createCallendar(dat, yearDom, monthDom){
    
    //crear el calendario para el mes actual
    const today = moment(dat);
    //colocar el año en el DOM;
    const yearTitle = yearDom.children[0];
    yearTitle.textContent=today.get('year');
    console.log(yearTitle);
    //colocar el mes en el DOM;
    const monthTitle = monthDom.children[0];
    monthTitle.textContent= today.format('MMMM');
    console.log(monthTitle);

    //ponerme al primer dia del mes
    today.set('date', 1);

    //dias que tiene el mes
    const fecha2 = moment(today);
    fecha2.add( 1,'month');
    const mounthDays = fecha2.diff(today, 'days') 

    //crear callendario
}
// --------------- END FUNCTION FOR CALLENDAR --------------- // 
