import {YoutubeSong} from "@/app/util/Interfaces/Youtube/YoutubeSong";


/** Remember to go into dashboard and unrestrict / restrict api key */
export default class YoutubeManager
{
    static clientID : string | undefined = "AIzaSyC_PjPQwQeubJ0tQObVghcQG04f2TDYfps";

    static async searchByKeyword(keyword: string) : Promise<YoutubeSong | null>
    {
        if(!YoutubeManager.clientID)
            return null;

        const params : URLSearchParams = new URLSearchParams();
        params.append("part", 'snippet');
        params.append("max_results", '1');
        params.append("q", keyword);
        params.append("key", this.clientID as string);

        const result = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`, {
            method: "GET", headers: {Accept: 'application/json'}
        });

        if(!result.ok)
            return null;

        return await result.json() as YoutubeSong;
    }
}