const id = '67b48c95000e72866fee'

// First 4 bytes contain timestamp
const timestamp = parseInt(id.substring(0, 8), 16)

// Convert to Date
const date = new Date(timestamp * 1000)

console.log(date)
