
const {Router} = require('express');
const {createTask, completedTask, getTasks, detailTask, deleteTask} = require('../controllers/task.controller');
const auth = require('../middlewares/auth.middleware');


const router = Router();
router.use(auth);

router.get('/', getTasks);
router.get('/:id', detailTask);
router.post('/', createTask);
router.patch('/:id/complete', completedTask);
router.delete('/:id', deleteTask);


module.exports = router;