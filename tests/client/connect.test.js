const LeankoalaClient = require('../../src/Client')

test('Check if the client can connect', async () => {

  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo' })

  const user = client.getUser()

  expect(client.isConnected()).toBeTruthy()
  expect(client.getWakeUpToken().length).toBeGreaterThan(50)
  expect(user.id).toEqual(163)
})
