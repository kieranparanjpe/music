'use client'
import {Playlist, SpotifyPlaylists} from "@/app/util/Interfaces/Spotify/SpotifyPlaylists";
import {getBiggestImage} from "@/app/util/Interfaces/Spotify/SpotifyProfile";
import {motion} from 'framer-motion';
import Link from "next/link";

export default function PlaylistItem({playlist} : {playlist : Playlist})
{
    return(
        <motion.div className={"aspect-square max-h-full"}
                    style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}
                    initial={{opacity: "0%"}} whileInView={{opacity: "100%"}} transition={{ease: "linear", duration: 0.4}}>
            <Link href={{pathname: `downloadsongs/${playlist.id}_split1_${playlist.name}_split1_${playlist.tracks.total}`}}>
                <div style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} className={"aspect-square h-2/3 p-0.5"}>
                    <img className={"w-full h-full"} style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} alt={"playlist cover"} src={getBiggestImage(playlist.images).url}></img>
                </div>
                <h2 className={"flex-wrap sm:text-lg text-2xl"} style={{overflowWrap: "break-word"}}>{playlist.name}</h2>
            </Link>
        </motion.div>
    )
}