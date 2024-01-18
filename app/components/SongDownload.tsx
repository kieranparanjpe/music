'use client'

import {Song} from "@/app/util/Interfaces/Spotify/SpotifyTopSongs";
import YoutubeManager from "@/app/util/YoutubeManager";
import {redirect} from "next/navigation";
import {red} from "next/dist/lib/picocolors";

export default function SongDownload({song} : {song : Song}){

    async function downloadSong()
    {
        const name = song.name.replaceAll(' ', ' ');
        const artist = song.artists[0].name.replaceAll(' ', ' ');
        const youtubeResult = await YoutubeManager.searchByKeyword(name + " " + artist + " audio");
        if(!youtubeResult)
            return;
        const id : string = youtubeResult.items[0].id.videoId;
        //const id = "ovnUBDSFvNw";

        //if(!youtubeResult)
          //  return;
        //redirect('downloadPage/229gdKbKcaI|abcd');

        window.location = (`/downloadPage/${id}_split_${window.location.pathname.replaceAll('/', '~')}`) as string & Location;
      //  await YoutubeManager.convertMP3TWO(youtubeResult.items[0].id.videoId);
    }

    return (
        <button className={"bg-spotify border-black dark:border-white border-2 rounded-full p-2.5"} onClick={downloadSong}>
            Download song
        </button>
    )
}