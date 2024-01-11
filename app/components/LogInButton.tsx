'use client'
// @ts-ignore
import {SpotifyHandler} from "@/app/util/SpotifyHandler";
import {signIn, useSession, signOut} from "next-auth/react";

export default function LogInButton()
{
    const {data : session} = useSession();

    async function handleLogIn(){
         //await SpotifyHandler.spotifySignIn();
        await signIn('spotify', {callbackUrl: '/homepage'});
    }
    async function handleSignOut(){
        //await SpotifyHandler.spotifySignIn();
        await signOut();
    }

    if(session)
    {
       // location.href='../homepage';
        return(
            <button onClick={handleSignOut}
                    className={"bg-spotify border-black dark:border-white border-2 rounded-full p-2.5"}>Sign Out</button>
        )
    }

    return(
        <button onClick={handleLogIn}
                className={"bg-spotify border-black dark:border-white border-2 rounded-full p-2.5"}>Link your Spotify now</button>
    )
}