let auxiliarDeLlamada = false;
let parametroFunction = null;


// Creo la funcion
function soyUnMockBasico(param){
    auxiliarDeLlamada = true;
    parametroFunction = param;
}

// Llamada o ejecucion de la function
soyUnMockBasico("Soy un parametro basico.");

console.log(auxiliarDeLlamada); //false
console.log(parametroFunction); // "Soy un parametro basico."