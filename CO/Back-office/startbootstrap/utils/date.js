//visualizar data
function formatDate(value) {
    const date = new Date(value)
    return date.toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

function parseDate(value) {
    const date = new Date(value)
    return `${date.getFullYear()}-${date.getMonth()+ 1}-${date.getDate()}`
}
