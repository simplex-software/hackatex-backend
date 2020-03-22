module.exports = {
  formatTime(date) {
    const dateObj = new Date(date);
    const hours = `0${dateObj.getHours()}`.slice(-2);
    const minutes =  `0${dateObj.getMinutes()}`.slice(-2);
    const seconds = `0${dateObj.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  },

  formatDate(date) {
    const dateObj = new Date(date);
    const month =  `0${dateObj.getMonth() + 1}`.slice(-2);
    const day = `0${dateObj.getDate()}`.slice(-2);
    return `${dateObj.getFullYear()}-${month}-${day}`;
  },

  formatDateTime(date) {
    return this.formatDate(date) + ' ' + this.formatTime(date);  
  }
}