const LeankoalaClient = require('../../src/360ApiClient')
const axios = require('axios')

/**
 * @author Nils Langner (nils.langner@leankoala.com)
 * @created 2020-07-20
 */
describe('User', () => {

  /**
   * Check if the refresh method is called after a new system was created. This
   * is important as the system creation can change the users access rights.
   *
   * This test dows not create an actual system. Axios is mocked.
   */
  it('Check if a new user can be created', async () => {
    const client = new LeankoalaClient('stage')

    client.connect({
      'accessToken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3MiOnsib3duZXIiOiJrb2FsaXR5XzEiLCJ1c2VyLmNyZWF0ZSI6eyJwcm92aWRlciI6WyJrb2FsaXR5Il19fSwiZXhwIjoxOTEyNjgyNjEzfQ.JVtOza0VPIbz0J8pkuR6jMrr7iCjX_Ee-9t8udFBRoU',
      axios
    })

    const userRepo = await client.getRepository('User')

    try {
      // await userRepo.create('koality', { username: 'nils' })

      await userRepo.create('koality', {
        username: '123',
        email: 'nils.langner@leankoala.com',
        password: '123123'
        // company_id: this.form.company
      })
      this.isRegistered = true
    } catch (e) {
      expect(e.message).toContain('Username')
    }
  })
})
