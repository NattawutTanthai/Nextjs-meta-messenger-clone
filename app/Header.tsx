import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

function Header() {
    const session = true

    if (session) {
        return(
            <header className="sticky top-0 z-50 bg-white flex justify-between item-center p-10 shadow-sm">
                <div className="flex space-x-2 ">
                <Image 
                    className="rounded-full mx-2 object-contain"
                    src="https://links.papareact.com/jne"
                    height={10}
                    width={50}
                    alt="Profile Picture"
                />
                    <div>
                        <p className="text-blue-400">Logged in as : </p>
                        <p className="font-bold text-lg">Nattawut R.</p>
                    </div>
                 </div>
                 <LogoutButton/>
            </header>
        );
    }else{
        return (
            <header className="sticky top-0 z-50 bg-white flex justify-center item-center p-10 shadow-sm">
              <div className="flex flex-col items-center space-y-5">
                <div className="flex space-x-2 items-center">
                  <Image
                    src="https://links.papareact.com/jne"
                    alt="Logo"
                    height={10}
                    width={50}
                  />
                  <p className="text-blue-400">Welcome to Meta Messenger</p>
                </div>
                <Link href="/auth/signin" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">sign in</Link>
              </div>
            </header>
          );
    }
}

export default Header;
