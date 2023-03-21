const rp = require('request-promise');
const exoticfruit = require('./exoticfruits.json')
const {map, compose, sortBy, prop} = require('ramda') 
const uri = 'http://localhost:3000'

const shuffle = compose(
  map(prop('v')),
  sortBy(prop('i')),
  map(v => ({v, i: Math.random()}))
)

const giveFruitBowl = () => {
  const shuffled = shuffle(exoticfruit)
  Promise.all([
    rp({method: 'post', json: true, body: {name: shuffled[0]}, uri}),
    rp({method: 'post', json: true, body: {name: shuffled[1]}, uri}),
    rp({method: 'post', json: true, body: {name: shuffled[2]}, uri}),
  ])
    .then(console.log)
    .catch(console.error)
} 

setInterval(giveFruitBowl, 1000 * 2)

giveFruitBowl()

