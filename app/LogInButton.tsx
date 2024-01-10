'use client'
// @ts-ignore
import {SpotifyHandler} from "@/app/SpotifyHandler";

export default function LogInButton()
{
    async function handleLogIn(){
         await SpotifyHandler.spotifySignIn();
    }

    return(
        <button onClick={handleLogIn}
                className={"bg-spotify border-black dark:border-white border-2 rounded-full p-2.5"}>Link your Spotify now</button>
    )
}