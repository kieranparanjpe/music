import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyTopSongs} from "@/app/util/Interfaces/SpotifyTopSongs";
import TopSongItem from "@/app/stats/songs/[duration]/TopSongItem";
import {SpotifyTopArtists} from "@/app/util/Interfaces/SpotifyTopArtists";
import TopArtistItem from "@/app/stats/artists/[duration]/TopArtistItem";
import {Item, SpotifyPlaylists} from "@/app/util/Interfaces/SpotifyPlaylists";

export default async function SongStats({params})
{
    const duration = params.duration;

    const session = await auth();

    if(!session)
        redirect("/");

    const playlists : SpotifyPlaylists = await SpotifyManager.getPlaylists(session.accessToken);

    let genreDictionary : Map<string, number> = new Map<string, number>();
    let artists : string[][] = [];


    for(let i = 0; i < playlists.items.length; i++)
    {
        await getTracks(playlists.items[i]);
    }
   // await getTracks();
    await genres();
    async function getTracks(value) {
            const items = await SpotifyManager.getPlaylistItems(session.accessToken, value.tracks.href);
            items.items.map((value) => {
                value.track.artists.map((value) => {
                    const href = value.id;
                    //  console.log(href);
                    if (artists.length == 0) {
                        artists.push([href]);
                        console.log(artists);
                    }
                    let contains = false;
                    artists.map((value) => {
                        if (value.includes(href))
                            contains = true;
                    });
                    if (!contains) {

                        if (artists[artists.length - 1].length < 50)
                            artists[artists.length - 1].push(href);

                        else
                            artists.push([href]);

                        //console.log("not contains");
                    }
                    //console.log(value);
                });
            });
    }
    async function genres() {
        artists.map((value) => {
            SpotifyManager.getArtists(session.accessToken, value.join(',')).then(
                value => {
                    value.artists.map((value) => {
                        value.genres.map((value) => {
                            //console.log(value);
                            let get = genreDictionary.get(value);
                            if (get) {
                                genreDictionary.set(value, get + 1)
                            } else {
                                genreDictionary.set(value, 1);
                            }
                            //console.log(genreDictionary.size);
                        })
                    });
                }
            );
        });
    }

    if(!genreDictionary)
        return (
            <div id={"content"}>
                <h1>Could not get top genres</h1>
            </div>
        )

    return (
        <div id={"content"}>
            <h1>Your top genres right now: </h1>
            <p>{genreDictionary.size}</p>
            {/*genreDictionary.keys().toA.map((value, index)=>{
                return <TopArtistItem key={index} artist={value} index={index + 1}/>
            })*/}
        </div>
    )
}