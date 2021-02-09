const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    saveArtist,
    deleteArtist,
    login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveArtist);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/artists/:artistId').delete(authMiddleware, deleteArtist);

module.exports = router;
