
import {downloadVideo, getVideoMP3Base64} from 'yt-get'

export interface songBinary {
    base64: string
    title: string
}

export default class MP3Manager
{
    static async convertMP3TWO(id:string) : Promise <songBinary | null>
    {
        const url = `https://www.youtube.com/watch?v=${id}`;
        let mp3 : songBinary | null = null;

        const result : songBinary = await getVideoMP3Base64(url) as songBinary;
        if(!result) {
            console.log("result was null");
        }
        else{
            mp3 = result;
        }

        return mp3;

        /*downloadVideo(url)
            .then(() => {
                console.log("Video downloaded successfully.");
            })
            .catch((error) => {
                console.error("Error:", error);
            });*/
    }
}