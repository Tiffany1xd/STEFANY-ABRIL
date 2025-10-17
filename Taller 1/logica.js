// ================== VARIABLES GLOBALES (inputs inventados) ==================
let edad = 61;              // Number
let cantidadJuegos = 3;     // Number
let precioJuego = 50;       // Number
let plan = "VIP";           // String

// ================== FUNCIONES (declaraciones) ==================

function mostrarSaludo() {  //Función para mostrar un saludo
    return "¡Bienvenido a la tienda de juegos!";
}

function descuentoPorEdad(edad, total) {
    // SCOPE de función: 'edad', 'total' solo existen aquí
    if (edad < 18) {  //Aquí uso un condicional simple en donde si la edad es menor a 18 aplica un descuento del 20%
        total *= 0.8; // 20% descuento
    } else if (edad >= 60) {  //Aquí uso un condicional compuesto en donde si la edad es mayor o igual a 60 aplica un descuento del 20%
        total *= 0.8;
    }
    return total;
}

function calcularTotal(cantidad, precio) {
    // BUCLE para sumar juegos (ejemplo de loop)
    let total = 0;  //defino una variable total en 0
    for (let i = 0; i < cantidad; i++) {  //recorro la cantidad de juegos y sumo el precio de cada juego al total
        total += precio;  //Aquí defino que el total es igual al total más el precio de cada juego
    }
    return total;
}

function aplicarBeneficiosPlan(plan, total) {
    // SWITCH para planes
    switch (plan) {  //Aquí uso un switch para definir los beneficios de cada plan según el plan seleccionado
        case "BASICO":
            return { total, beneficio: "Acceso normal." };  //En este case no hay descuento, solo acceso normal
        case "PREMIUM":
            total *= 0.95; // 5% descuento
            return { total, beneficio: "Descuento + acceso extendido." };  //En este case hay un descuento del 5% y acceso extendido
        case "VIP":
            total -= precioJuego; // un juego gratis
            return { total, beneficio: "Un juego gratis incluido." };  //En este case hay un juego gratis incluido
        default:
            return { total, beneficio: "Plan no válido." };  //Aquí manejo el caso por defecto si el plan no es válido
    }
}

// ================== FLUJO PRINCIPAL ==================
function main() {  //Función principal que ejecuta el flujo del programa
    console.log(mostrarSaludo());  //Con console.log muestro el saludo (output)

    let total = calcularTotal(cantidadJuegos, precioJuego);  //Calculo el total sin descuentos

    total = descuentoPorEdad(edad, total); //Se aplica el descuento según las condiciones de edad

    const { total: totalFinal, beneficio } = aplicarBeneficiosPlan(plan, total);  //Si aplica, se generan los beneficios del plan

    //Se  muestran todas las salidas
    console.log("Edad del usuario:", edad);  //Muestro la edad del usuario (input) que se definió al inicio
    console.log("Juegos comprados:", cantidadJuegos); //Muestro la cantidad de juegos comprados (input)
    console.log("Precio por juego:", precioJuego);  //Muestro el precio por juego (input)
    console.log("Plan seleccionado:", plan);  //Muestro el plan seleccionado (input)
    console.log("Total final a pagar:", totalFinal);  //Muestro el total final a pagar (output)
    console.log("Beneficio:", beneficio);  //Muestro el beneficio obtenido según el plan seleccionado (output)
}

main();  //Llamo a la función main para ejecutar el programa