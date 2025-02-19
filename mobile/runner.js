const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZlY2YyOTU3LTQ4YjAtNGQ4My1hMjRjLWFlZmIzZjljN2VkMC0xNzM5OTk3NzA3MTI1IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiMzY4NWUyOTctODE3NC00YzBmLTkzMDAtYjA3YjJkYTQ1MjYyIiwidHlwZSI6InQifQ.DNELew5woy30Wu3sw71ueDgXg_kOVdNBx6PDg6w8abA'

cypress.run({
  // specs to run here
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