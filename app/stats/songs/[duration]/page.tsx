import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyTopSongs} from "@/app/util/Interfaces/SpotifyTopSongs";
import TopSongItem from "@/app/stats/songs/[duration]/TopSongItem";

export default async function SongStats({params} : {params : any})
{
    const duration = params.duration;
    let durationNice = '';
    if(duration == "short_term")
        durationNice = "the last 30 days"
    else if(duration == "medium_term")
        durationNice = "the last 6 months"
    else if(duration == "long_term")
        durationNice = "all time"

    const session = await auth();
    if(!session)
        redirect("/");

    const topSongs : SpotifyTopSongs = await SpotifyManager.getTopSongs(session.accessToken, duration);

    if(!topSongs)
        return (
            <div id={"content"}>
                <h1>Could not get top songs of {durationNice}</h1>
            </div>
        )

    return (
        <div id={"content"}>
            <h1>Your top songs of {durationNice}:</h1>
            {topSongs.items.map((value, index)=>{
                return <TopSongItem key={index} song={value} index={index + 1}/>
            })}
        </div>
    )
}