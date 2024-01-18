'use client'

import {Song} from "@/app/util/Interfaces/Spotify/SpotifyTopSongs";
import { motion } from "framer-motion"
import SpotifyManager from "@/app/util/SpotifyManager";
import {getBiggestImage} from "@/app/util/Interfaces/Spotify/SpotifyProfile";
import {TopArtist} from "@/app/util/Interfaces/Spotify/SpotifyTopArtists";
import {genreItem} from "@/app/stats/genres/[duration]/page";
// @ts-ignore
export default function TopGenreItem({key, genre, index} : {key: number, genre : any, index: number})
{
    const topGenre : genreItem = genre[1];
    return(
        <div>
            <motion.div className="flex items-center justify-items-start max-w-full" style={{marginTop: "10px",borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}
                        initial={{ translateX: "8%", opacity: "0%"}} whileInView={{ translateX: "0%", opacity: "100%"}} transition={{ease: "linear", duration: 0.4}}>
                <h2 style={{paddingInline: "1vw"}}>#{index}</h2>
                <div style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} className={"aspect-square h-20 p-0.5 sm:h-16"}>
                    <img className={"w-full h-full"} style={{borderRadius: "10%", backgroundColor: "var(--foreground-rgb)"}} alt={"album cover"} src={topGenre.img.url}></img>
                </div>
                <h2 style={{paddingInline: "1vw"}}>{genre[0].substring(0, 1).toUpperCase() +  genre[0].substring(1)}</h2>
             </motion.div>
        </div>
    )
}