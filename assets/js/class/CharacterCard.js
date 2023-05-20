import Character from "./Character.js";

export default class CharacterCard extends Character {
    #color

    constructor({ name, height, mass, color }) {
        if (!name || !height || !mass || !color) throw (
            'Error en constructor de CharacterCard // Faltan parámetros'
        );
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
                        <div class="card__text">
                            <span>
                                Altura: ${this.height}cm.
                            </span>
                            <span>
                                Peso: ${this.mass == "unknown" ? "desconocido" : this.mass + "kg"}.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            `
        )
    }

}
