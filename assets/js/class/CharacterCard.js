import Character from "./Character.js";

export default class CharacterCard extends Character {
    #color

    static paramsValidator({ name, height, mass, color }) {
        if (!name || !height || !mass || !color)
            throw 'Error en constructor de CharacterCard // Faltan parámetros';
        return true
    }

    constructor({ name, height, mass, color }) {
        CharacterCard.paramsValidator({ name, height, mass, color })
        super({ name, height, mass })
        this.#color = color
    }

    html() {
        return (
            `
            <div class="card card--${this.#color}">
                <div class="card__body">
                    <div>
                        <div class="card__title">
                            <h3>${this.name}</h3>
                        </div>
                        <p class="card__text">
                            Altura: ${this.height}cm. Peso: ${this.mass}kg.
                        </p>
                    </div>
                </div>
            </div>
            `
        )
    }

}
