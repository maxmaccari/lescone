const introStatusHook = 'js-intro__status'
const schedule = {
  openFrom: 1, // Monday
  openUntil: 7, // Saturday
  openAt: 8,
  closeAt: 18
}

const setOpen = element => {
  if (element.classList.contains('intro__status--open')) return;

  element.classList.remove('intro__status--closed')
  element.classList.add('intro__status--open')
  element.setAttribute('title', 'Open')
}

const setClosed = element => {
  if (element.classList.contains('intro__status--closed')) return;

  element.classList.remove('intro__status--open')
  element.classList.add('intro__status--closed')
  element.setAttribute('title', 'Closed')
}

const isOnSchedule = () => {
  const currentDate = new Date()
  const currentWeekday = currentDate.getDay()
  const currentHour = currentDate.getHours()

  const inOpenDays = currentWeekday >= schedule.openFrom &&
    currentWeekday <= schedule.openUntil
  const inOpenHours = currentHour >= schedule.openAt &&
    currentHour < schedule.closeAt

  return inOpenDays && inOpenHours
}

const checkStatus = element => {
  if (isOnSchedule()) {
    setOpen(element)
  } else {
    setClosed(element)
  }
}

const scheduleOpenStatus = () => {
  const introStatusEl = document.getElementsByClassName(introStatusHook)[0]

  window.setInterval(function(){
    checkStatus(introStatusEl)
  }, 1000);

}

document.addEventListener("DOMContentLoaded", scheduleOpenStatus);
