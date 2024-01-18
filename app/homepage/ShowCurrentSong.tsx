'use client'

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyCurrentlyPlaying} from "@/app/util/Interfaces/Spotify/SpotifyCurrentlyPlaying";
import {getBiggestImage} from "@/app/util/Interfaces/Spotify/SpotifyProfile";
import LogInButton from "@/app/components/LogInButton";
import SongDownload from "@/app/components/SongDownload";

export default function ShowCurrentSong()
{
    const {data : session} = useSession();
    const [accessToken, setAccessToken] : [string, any] = useState('');
    const [currentSong, setSong]  : any = useState(null);

    useEffect(()=>{
        const interval = setInterval(() => {
            updateSong();
        }, 10000);

        updateSong();
        async function updateSong()
        {
            if(session && session.accessToken)
            {
                setAccessToken(session.accessToken);
                setSong(await SpotifyManager.getCurrentSong(session.accessToken));
            }
        }
        return () => clearInterval(interval);

    }, [session]);


    return(
        <div>
            {(!currentSong) ? <h2>Could not get your current songs</h2> :
                !currentSong.is_playing ? <h2>You are not listening to anything right now</h2> :
            <div >
                <h2>You are currently listening to: </h2>
                <br/>
                <div className={"sm:block flex justify-items-start items-center"} style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}>
                    <div className={"aspect-square h-32 sm:h-40 sm:mx-auto sm:text-center"}>
                        <div className={"p-0.5 w-full h-full "} style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}}>
                            <img className={"w-full h-full"} style={{borderRadius: "10%"}} src={getBiggestImage(currentSong.item.album.images).url}></img>
                        </div>
                    </div>
                    <h2 className={"p-10 sm:p-1 sm:mx-auto sm:text-center"}>{currentSong.item.name} by {SpotifyManager.namesToString(currentSong.item.artists)} on {currentSong.item.album.name}</h2>
                    <SongDownload song={currentSong.item}/>
                </div>
            </div>
            }
        </div>
    )
}