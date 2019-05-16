var introStatusHook = 'js-intro__status'
var schedule = {
  openFrom: 1, // Monday
  openUntil: 7, // Saturday
  openAt: 8,
  closeAt: 18
}

var setOpen = function (element) {
  if (element.classList.contains('intro__status--open')) return;

  element.classList.remove('intro__status--closed')
  element.classList.add('intro__status--open')
  element.setAttribute('title', 'Open')
}

var setClosed = function (element) {
  if (element.classList.contains('intro__status--closed')) return;

  element.classList.remove('intro__status--open')
  element.classList.add('intro__status--closed')
  element.setAttribute('title', 'Closed')
}

var isOnSchedule = function () {
  var currentDate = new Date()
  var currentWeekday = currentDate.getDay()
  var currentHour = currentDate.getHours()

  var inOpenDays = currentWeekday >= schedule.openFrom &&
    currentWeekday <= schedule.openUntil
  var inOpenHours = currentHour >= schedule.openAt &&
    currentHour < schedule.closeAt

  return inOpenDays && inOpenHours
}

var checkStatus = function (element) {
  if (isOnSchedule()) {
    setOpen(element)
  } else {
    setClosed(element)
  }
}

var scheduleOpenStatus = function () {
  var introStatusEl = document.getElementsByClassName(introStatusHook)[0]

  window.setInterval(function(){
    checkStatus(introStatusEl)
  }, 1000);

}

document.addEventListener("DOMContentLoaded", scheduleOpenStatus);
