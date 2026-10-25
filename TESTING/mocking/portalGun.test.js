import { describe, expect, it, vi } from "vitest";
import { abrirPortal } from "./portalGun";

describe('Testeando el abrirPortal', () => {
    //Diferentes Tests(casos) a evaluar

    it('disparar portal hacia otra dimension con energia',() => {
        //1er paso: Preparar
        const dimension = 'Pupusilandia';
        const energia = 30;
        const disparador = vi.fn().mockReturnValue(true);

        //2do paso: Actuar
        const resultado = abrirPortal(dimension,energia,disparador)

        //3er paso: Afirmar
        expect(resultado).toBe(`Portal abierto a la dimension: ${dimension}`)

    })


})