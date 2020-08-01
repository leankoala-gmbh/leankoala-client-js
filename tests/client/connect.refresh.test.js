const LeankoalaClient = require('../../src/Client')
const axios = require('axios')

test('Check if the can reconnect via refresh token', async () => {

  const client = new LeankoalaClient('stage')
  await client.connect({ username: 'demo', password: 'demo', axios })

  const refreshToken = client._connection._refreshToken
  const user = client.getUser()

  const client2 = new LeankoalaClient('stage')

  await client2.connect({ refreshToken, axios, userId: user.id })

  const websocketRepository = await client2.getRepository('Websocket')
  const rooms = await websocketRepository.getRooms()

  expect(rooms.server).toContain('wss')
})

