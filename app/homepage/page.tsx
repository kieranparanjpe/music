import {useSearchParams} from "next/navigation";
import ShowUserDetails from "@/app/homepage/ShowUserDetails";
import "../globals.css";
import ShowCurrentSong from "@/app/homepage/ShowCurrentSong";


export default async function homepage()
{
    console.log("homepage render");
    return (
        <div id={"content"}>
            <ShowUserDetails/>
            <br/>
            <br/>
            <ShowCurrentSong/>
        </div>
    )
}