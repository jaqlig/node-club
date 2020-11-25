var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')

// home
router.get('/', postController.all_posts);

// sign up
router.get('/signup', function (req, res, next) {
  res.render('signup');
});
router.post('/signup', userController.new_user_post);

// log in
router.get('/login', function (req, res, next) {
  res.render('login');
});
router.post('/login', userController.user_login_post);

// logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// create new message
router.get('/create', (req, res) => {
  res.render('create', { user: req.user });
});
router.post('/create', postController.message_post);

// change account type
router.get('/account', (req, res) => {
  res.render('account', { user: req.user });
});
router.post('/account', userController.account_type_post);

// message remove
router.get('/remove/:id', (req, res) => {
  res.render('remove', { id:req.params.id, user:req.user });
});
router.post('/remove/:id', postController.remove_message_post);

module.exports = router;
