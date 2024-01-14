'use client'

import {TopSong} from "@/app/util/Interfaces/SpotifyTopSongs";
import { motion } from "framer-motion"
import SpotifyManager from "@/app/util/SpotifyManager";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
import {TopArtist} from "@/app/util/Interfaces/SpotifyTopArtists";
export default function TopArtistItem({key, artist, index})
{
    const topArtist : TopArtist = artist;
    return(
        <div>
            <motion.div className="flex items-center justify-items-start max-w-full" style={{marginTop: "10px",borderRadius: "20px", borderWidth: "2px", padding: "1rem"}}
                        initial={{ translateY: "90%", opacity: "0%"}} whileInView={{ translateY: "0%", opacity: "100%"}} transition={{ease: "linear", duration: 0.4}}>
                <h2 style={{paddingInline: "1vw", flex: "0.5"}}>#{index}</h2>
                <div className={"aspect-square h-20 p-0.5 sm:h-16"} style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}}>
                    <img style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} alt={"album cover"} src={getBiggestImage(topArtist.images).url}></img>
                </div>
                <div className={"w-max flex items-center justify-items-start sm:inline"} style={{flex: "6", paddingInline: "0.5rem"}}>
                    <h2 className={"font-bold sm:pl-1 pr-1"} style={{flex: "2"}}>{topArtist.name}</h2>
                    <p className={"sm:w-0 sm:overflow-clip sm:h-0"} style={{flex: "4"}}>{topArtist.genres.join(', ')}</p>
                </div>

             </motion.div>
        </div>
    )
}