import Pusher from "pusher"
import ClientPusher from "pusher-js"

export const serverPusher = new Pusher({
    appId: "1516643",
    key: "499a1b858b8d6aaa1de6",
    secret: "803108335b7e5dde9cb5",
    cluster: "ap1",
    useTLS: true
})

export const clientPusher = new ClientPusher("499a1b858b8d6aaa1de6", {
    cluster: "ap1"
})