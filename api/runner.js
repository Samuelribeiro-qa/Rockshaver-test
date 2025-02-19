const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjZlY2YyOTU3LTQ4YjAtNGQ4My1hMjRjLWFlZmIzZjljN2VkMC0xNzM5OTk3MjcxODc5IiwiZXhwIjo0MTAyNDQ0ODAwMDAwLCJ2ZXIiOiIwIiwic2VzIjoiOTkwNTUxZjYtNDNlNy00NTRhLTgwYzktNjVkY2IyZWRhZDczIiwidHlwZSI6InQifQ.pSUv2RtGzsf2L-7HGJyJBebbGYvY6RCJiQU5silq8MA'

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