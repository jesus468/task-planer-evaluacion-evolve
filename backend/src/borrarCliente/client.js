

const aja = async ()=>{
    try {
        const response = await fetch('http://localhost:3000/api/tasks/');
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.log('Error pidiendo datos', error);
        
    }finally{
        console.log('pidiendo datos termino');
    }
}


aja();