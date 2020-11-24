const Post = require('../models/post');
const validator = require('express-validator');

// post new message
exports.message_post = [
    // Field validation
    validator.body('title').trim(),
    validator.body('message', 'message name must not be empty').trim().isLength({ min: 1 }),

    // Sanitize fields
    validator.sanitizeBody('title').escape(),
    validator.sanitizeBody('message').escape(),

    (req, res, next) => {

        const errors = validator.validationResult(req);

        if (!errors.isEmpty()) {
            res.render('create', {
                title: req.body.title,
                message: req.message.last_name,
            });
            return;
        }

        else {
            const post = new Post({
                title: req.body.title,
                message: req.body.message,
                timestamp: new Date(),
                author: req.user
            }).save(err => {
                if (err) return next(err);
                res.redirect("/");
            });
        }
    }
];

// display all messages
exports.all_posts = function (req, res, next) {
    
    Post.find()
    .exec(function (err, allPosts) {
        if (err) {
            const err = new Error('Error while fetching posts');
            err.status = 404;
            return next(err);
        }
        if (allPosts == null) {
            const err = new Error('Posts not found');
            err.status = 404;
            return next(err);
        }
        if (req.user){
        res.render('index', { user: req.user, posts_list: allPosts });
        } else {
            res.render('index', { posts_list: allPosts });
        }
    });    
}