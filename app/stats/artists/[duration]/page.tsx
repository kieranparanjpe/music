import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyTopSongs} from "@/app/util/Interfaces/SpotifyTopSongs";
import TopSongItem from "@/app/stats/songs/[duration]/TopSongItem";
import {SpotifyTopArtists} from "@/app/util/Interfaces/SpotifyTopArtists";
import TopArtistItem from "@/app/stats/artists/[duration]/TopArtistItem";

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
    const topArtists : SpotifyTopArtists = await SpotifyManager.getTopArtists(session.accessToken, duration);


    if(!session)
        redirect("/");
    if(!topArtists)
        return (
            <div id={"content"}>
                <h1>Could not get top artists of {durationNice}</h1>
            </div>
        )

    return (
        <div id={"content"}>
            <h1>Your top artists of {durationNice}:</h1>
            {topArtists.items.map((value, index)=>{
                return <TopArtistItem key={index} artist={value} index={index + 1}/>
            })}
        </div>
    )
}