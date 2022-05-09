const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios')
const axiosAdapter = require('axios/lib/adapters/http');

test('Check if the can reconnect via refresh token', async () => {

    const client = new LeankoalaClient('stage')
    await client.connect({username: 'demo', password: 'demo', axios})

    const refreshToken = client._connection._refreshToken
    const user = client.getUser()

    const client2 = new LeankoalaClient('stage')

    try {
        console.log(axiosAdapter)
        await client2.connect({refreshToken, axios, userId: user.id})
    } catch (e) {
        console.log(e)
    }

    const websocketRepository = await client2.getRepository('Websocket')
    const rooms = await websocketRepository.getRooms()

    expect(rooms.server).toContain('wss')
})


