"use client";
import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const {data : messages , error , mutate} = useSWR("/api/getMessages" , fetcher)

  console.log("data==>",messages)

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const messageToSend = input;
    setInput("");
    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      create_at: Date.now(),
      username: "Nattawut R.",
      profilePic:
        "https://scontent.fbkk5-3.fna.fbcdn.net/v/t39.30808-1/272676320_2057505227749308_1230060122491160452_n.jpg?stp=dst-jpg_p160x160&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=Qn3P0MzWVZcAX-HEjnE&_nc_ht=scontent.fbkk5-3.fna&oh=00_AfB5_dETHG1cICtNODAXjFIEb0M4FDXJY2k8o896c0ye1A&oe=638C7262",
      email: "erictyth@gmail.com",
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
