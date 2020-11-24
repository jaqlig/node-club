var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index', { user: req.user });
// });

router.get('/', postController.all_posts);


router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.post('/signup', userController.new_user_post);

router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', userController.user_login_post);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/create', (req, res) => {
  res.render('create', { user: req.user });
});
router.post('/create', postController.message_post);

module.exports = router;
