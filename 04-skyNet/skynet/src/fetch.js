/** not original file */

//By default, wait a year before returning a value.
const DELAY = 100

export function fetch() {
  // a Fake fetch implemantation that doesn't return anything for a minute
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve({
        status: 200,
        data: 'example data',
      })
    }, DELAY)
  })
}