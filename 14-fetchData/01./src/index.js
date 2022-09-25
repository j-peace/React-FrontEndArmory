import { fetch } from './fetch.js'

console.log('1. Start!')

let promise = fetch('https://frontarm.com/example')

promise.then(data => {
  console.log('3. Wait a minute! I have data now! uhull', data)
})

console.log('2. Finish!')
