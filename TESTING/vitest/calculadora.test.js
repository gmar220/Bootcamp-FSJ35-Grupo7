import { describe, expect, it } from "vitest";
import { restar, sumar, Adulto } from "./calculadora";

//Crear un test
describe("Test de la funcion sumar",() => {

    // Preparar el caso para este test
    it('sumar dos numeros positivos de forma correcta', () => {

    //3 fases del test

    //1. Preparar -> definir los datos que necesitamos para param 
    const num1 = 4;
    const num2 = 7;
    
    //2. Actuar -> ejecutar la funcion con los datos que preparamos
    const resultado = sumar(num1,num2);

    //3. Afirmar -> verificar el resultado si es lo que esperamos 

    expect(resultado).toBe(11);
    })
})

describe("vamos a testear la calculadora de nuevo",()=> {
    //Creamos los casos para testear 

    it("restar dos numeros enteros y positivos de forma correcta",() => {
        // 1era fase de test -> Preparar los datos 
        
        const num1 = 21;
        const num2 = 8;

        // 2da fase de teste ->Actuar, ejecutar la función

       const resultado = restar(num1,num2)

       // 3ra fase de test -> Afirmar
        expect(resultado).toBe(13);

    })
})

describe("Test de la funcion Adulto", () => {

    // Creamos el caso para testear el escenario principal
    it("debe verificar que un numero mayor a 18 devuelva 'es mayor de edad'", () => {
        
        // 1. Preparar -> definir los datos que necesitamos para el parámetro
        const edadAValidar = 25;

        // 2. Actuar -> ejecutar la función con los datos que preparamos
        const resultado = Adulto(edadAValidar);

        // 3. Afirmar -> verificar el resultado si es lo que esperamos
        expect(resultado).toBe("es mayor de edad");
    });
});