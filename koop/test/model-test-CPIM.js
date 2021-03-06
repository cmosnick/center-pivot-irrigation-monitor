/*
  model-test.js

  This file is optional, but is strongly recommended. It tests the `getData` function to ensure its translating
  correctly.
*/

const test = require('tape')
const Model = require('../model')
const model = new Model()
const nock = require('nock')

test('should properly fetch from the API and translate features', t => {
  nock('http://marut764.esri.com')
  .get('/hacka/CPIM-input.json')
  .reply(200, require('./fixtures/CPIM-input.json'))

  model.getData({}, (err, json) => {
    t.error(err)
    t.equal(json.type, 'FeatureCollection', 'creates a feature collection object')
    t.ok(json.features, 'has features')
    const feature = json.features[0]
    t.equal(feature.type, 'Feature', 'has proper type')
    t.equal(feature.geometry.type, 'Point', 'creates point geometry')
    t.ok(feature.properties, 'creates attributes')
    t.end()
  })
})
