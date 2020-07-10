# KoalityEngine JavaScript Client

The library is used to communicate with the KoalityEngine. 

Please contact `api@koalityengine.com` if you want to use the API.

## Examples
This example returns a list of projects the user `demo` is part of.
```javascript
const LeankoalaClient = require('../src/Client');

(async () => {
    const client = new LeankoalaClient('stage')
    await client.connect({ username: 'demo', password: 'demo' })

    const user = client.getUser()

    const projects = await client.getRepository('project').search({ user: user.id })

    console.log('Projects:', projects)
})()

```
More examples can be found in the `examples` directory.
