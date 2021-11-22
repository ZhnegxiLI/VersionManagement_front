import moment from 'moment'
const DateFormat = function (value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm:ss')
      }
}

export default DateFormat