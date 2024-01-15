'use client'

import {TopSong} from "@/app/util/Interfaces/SpotifyTopSongs";
import { motion } from "framer-motion"
import SpotifyManager from "@/app/util/SpotifyManager";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
export default function TopSongItem({key, song, index} : {key: number, song : TopSong, index: number})
{
    const topSong : TopSong = song;
    return(
        <div>
            <motion.div className="flex items-center justify-items-start max-w-full" style={{marginTop: "10px",borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}
                        initial={{ translateY: "90%", opacity: "0%"}} whileInView={{ translateY: "0%", opacity: "100%"}} transition={{ease: "linear", duration: 0.4}}>
                <h2 style={{paddingInline: "1vw", flex: "0.5"}}>#{index}</h2>
                <div style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} className={"aspect-square sm:h-16 h-20 p-0.5"}>
                    <img style={{borderRadius: "10%"}} alt={"album cover"} src={getBiggestImage(topSong.album.images).url}></img>
                </div>
                <div className={"w-max flex items-center justify-items-start sm:inline"} style={{flex: "6", paddingInline: "0.5rem"}}>
                    <h3 className={"font-bold sm:pl-1 pr-1"} style={{flex: "2"}}>{topSong.name}</h3>
                    <p className={"sm:pl-1"} style={{flex: "2"}}>{SpotifyManager.namesToString(topSong.artists)}</p>
                    <p className={"sm:pl-1 pl-1"} style={{flex: "2"}}>{topSong.album.name}</p>
                </div>
             </motion.div>
        </div>
    )
}