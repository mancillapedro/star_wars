import swapi from "../API/swapi.js"
import CharacterCard from "../class/CharacterCard.js"

const getPeople = function* (card_generator) {
    const { color, range, state } = card_generator.dataset

    if (state) return;

    const [start, end, _] = range.split(',').map(Number)
    for (let i = start; i <= end; i++) {
        card_generator.dataset.state = "loading"
        yield swapi(i).then(data => {
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
    card_generator.dataset.state = "loaded"
}

export default () =>
    document
        .querySelectorAll('.card[data-card-generator] .card__body')
        .forEach(card_body => {
            const generator = getPeople(card_body.parentElement)
            card_body.addEventListener('mouseenter', () => generator.next())
        })
