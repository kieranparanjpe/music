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
            <motion.div className="flex items-center justify-items-start" style={{marginTop: "10px" ,maxWidth: "60vw",borderRadius: "20px", borderWidth: "2px", padding: "1rem"}}
                        initial={{ translateY: "100%" }} whileInView={{ translateY: "0%"}} transition={{ease: "linear", duration: 0.4}}>
                <h2 style={{paddingInline: "1vw", flex: "0.5"}}>#{index}</h2>
                <div style={{flex: "0.75"}}>
                    <img alt={"album cover"} src={getBiggestImage(topArtist.images).url}></img>
                </div>
                <h3 style={{paddingInline: "1vw", flex: "2"}}>{topArtist.name}</h3>
                <p style={{paddingInline: "2vw", flex: "4"}}>{topArtist.genres.join(', ')}</p>
             </motion.div>
        </div>
    )
}