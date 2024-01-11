import {SpotifyHandler} from "@/app/util/SpotifyHandler";
import {useSearchParams} from "next/navigation";
import GetUrlParams from "@/app/homepage/GetUrlParams";
import ShowUserDetails from "@/app/homepage/ShowUserDetails";


export default async function homepage()
{
    return (
        <div>
            <ShowUserDetails/>

        </div>
    )
}