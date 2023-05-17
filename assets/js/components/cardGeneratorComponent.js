import swapi from "../API/swapi.js"
// import cardComponent from "./cardComponent.js"
import CharacterCard from "../class/CharacterCard.js"

const generatorCards = document.querySelectorAll('[data-card-generator] .card__body')

const toListOfHtmlCharacterCard = (data, color) => data.map(
    item => {
        try { return new CharacterCard({ ...item, color }).html() }
        catch (error) { console.log(error) }
        return ""
    }
)


const getPeople = ({ currentTarget }) => {
    const element = currentTarget.parentElement
    const { color, loaded, loading, range } = element.dataset

    if (Number(loading) || Number(loaded)) return;
    element.dataset.loading = 1

    const [start, end, _] = range.split(',').map(Number)
    const promises =
        Array.from({ length: end - start + 1 }, (_, i) => swapi(i + start))
    Promise.all(promises)
        .then(data =>
            element.insertAdjacentHTML('afterend', toListOfHtmlCharacterCard(data, color).join("")))
        .then(() => {
            element.dataset.loaded = 1
            element.dataset.loading = 0
        })
}

export default () =>
    generatorCards.forEach(card => card.addEventListener('mouseenter', getPeople))
