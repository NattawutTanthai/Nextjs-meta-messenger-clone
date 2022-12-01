"use client";
import { signOut } from "next-auth/react"
function LogoutButton() {
  return (
    <>
      <button
        // onClick={() => {console.log("sign out")}}
        onClick={() => signOut()}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        sign out
      </button>
    </>
  );
}

export default LogoutButton;
