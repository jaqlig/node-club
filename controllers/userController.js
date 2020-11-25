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

        // Reload with data if error
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

        // Save to db
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

    })(req, res);
};

// Change account type
exports.account_type_post = [

    validator.body('key').trim().isLength({ min: 1 }),
    validator.sanitizeBody('key').escape(),

    (req, res, next) => {
        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) res.render('account', { msg: "Error in secret code." });

        else {
            User.findById(req.user.id).exec(
                function (err) {
                    if (err) return next(err);

                    let account_match;
                    if (req.body.key === 'ch4ng3_t0_us3r') account_match = 0;
                    else if (req.body.key === 'ch4ng3_t0_m3mb3r') account_match = 1;
                    else if (req.body.key === 'ch4ng3_t0_1337') account_match = 2;
                    else {
                        res.render('account', { msg: "This is not a valid code." });
                        return;
                    }

                    const user = new User({
                        first_name: req.user.first_name,
                        last_name: req.user.last_name,
                        username: req.user.username,
                        password: req.user.password,
                        account_type: account_match,
                        _id: req.user.id
                    });

                    User.findByIdAndUpdate(req.user.id, user, {}, function (err) {
                        if (err) return next(err);
                        res.redirect('/');
                    });

                }
            );
        }
    }
];