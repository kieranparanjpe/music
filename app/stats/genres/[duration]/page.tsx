import {auth} from "@/app/util/auth";
import {redirect} from "next/navigation";
import SpotifyManager from "@/app/util/SpotifyManager";
import {SpotifyTopSongs} from "@/app/util/Interfaces/SpotifyTopSongs";
import TopSongItem from "@/app/stats/songs/[duration]/TopSongItem";
import {SpotifyTopArtists} from "@/app/util/Interfaces/SpotifyTopArtists";
import TopArtistItem from "@/app/stats/artists/[duration]/TopArtistItem";
import {Item, SpotifyPlaylists} from "@/app/util/Interfaces/SpotifyPlaylists";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
import TopGenreItem from "@/app/stats/genres/[duration]/TopGenreItem";
import {Image} from "@/app/util/Interfaces/SpotifyArtist";

export interface genreItem{
    occurrences:number
    img: Image
}

export default async function SongStats({params} : {params : any})
{
    const duration = params.duration;

    const session = await auth();

    if(!session)
        redirect("/");

    const playlists : SpotifyPlaylists = await SpotifyManager.getPlaylists(session.accessToken);

    let genreDictionary : Map<string, genreItem> = new Map<string, genreItem>();
    let artists : string[][] = [];

    for(let i = 0; i < playlists.items.length; i++)
    {
        await getTracks(playlists.items[i]);
    }
    for(let i = 0; i < artists.length; i++)
    {
        await getGenres(artists[i]);
    }
   // await getTracks();
    async function getTracks(value : Item) {
        if(!session)
            return;
        const items = await SpotifyManager.getPlaylistItems(session.accessToken, value.tracks.href);
        items.items.map((value) => {
            value.track.artists.map((value) => {
                const href = value.id;
                //  console.log(href);
                if (artists.length == 0) {
                    artists.push([href]);
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
    async function getGenres(value: string[]) {
        if(!session)
            return;
        const artists = await SpotifyManager.getArtists(session.accessToken, value.join(','));
        artists.artists.map((value) => {
            let img = getBiggestImage(value.images);
            value.genres.map((value) => {
                let get = genreDictionary.get(value);
                if (get) {
                    let rand = Math.random() * 10;
                    let newImage : boolean = (img.width==img.height && get.img.width!=get.img.height)
                        || (rand < 4 && img.width==img.height);
                    let genre : genreItem = {occurrences: get.occurrences+1,
                        img: newImage ? img : get.img};
                    genreDictionary.set(value, genre);
                } else {
                    let genre : genreItem = {occurrences: 1, img: img};
                    genreDictionary.set(value, genre);
                }
            })
        });
    }

    let genreArray = Array.from(genreDictionary.entries());

// Sort the array based on keys (or values if needed)
    genreArray.sort((a, b) => -a[1].occurrences + b[1].occurrences);
    genreArray = genreArray.slice(0, 50);

    if(!genreDictionary)
        return (
            <div id={"content"}>
                <h1>Could not get top genres</h1>
            </div>
        )

    return (
        <div id={"content"}>
            <h1>Your top genres right now: </h1>
            {genreArray.map((value,index)=>{
                return <TopGenreItem key={index} genre={value} index={index+1}/>
            })}
        </div>
    )
}