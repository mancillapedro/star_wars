export default ({
    name,
    height,
    mass,
    color
}) =>
    `
    <div class="card card--${color}">
        <div class="card__body">
            <div>
                <div class="card__title">
                    <h3>${name}</h3>
                </div>
                <p class="card__text">
                    ${height && mass ? `Altura: ${height}cm. Peso: ${mass}kg.` : 'No hay datos'}
                </p>
            </div>
        </div>
    </div>
    `