const User = require('../models/user');
const validator = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Create new user
exports.new_user_post = [

    // Field validation
    validator.body('first_name', 'first name must not be empty').trim().isLength({ min: 1 }),
    validator.body('last_name', 'last name must not be empty').trim().isLength({ min: 1 }),
    validator.body('username', 'username must not be empty').trim().isLength({ min: 1 }),
    validator.body('password').exists().isLength({ min: 5 }),
    validator.body('passwordConfirmation').exists()
        .custom((value, { req }) => value === req.body.password),

    // Sanitize fields
    validator.sanitizeBody('first_name').escape(),
    validator.sanitizeBody('last_name').escape(),
    validator.sanitizeBody('username').escape(),

    (req, res, next) => {

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            res.render('signup', {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                account_type: req.body.account_type,
                errMsg: 'Correct typed data',
                errors: errors.array()
            });
            return;
        }

        else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) return next(err);

                const user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    account_type: 0,
                    password: hashedPassword
                }).save(err => {
                    if (err) return next(err);
                    res.redirect("/");
                });
            });
        }
    }
];


// Log in
exports.user_login_post = (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        
    })(req,res);
  };
