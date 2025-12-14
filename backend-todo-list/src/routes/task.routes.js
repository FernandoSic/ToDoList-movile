
const {Router} = require('express');
const {createTask, completedTask, getTasks, detailTask} = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');


const router = Router();
router.use(auth);

router.get('/', getTasks);
router.get('/:id', detailTask);
router.post('/', createTask);
router.patch('/:id/complete', completedTask);


module.exports = router;