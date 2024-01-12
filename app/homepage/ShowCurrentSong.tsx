'use client'

import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyCurrentlyPlaying} from "@/app/util/Interfaces/SpotifyCurrentlyPlaying";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
import LogInButton from "@/app/components/LogInButton";

export default function ShowCurrentSong()
{
    const {data : session} = useSession();
    const [accessToken, setAccessToken] : [string, any] = useState('');
    const [currentSong, setSong]  : [null | SpotifyCurrentlyPlaying, any] = useState(null);

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
            {(!currentSong || !currentSong.is_playing) ? <h2>You are not listening to anything right now</h2> :
            <div >
                <h2>You are currently listening to: </h2>
                <br/>
                <div className={"flex justify-items-start items-center"} style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem"}}>
                    <div className={"aspect-square h-32"}>
                        <div className={"rounded-full p-0.5 w-full h-full "} style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}}>
                            <img className={"w-full h-full"} style={{borderRadius: "10%"}} src={getBiggestImage(currentSong.item.album.images).url}></img>
                        </div>
                    </div>
                    <h2 className={"p-10"}>{currentSong.item.name} by {SpotifyManager.namesToString(currentSong.item.artists)} on {currentSong.item.album.name}</h2>
                </div>
            </div>
            }
        </div>
    )
}