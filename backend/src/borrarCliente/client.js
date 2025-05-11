const moment = require('moment');

console.log(moment("2025-05-12").format('DD-MM-YYYY'));
/*
const taskData = {
    nameGroup: 'super prueba',
    taskGroup: [{
        name: 'evaluacion1',
        dateTask : moment("2025-05-22"),
        priority: 'pending'
    },{
        name: 'evaluacion2',
        dateTask : moment("2025-05-28"),
        priority: 'pending'
    },{
        name: 'evaluacion3',
        dateTask : moment("2025-06-05"),
        priority: 'pending'
    }
]
}*/
const addTasks = async () => { 
    try {
        const response = await fetch('http://localhost:3000/api/user/');
        const data = await response.json();

        data.length ===0 ? console.log('no hay datos', data) : console.log('hay datos' , data); 

    } catch (error) {
        console.log('Error pidiendo datos', error);       
    }
}

addTasks();