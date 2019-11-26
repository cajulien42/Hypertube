# API

**BASIC ROUTES**
```
      ROUTES                    |         CREDENTIALS          |    DESCRIPTION 
                                |                              |
POST  /users                    |                              | Create new user in db
      /movies                   |                              | Create new movie in db

GET   /users                    |                              | GET user list
      /users/:username          |                              | GET target user profile
      /movies                   |                              | GET movie list
      /movie/:title             |                              | GET target movie informations

PUT   /users/:username          |                              | UPDATE target user profile
      /movie/:title             |                              | UPDATE target movie informations

DEL   /users/:username          |         ADMIN                | DELETE target user profile
      /movie/:title             |         ADMIN                | DELETE target movie informations
```
                                                    
**ROUTE CREATION EXAMPLE**
```
-----------userRoute.js-------------------------

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', [OptionalMiddleWares1, OptionalMiddleWare2], ErrorWrapper(async (req, res) => {
    const result = await userlist();
    return res.status(200).json({
      success: true,
      payload: result,
    });
}));

router.get('/:username', [OptionalMiddleWare1, OptionalMiddleWare2], ErrorWrapper(async (req, res) => {
    const result = await userProfile(req.params.username);
    return res.status(200).json({
      success: true,
      payload: result,
    });
}));

/*
// more routes
*/

module.exports = router;

-------------------------------------------------

-----------index.js------------------------------


const express = require('express');
const app = express();
const userRoute = require('userRoute.js')

app.use('/api/users', userRoute);

-------------------------------------------------

```