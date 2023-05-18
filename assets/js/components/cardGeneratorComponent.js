import swapi from "../API/swapi.js"
import CharacterCard from "../class/CharacterCard.js"

function* getPeople(card_generator) {
    const
        { color, range } = card_generator.dataset,
        [start, end, _] = range.split(',').map(Number)

    const onFulfilled = data => {
        try {
            card_generator.parentElement
                .insertAdjacentHTML(
                    'beforeend',
                    new CharacterCard({ ...data, color }).html()
                )
        }
        catch (error) { console.log(error) }
    }

    for (let i = start; i <= end; i++) yield (
        (card_generator.dataset.state = "loading")
        &&
        swapi(i)
            .then(onFulfilled)
            .then(() => card_generator.dataset.state = i == end ? "completed" : "")
    )
}

export default () =>
    document
        .querySelectorAll('.card[data-card-generator]')
        .forEach(card => {
            const
                generator = getPeople(card),
                cardBody = card.querySelector(".card__body"),
                listener = () => !card.dataset.state && generator.next()

            cardBody.addEventListener('mouseenter', listener)
            cardBody.addEventListener("click", listener)
        })
