"use client";
import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import { unstable_getServerSession } from 'next-auth/next'
type Props = {
  session : Awaited<ReturnType<typeof unstable_getServerSession>>
}

function ChatInput({session}:Props) {
  const [input, setInput] = useState("");
  const {data : messages , error , mutate} = useSWR("/api/getMessages" , fetcher)


  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const messageToSend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      create_at: Date.now(),
      username: session?.user?.name! ,
      profilePic:
        session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message,}),
      }).then((res) => res.json());  
      return[data.message , ...messages!]
    }; 

    await mutate(uploadMessageToUpstash, {
      optimisticData : [message , ...messages!],
      rollbackOnError : true ,
    })
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex bottom-0 z-50 w-full fixed px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
    >
      <input
        type="text"
        placeholder="Enter message here..."
        value={input}
        disabled={!session}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        className="
        flex-1 rounded border border-gray-300 focus:outline-none
        focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3
        disabled:opacity-50 disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded 
        disabled:opacity-50 disabled:cursor-not-allowed"
      >
        send
      </button>
    </form>
  );
}

export default ChatInput;
