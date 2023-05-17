export default class Character {
    #name;
    #height;
    #mass;

    constructor({ name, height, mass }) {
        this.#name = name
        this.#height = height
        this.#mass = mass
    }

    get name() { return this.#name }
    get height() { return this.#height }
    get mass() { return this.#mass }

}