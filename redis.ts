import Redis from "ioredis"

// const redis = new Redis("rediss://default:681017bb1b4e485881bc1b9ff13841af@apn1-supreme-snake-33041.upstash.io:33041")
const redis = new Redis(process.env.REDIS_URL!)
export default redis;