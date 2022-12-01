// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from '../../pusher';
import redis from "../../redis"
import { Message } from '../../typings';

type Data = {
    message: Message;
}
type ErrorData = {
    body: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== "POST") {
        res.status(405).json({ body: "Method not allowed" });
        return;
    }

    const { message } = req.body;

    const newMessage = {
        ...message,
        // Replace the timestamp of the user to the timestamp of the server
        create_at: Date.now(),
    };

    // push to upstash redis DB
    await redis.hset('messages', message.id, JSON.stringify(newMessage));
    serverPusher.trigger('messages', 'new-message' , newMessage)
    res.status(200).json({ message: newMessage })
}
