var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');
var projectsController = require('../controllers/projectsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/projects')
  .get(projectsController.projectsIndex)
  .post(projectsController.projectsCreate)

router.route('/projects/:id')
  .get(projectsController.projectsShow)
  .patch(projectsController.projectsUpdate)
  .delete(projectsController.projectsDelete)

module.exports = router;
