const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios')

test('Check if the client can connect', async () => {

  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo', axios })

  const user = client.getUser()

  expect(client.isConnected()).toBeTruthy()
  expect(client.getWakeUpToken().length).toBeGreaterThan(50)
  expect(user.id).toEqual(163)
})
