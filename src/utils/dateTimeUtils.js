const beautifyDatetime = (date) => {
  let _date = new Date(date)
  return _date.toDateString() + " " + _date.getHours() + ':' + _date.getMinutes()
}

export default {
  beautifyDatetime
}