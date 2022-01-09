import 'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js'
const ANIMATION_DURATION = 150

export default class Anagram {
  constructor (element, options) {
    this.element = element

    this.options = Object.assign({
      animation: ANIMATION_DURATION
    }, options)
  }

  start () {
    this.sortable = new Sortable(this.element, this.options)
  }

  async demo ({ delay = 500, animation = 500, pause = 2000 } = {}) {
    const randomDemo = this.demos[random(this.demos.length - 1)]

    await wait(delay)
    this.sortable.option('animation', animation)
    this.sortable.sort(randomDemo, true)

    await wait(pause)
    this.sortable.sort(randomDemo.sort(), true)
    this.sortable.option('animation', ANIMATION_DURATION)

    window.sessionStorage.setItem('demoed', true)
  }

  get demos () {
    return [
      ['01', '02', '00', '09', '05', '07', '08', '12', '03', '11', '06', '04', '10'], // do_this_merci
      ['03', '02', '08', '09', '00', '05', '10', '01', '12', '06', '07', '04', '11'], // most_hid_rice,
      ['08', '10', '06', '00', '03', '02', '12', '07', '09', '04', '05', '11', '01'], // sir_mo_itched
    ]
  }

  get shouldDemo () {
    const demoed = JSON.parse(window.sessionStorage.getItem('demoed'))
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const permitsMotion = mediaQuery && !mediaQuery.matches
    return !demoed && permitsMotion
  }
}

function wait (ms) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), ms)
  })
}

function random (max) {
  return Math.round(Math.random() * max)
}
