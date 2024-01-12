'use client'

import {TopSong} from "@/app/util/Interfaces/SpotifyTopSongs";
import { motion } from "framer-motion"
import SpotifyManager from "@/app/util/SpotifyManager";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
export default function TopSongItem({key, song, index})
{
    const topSong : TopSong = song;
    return(
        <div>
            <motion.div className="flex items-center justify-items-start" style={{marginTop: "10px" ,maxWidth: "60vw",borderRadius: "20px", borderWidth: "2px", padding: "1rem"}}
                        initial={{ translateY: "100%" }} whileInView={{ translateY: "0%"}} transition={{ease: "linear", duration: 0.4}}>
                <h2 style={{paddingInline: "1vw", flex: "0.5"}}>#{index}</h2>
                <div style={{flex: "0.75"}}>
                    <img alt={"album cover"} src={getBiggestImage(topSong.album.images).url}></img>
                </div>
                <h3 style={{paddingInline: "1vw", flex: "2"}}>{topSong.name}</h3>
                <p style={{paddingInline: "2vw", flex: "2"}}>{SpotifyManager.namesToString(topSong.artists)}</p>
                <p style={{paddingInline: "2vw", flex: "2"}}>{topSong.album.name}</p>
             </motion.div>
        </div>
    )
}