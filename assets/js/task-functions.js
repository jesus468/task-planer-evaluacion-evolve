export function createGroup (groupName, container){
    const detailTag = document.createElement('details');
    detailTag.classList.add('task__group');

    const summaryTag = document.createElement('summary');
    summaryTag.textContent = groupName;

    detailTag.append(summaryTag);
    container.append(detailTag);
}
export function generateInputs(inputType , container){
    if(inputType==='Add Group'){
        const inp = 
        console.log('este es el espacio para crear el beta');
    }
}