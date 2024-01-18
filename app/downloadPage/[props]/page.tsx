import YoutubeManager from "@/app/util/YoutubeManager";
import {redirect} from "next/navigation";
import MP3Manager, {songBinary} from "@/app/util/MP3Manager";
import DownloadToClient from "@/app/downloadPage/[props]/DownloadToClient";

export default async function downloadPage({params} : {params : any})
{
    const split = params.props.split('_split_');
    const id = split[0];
    const link = split[1];
    const mp3 : songBinary | null = await MP3Manager.convertMP3TWO(id);

    if(!mp3)
        return(
            <p>error, could not download video</p>
        )

    return(
        <div id={'content'}>
            <p>downloading file [{mp3.title}.webm]...</p>
            <DownloadToClient mp3={mp3.base64} title={mp3.title} redirect={link}/>
        </div>
    )

    //redirect('/');
}