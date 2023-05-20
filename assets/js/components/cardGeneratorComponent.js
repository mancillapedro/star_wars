import swapi from "../API/swapi.js"
import CharacterCard from "../class/CharacterCard.js"

const onFulfilled = ({ data, color, card_generator, is_last }) => {
    const { name, height, mass } = data
    try {
        card_generator.parentElement
            .insertAdjacentHTML(
                'beforeend',
                new CharacterCard({ name, height, mass, color }).html()
            )
    }
    catch (error) { console.log(error) }
    finally { card_generator.dataset.state = is_last ? "completed" : "" }
}

function* getPeople(card_generator) {
    const
        { color, range } = card_generator.dataset,
        [start, end, _] = range.split(',').map(Number)

    for (let i = start; i <= end; i++) yield (
        (card_generator.dataset.state = "loading")
        &&
        swapi(i).then(
            data => onFulfilled({ data, color, card_generator, is_last: i == end })
        )
    )
}

export default () =>
    document
        .querySelectorAll('.card[data-card-generator]')
        .forEach(
            card => {
                const
                    generator = getPeople(card),
                    cardBody = card.querySelector(".card__body"),
                    listener = () => !card.dataset.state && generator.next()

                cardBody.addEventListener('mouseenter', listener)
                cardBody.addEventListener("click", listener)
            }
        )
