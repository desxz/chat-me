const express = require('express');
const router = express.Router();
const passwordGoogle = require('../auth/google');

router.get('/google', passwordGoogle.authenticate(
    'google',
    {
        scope: ['profile']
    }
));

router.get('/google/callback', passwordGoogle.authenticate(
    'google',
    {
        failureRedirect: '/'
    }),
    (req,res) => {
        res.redirect('/chat');
    });

module.exports = router;