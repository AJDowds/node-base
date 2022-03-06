import { Router } from "express"
const bcrypt = require("bcrypt")
const router = Router()
import { v4 as uuidv4 } from "uuid"

router.post("/login", async (req, res) => {
  req.context.models.User.findOne({
    where: { email: req.body.email },
    include: [
      { all: true },
      {
        association: "chats",
        include: [
          {
            association: "messages",
            include: { association: "sender", attributes: ["username"] },
          },
          { association: "users" },
        ],
      },
    ],
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result === true) {
        let auth_key = uuidv4()
        user.update({
          auth_key: auth_key,
        })
        res.json({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          token: user.auth_key,
          profile_picture: user.profile_picture,
          friends: user.friends,
          friend_requests: user.friendRequestees,
          chats: user.chats,
        })
      } else {
        console.log("fail")
        res.send("username or password incorrect")
      }
    })
  })
})

router.post("/register", async (req, res) => {
  console.log("!!REGISTER!!", req.body)

  await req.context.models.User.createUnique(req.body)
})

router.get("/test", (req, res) => {
  console.log("!!TEST!!", req.body)
  return "hello"
})

export default router
