const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZlY2YyOTU3LTQ4YjAtNGQ4My1hMjRjLWFlZmIzZjljN2VkMC0xNzM5OTk3ODQ4NzM5IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMjNkYWUxOTItOGU1Yi00ZWNjLTk1MWItZjRhMmNjMmVmNjU2IiwidHlwZSI6InQifQ.Dc64wQ_5Fs6VxKTgV3kLijIZUwiDTMSkZ5Yi_aoiKFA'

cypress.run({
  // specs to run here
  browser: 'chrome'
})
.then((results) => {
  const args = {
    target: TOKEN,
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})