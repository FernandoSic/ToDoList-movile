const {Router} = require('express');
const auth = require('../middlewares/auth.middleware');
const { getTaskTypes, creatreTaskType } = require('../controllers/taskType.controller');

const router = Router();
router.use(auth);
router.get('/', getTaskTypes);
router.post('/', creatreTaskType);

module.exports = router;