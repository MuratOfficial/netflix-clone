import axios from "axios";
import { useCallback, useState } from "react";

import Input from "../components/InputFixed";
import {signIn} from 'next-auth/react';
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';



const Auth = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(()=> {
        setVariant((currentVariant)=>currentVariant==="login"?"register":"login")
    }, []);

    const login = useCallback(async()=>{
        try {
            await signIn('credentials', {
email, password, redirect: false, callbackUrl: '/profile'
            });
        } catch(error) {
            console.log(error)
        }
        
    }, [email, password])

    const register = useCallback(async () => {
        try {
await axios.post('/api/register', {
    email,
    name,
    password,
});
login();
        } catch(error) {
            console.log(error)
        }
    }, [email, name, password, login])



return (
    <div className="relative h-full w-full bg-[url(/images/hero.jpg)]  bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black h-full w-full lg:bg-opacity-50" >
            <nav className="px-12 py-5">
                <img src="/images/logo.png" alt="logo" className="h-12" />
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-16 py-16 mt-2 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-white text-4xl mb-8 text-semibold">{variant==="login"?"Sign In":"Register"}</h2>
                    <div className="flex flex-col gap-4">
                        {variant==="register" && (<Input onChange={(e: any)=>setName(e.target.value)} id="username" label="Username" value={name}/>
                        )}
                        
                        <Input onChange={(e: any)=>setEmail(e.target.value)} id="email" label="Email" value={email} type="email"/>
                        <Input onChange={(e: any)=>setPassword(e.target.value)} id="password" label="Password" value={password} type="password"/>
                    </div>
                    <button onClick={variant==='register'?register:login} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">{variant==="register"?"Sign up":"Login"}</button>
                    <div className="flex flex-row items-center mt-9 gap-4 justify-center">
                        <div onClick={()=>{
                            signIn('google', {callbackUrl:'/profile'})
                        }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FcGoogle size={30}/>
                        </div>
                        <div onClick={()=>{
                            signIn('github', {callbackUrl:'/profile'})
                        }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                            <FaGithub size={30}/>
                        </div>
                    </div>
                    <p className="text-neutral-500 mt-10">
                        {variant==="login"?"Already have an account?":"First time on Netflix?"}
                        
                        <span className="text-white ml-1 hover:underline cursor-pointer" onClick={toggleVariant}>{variant==="login"?"Can't login?":"Create an account"} </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
)
}

export default Auth;