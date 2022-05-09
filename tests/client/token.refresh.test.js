const LeankoalaClient = require('../../src/360ApiClient')
const moxios = require('moxios')
const axios = require('axios')

/**
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-20
 */
describe('Refresh', () => {
  beforeEach(function () {
    moxios.install()
  })

  afterEach(function () {
    moxios.uninstall()
  })

  /**
   * Check if the refresh method is called after a new system was created. This
   * is important as the system creation can change the users access rights.
   *
   * This test dows not create an actual system. Axios is mocked.
   */
  it('Check if token refresh is called', async () => {
    const client = new LeankoalaClient('stage')

    moxios.wait(() => {
      const connectRequest = moxios.requests.at(0)
      connectRequest.respondWith({
        status: 200,
        response: {
          status: 'success', data:
            {
              token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3MiOnsicHJvamVjdC5jcmVhdGUiOnt9fSwiY3VycmVudF90aW1lc3RhbXAiOjE1OTUyNzIzOTMsInVzZXJfaWQiOjE2MywiZXhwIjozMDAwMDAwMDAzLCJ0dGwiOjkwMH0.MPfR1BZTqXdcWVNSzO4WacXjsL8L-A-naJTX_2FYOeA',
              refresh_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3MiOnsidG9rZW4ucmVmcmVzaCI6eyJ1c2VyIjpbMTYzXX19LCJjdXJyZW50X3RpbWVzdGFtcCI6MTU5NTI3MjM5MywidXNlcl9pZCI6MTYzLCJleHAiOjE1OTUzNTg3OTMsInR0bCI6ODY0MDB9.58ZmoPYm9TN66XEfwEStqDkD8Rhab7IoL_x6t8HrksY',
              user: { id: 163, username: 'demo', first_name: null, last_name: null }
            }
        }
      })
    })

    moxios.wait(() => {
      const createSystemRequest = moxios.requests.at(1)
      createSystemRequest.respondWith({
        status: 200,
        response: { status: 'success', data: { system: { id: 0 } } }
      })
    })

    moxios.wait(() => {
      const refreshAccessRequest = moxios.requests.at(2)
      refreshAccessRequest.respondWith({
        status: 200,
        response: { status: 'failure', message: 'Refresh method was called' }
      })
    })

    await client.connect({ username: 'demo', password: 'demo', axios })

    const systemRepository = await client.getRepository('system')

    try {
      const system = await systemRepository.createSystem({
        owner: 1,
        base_url: 'https://www.leankoala.com',
        name: 'Shop1',
        system_type: 1
      })
    } catch (e) {
      expect(e.message).toContain('Refresh method was called')
    }
  })
})
