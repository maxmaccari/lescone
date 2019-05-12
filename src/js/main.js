
class StatusScheduler {
  constructor (element, schedule, { openClass, closedClass }) {
    this.element = element || document.getElementsByClassName('status')
    this.openClass = openClass || 'status--open'
    this.closedClass = closedClass || 'status--closed'
    this.schedule = schedule ||
      { openFrom: 0, openUntil: 7, openAt: 8, closeAt: 18 }
  }

  setOpen () {
    if (this.element.classList.contains(this.openClass)) return

    this.element.classList.remove(this.closedClass)
    this.element.classList.add(this.openClass)
    this.element.setAttribute('title', 'Open')
  }

  setClosed () {
    if (this.element.classList.contains(this.closedClass)) return

    this.element.classList.remove(this.openClass)
    this.element.classList.add(this.closedClass)
    this.element.setAttribute('title', 'Closed')
  }

  isOnSchedule () {
    const currentDate = new Date()
    const currentWeekday = currentDate.getDay()
    const currentHour = currentDate.getHours()

    const inOpenDays = currentWeekday >= this.schedule.openFrom &&
      currentWeekday <= this.schedule.openUntil
    const inOpenHours = currentHour >= this.schedule.openAt &&
      currentHour < this.schedule.closeAt

    return inOpenDays && inOpenHours
  }

  updateStatus () {
    if (this.isOnSchedule()) {
      this.setOpen()
    } else {
      this.setClosed()
    }
  }

  start () {
    if (this.interval) return

    this.interval = window.setInterval(() => {
      this.updateStatus()
    }, 1000);
  }

  stop () {
    if (!this.interval) return

    window.clearInterval(this.interval)
  }
}

const scheduleStatus = () => {
  const introStatusHook = 'js-intro__status'
  const introStatusEl = document.getElementsByClassName(introStatusHook)[0]
  const schedule = {
    openFrom: 1, // Monday
    openUntil: 7, // Saturday
    openAt: 7,
    closeAt: 18
  }
  const scheduler = new StatusScheduler(introStatusEl, schedule, {
    openClass: 'intro__status--open',
    closedClass: 'intro__status--closed'
  })

  scheduler.start()
}

document.addEventListener("DOMContentLoaded", scheduleStatus)
