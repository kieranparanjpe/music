import {SpotifyPlaylists} from "@/app/util/Interfaces/Spotify/SpotifyPlaylists";
import SpotifyManager from "@/app/util/SpotifyManager";
import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import PlaylistItem from "@/app/downloadsongs/PlaylistItem";

export default async function DownloadSongs(){

    const session = await auth();

    if(!session)
        redirect("/");

    const playlists : SpotifyPlaylists = await SpotifyManager.getPlaylists(session.accessToken);

    if(!playlists)
    {
        return (
            <div>
                <p>Something went wrong. Could not get your playlists : (</p>
            </div>
        )
    }

    return (
        <div id="content">
            <h1>Your Playlists:</h1>
            <br/>
            <div className={"grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 align-middle gap-5"}>
                {playlists.items.map((playlist, index) => {
                    return <PlaylistItem key={index} playlist={playlist}/>
                })
                }
            </div>

        </div>
    )




 }