import swapi from "../API/swapi.js"
import CharacterCard from "../class/CharacterCard.js"

const getPeople = function* (card_generator) {
    const { color, range } = card_generator.dataset

    const [start, end, _] = range.split(',').map(Number)
    for (let i = start; i <= end; i++) {
        card_generator.dataset.state = "loading"
        yield swapi(i)
            .then(data => {
                try {
                    card_generator.parentElement.insertAdjacentHTML(
                        'beforeend',
                        new CharacterCard({ ...data, color }).html()
                    )
                }
                catch (error) { console.log(error) }
                card_generator.dataset.state = ""
            })
    }
    card_generator.dataset.state = "completed"
}

export default () =>
    document
        .querySelectorAll('.card[data-card-generator]')
        .forEach(card => {
            const generator = getPeople(card)
            card.querySelector(".card__body")
                .addEventListener(
                    'mouseenter',
                    () => !card.dataset.state && generator.next()
                )
        })
