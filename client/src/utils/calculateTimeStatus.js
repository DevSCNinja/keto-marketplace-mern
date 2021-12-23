function calculateTimeStatus(order) {
  const orderDate = new Date(order.date)
  const currentDate = new Date()
  const dueDays = (currentDate - orderDate) / 86400000
  const status = order.status
  if (status === 'opened') {
    if (dueDays < 1) {
      return 'Good'
    } else if (dueDays < 2) {
      return 'Pending'
    } else {
      return 'Overdue'
    }
  } else if (status === 'infulfillment') {
    if (dueDays < 3) {
      return 'Good'
    } else if (dueDays < 5) {
      return 'Pending'
    } else {
      return 'Overdue'
    }
  }
}

export default calculateTimeStatus
