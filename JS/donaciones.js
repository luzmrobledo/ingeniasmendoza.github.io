let dbDonantes  = [
    {
        "nombre": "Dana Aibar",
        "email": "danaaibar021@gmail.com",
        "numero": "3516959200",
        "montoDonar":"700000",
        "mensaje": "Buenos dias"
    }
]

let db = JSON.parse(dbDonantes) //array parseado a JS

let nombreIngresado = prompt('Ingrese por favor su nombre');
let emailIngresado = prompt('Ingrese por favor su email');
let passwordIngresado = prompt('Ingrese su numero');
let montoIngresado = prompt('Ingrese el monto a donar');
let mensajeIngresado = prompt('Ingrese un mensaje por favor');


//validacion de ingreso
do{
    nombreIngresado = prompt('Ingrese por favor su nombre');
    emailIngresado = prompt('Ingrese por favor su email');
    passwordIngresado = prompt('Ingrese su numero');
    montoIngresado = prompt('Ingrese el monto a donar');
    mensajeIngresado = prompt('Ingrese un mensaje por favor');

}while(nombreIngresado === null && emailIngresado === null && numeroIngresado === null && montoIngresado === null && mensajeIngresado === null);

console.log(nombreIngresado, emailIngresado, numeroIngresado, montoIngresado ,mensajeIngresado);

let nombreDelDonante;
let donante;
let donanteEncontrado = false;

if(nombreIngresado !== null && numeroIngresado !== null && emailIngresado !== null){  
    for(let i=0; i< db.length ; i++){
        if(db[i].email === emailIngresado){
            if(db[i].numero === numeroIngresado){
                nombreDelDonante = db[i].nombre;
                donanteEncontrado = true;
                donante = {
                    nombre: db[i].nombre,
                    email: db[i].email,
                    numero: db[i].numero,
                }
            } else {
                alert(`El donante no se ha registrado`)
            }
        }
    }
    if(donanteEncontrado === false){
        const donantePorGuardar =  {
            nombre: nombreIngresado,
            email: emailIngresado,
            numero: numeroIngresado
        }
        db.push(donantePorGuardar); //agregamos objetos al array
        donante = donantePorGuardar;
        nombreDelDonante = nombreIngresado;
    }
    sessionStorage.setItem('donante', nombreDelDonante);
    sessionStorage.setItem('datosDelDonante', JSON.stringify(donante));
    alert(`Bienvenid@ ${sessionStorage.getItem('donante')} a nuestro sitio web`);
} else{
    alert(`Bienvenid@ gracias por visitar nuestro sitio web`);
}
console.log(db)
console.log(JSON.parse(sessionStorage.getItem('datosDelDonante')))

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const listaDonaciones = document.getElementById('donaciones-lista');

    function leerDatos() {
        let datos = localStorage.getItem('donaciones');
        return datos ? JSON.parse(datos) : { donaciones: [] };
    }

    function guardarDatos(datos) {
        localStorage.setItem('donaciones', JSON.stringify(datos));
    }

    function agregarElemento(donacion) {
        let datos = leerDatos();
        datos.donaciones.push(donacion);
        guardarDatos(datos);
    }

    function mostrarDatos() {
        let datos = leerDatos();
        listaDonaciones.innerHTML = '';
        datos.donaciones.forEach(donacion => {
            let item = document.createElement('div');
            item.textContent = `Nombre: ${donacion.name}, Email: ${donacion.email}, Número: ${donacion.phone}, Monto: ${donacion.amount}, Mensaje: ${donacion.message}`;
            listaDonaciones.appendChild(item);
        });
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (form.checkValidity()) {
            let donacion = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                amount: form.amount.value,
                message: form.message.value
            };
            agregarElemento(donacion);
            mostrarDatos();
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('success-message').classList.remove('hidden');
        } else {
            form.reportValidity();
        }
    });
    // Mostrar datos al cargar la página
    mostrarDatos();
});
