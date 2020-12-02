# node-club

### Message board made with Node.js

It supports account creating, hashes passwords with bcrypt and disallows guests to see the author of a message.

There are 3 account types:
* `User`- cannot post messages and doesn't see the message's author (same as guest without an account)
* `Member`- can post and sees authors
* `Admin`- same as `member` but can also remove messages

`User`is default, you can change your account type with the secret codes:
* `ch4ng3_t0_us3r` changes account back to `user`
* `ch4ng3_t0_m3mb3r` to `member`
* `ch4ng3_t0_1337` to`admin`
