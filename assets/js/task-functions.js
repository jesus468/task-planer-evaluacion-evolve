/*export function setGroupsFromLocal(){

}*/
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