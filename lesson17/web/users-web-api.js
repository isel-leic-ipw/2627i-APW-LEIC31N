
export default function (userServices) {
  return { createUser, tokenValidator };

  async function createUser(req, res) {
    const username = req.body?.username;

    userServices.createUser(username.trim())
    .then(user => {
      if (!user) {
        return res.status(409).json({ message: 'Username already exists' });
      }

      return res.status(201).json(user);
    })
    .catch(err => {
      return res.status(500).json({ message: err.message });
    });
  }

  function tokenValidator(req, rsp, next) {
    console.log("Dummy middleware")
    // Token is valid
    // Get the user ID
    const userId = null // TODO: Extract user ID from token using userServices.getUserIdFromToken(token)
    req.user = { userId }
    next()

  }

}


