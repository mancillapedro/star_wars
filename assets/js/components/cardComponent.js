export default ({
    title,
    text,
    color
}) =>
    `
    <div class="card card--${color}">
        <div class="card__body">
            <div>
                <div class="card__title">
                    <h3>${title}</h3>
                </div>
                <p class="card__text">
                    ${text}
                </p>
            </div>
        </div>
    </div>
    `