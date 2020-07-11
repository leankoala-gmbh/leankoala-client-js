const LeankoalaClient = require('../src/Client')

test('Check if the can reconnect via wake up token', async () => {

  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo' })

  const wakeUpToken = client.getWakeUpToken()

  const client2 = new LeankoalaClient('stage')
  await client2.connect({ wakeUpToken })

  const websocketRepository = await client2.getRepository('Websocket')
  const rooms = await websocketRepository.getRooms()

  expect(rooms.server).toContain('wss')
})
