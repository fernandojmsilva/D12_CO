//visualizar data
function formatDate(value) {
    const date = new Date(value)
    return date.toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}
//submeter datas para o servidor
function parseDate(value) {
    const date = new Date(value)
    return `${date.getFullYear()}-${date.getMonth()+ 1}-${date.getDate()}`
}
