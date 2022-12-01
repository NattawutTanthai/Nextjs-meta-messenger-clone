import { getProviders , signIn } from "next-auth/react"
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
    const providers = await getProviders();
  return (
    <div className="grid justify-center">
        <div>
            <Image
                className='rounded-full mx-2 object-cover'
                alt="Profile Picture"
                width={700}
                height={700}
                src="https:/links.papareact.com/161"
            />   
        </div>

        <SignInComponent providers={providers} />
    </div>
  )
}

export default SignInPage