import {SpotifyHandler} from "@/app/SpotifyHandler";
import {useSearchParams} from "next/navigation";
import GetUrlParams from "@/app/homepage/GetUrlParams";

export default async function homepage()
{
    return (
        <div>
            <GetUrlParams/>
        </div>
    )
}