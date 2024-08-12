//Importación módulo de 3ros
const {format} = require ('date-fns');
const fechaDeNacimiento = new Date();
const fechaFormato = format(fechaDeNacimiento, 'yyyy/MM/dd');

//simulamos la bbdd de JSON en JS
let dbVoluntarios  = [
    {
        "nombre": "Dana Aibar",
        "email": "danaaibar021@gmail.com",
        "fechaDeNacimiento": "00/00/00",
        "numero": "3516959200",
        "mensaje": "Buenos dias"
    }
]
/*dbUsuarios = JSON.stringify(dbVoluntarios)*/
let db = JSON.parse(dbVoluntarios) //array parseado a JS

let nombreIngresado = prompt('Ingrese por favor su nombre');
let fechaIngresada = prompt ('Ingrese su fecha de nacimiento')
let emailIngresado = prompt('Ingrese por favor su email');
let passwordIngresado = prompt('Ingrese su numero');
let mensajeIngresado = prompt('Ingrese un mensaje por favor');

//validacion de ingreso
do{
    nombreIngresado = prompt('Ingrese por favor su nombre');
    fechaIngresada = prompt ('Ingrese su fecha de nacimiento')
    emailIngresado = prompt('Ingrese por favor su email');
    passwordIngresado = prompt('Ingrese su numero');
    mensajeIngresado = prompt('Ingrese un mensaje por favor');

}while(nombreIngresado === null && fechaIngresada === null && emailIngresado === null && numeroIngresado === null && mensajeIngresado === null);

console.log(nombreIngresado, fechaIngresada, emailIngresado, numeroIngresado, mensajeIngresado);

let nombreDelVoluntario;
let voluntario;
let voluntarioEncontrado = false;

//ESTO NO ME SIRVE PARA EL PROYECTO YA QUE NO HAY LOGIN
if(nombreIngresado !== null && numeroIngresado !== null && emailIngresado !== null){  
    for(let i=0; i< db.length ; i++){
        if(db[i].email === emailIngresado){
            if(db[i].numero === numeroIngresado){
                nombreDelVoluntario = db[i].nombre;
                voluntarioEncontrado = true;
                voluntario = {
                    nombre: db[i].nombre,
                    email: db[i].email,
                    numero: db[i].numero,
                }
            } else {
                alert(`Voluntario no registrado`)
            }
        }
    }
    if(voluntarioEncontrado === false){
        const voluntarioPorGuardar =  {
            nombre: nombreIngresado,
            email: emailIngresado,
            numero: numeroIngresado
        }
        db.push(voluntarioPorGuardar); //agregamos objetos al array
        voluntario = voluntarioPorGuardar;
        nombreDelVoluntario = nombreIngresado;
    }
    sessionStorage.setItem('voluntario', nombreDelVoluntario);
    sessionStorage.setItem('datosDelVoluntario', JSON.stringify(voluntario));
    alert(`Bienvenid@ ${sessionStorage.getItem('voluntario')} a nuestro sitio web`);
} else{
    alert(`Bienvenid@ gracias por visitar nuestro sitio web`);
}
console.log(db)
console.log(JSON.parse(sessionStorage.getItem('datosDelVoluntario')))

//Creamos las funciones y eventos para cargar y mostrar datos
//de los voluntarios
document.addEventListener('DOMContentLoaded', function(){

    const form = document.getElementById('contact-form');
    const listaVoluntarios = document.getElementById('voluntarios-lista');

    function leerDatos(){
        let datos = localStorage.getItem('voluntarios');
        return datos ? JSON.parse(datos): {voluntarios: []};
    }

    function guardarDatos(datos){
        localStorage.setItem('voluntarios', JSON.stringify(datos));
    }

    function agregarElemento(voluntario){
        let datos = leerDatos();
        datos.voluntarios.push(voluntario);
        guardarDatos(datos);
    }

    function mostrarDatos(){
        let datos = leerDatos();
        listaVoluntarios.innerHTML = '';
        
        datos.voluntarios.forEach(voluntario =>{
            let item = document.createElement('div');
            item.textContent = 'Nombre: ${voluntario.name}, Email: ${voluntario.email}, Numero: ${voluntario.phone}, Mensaje: ${voluntario.message}';
            listaVoluntarios.appendChild(item);
            
        });
    }

    form.addEventListener('submit', function(event){
        event.preventDefault();
        if(form.checkValidity()){
            let voluntario = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            agregarElemento(voluntario);
            mostrarDatos();

            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        }else{
            form.reportValidity();
        }
    });
    //Mostrar los datos al cargar la pagina
    mostrarDatos();
});


