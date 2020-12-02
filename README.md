# node-club

### Message board made with Node.js
####  [Live version on Heroku](https://fast-caverns-01667.herokuapp.com/)

It supports creating accounts, hashes passwords with bcrypt and disallows guests to see the author of a message.

There are 3 account types:
* `user` - cannot post messages and doesn't see the message's author (same as guest without an account)
* `member` - can post and sees authors
* `admin` - same as `member` but can also remove messages

`user` is default, you can change your account type with the secret codes:
* `ch4ng3_t0_us3r` changes account back to `user`
* `ch4ng3_t0_m3mb3r` to `member`
* `ch4ng3_t0_1337` to `admin`
