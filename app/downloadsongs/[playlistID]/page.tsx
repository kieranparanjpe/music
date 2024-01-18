import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import SpotifyManager from "@/app/util/SpotifyManager";
import {Song, SpotifyTopSongs} from "@/app/util/Interfaces/Spotify/SpotifyTopSongs";
import SongItem from "@/app/components/SongItem";
import {PlaylistTrack, SpotifyPlaylistTracks} from "@/app/util/Interfaces/Spotify/SpotifyPlaylistTracks";

export default async function PlaylistItems({params} : {params : any})
{
    const split = params.playlistID.split('_split1_');
    const id = split[0];
    const name = split[1].replaceAll('%20', ' ');
    const numberTracks : number = parseInt(split[2]);
    let href = `https:/api.spotify.com/v1/playlists/${id}/tracks?limit=100`;

    const session = await auth();
    if(!session)
        redirect("/");

    let allSongs : PlaylistTrack[] = [];

    let maxTimes = Math.ceil(numberTracks / 100.0);
    for(let i = 0; i < maxTimes; i++){
        href = `https:/api.spotify.com/v1/playlists/${id}/tracks?offset=` + (i * 100);
        if(i == maxTimes - 1)
            href += '&limit=' + (numberTracks % 100);
        const songs : SpotifyPlaylistTracks = await SpotifyManager.getPlaylistItems(session.accessToken, href);
        if(songs.items)
            allSongs = allSongs.concat(songs.items);
            //songs.items.map((value)=> allSongs.push(value));
    }

    if(allSongs.length == 0) {
        return (
            <div id={"content"}>
                <h1>Could not get top songs of this playlist</h1>
            </div>
        )
    }

    return (
        <div id={"content"}>
            <h1>{name}</h1>
            <p>unfortunately support for mass playlist downloading is not supported because of youtube&apos;s search API rate limiting.</p>
            {
            allSongs.map((value, index) => {
                return <SongItem key={index} song={value.track as Song} index={index + 1}/>
            })
            }
        </div>
    )
}