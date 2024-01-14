import {getServerSession, Session} from "next-auth";
import {redirect} from "next/navigation";
import {auth} from "@/app/util/auth";
import Spotify from "next-auth/providers/spotify";
import SpotifyManager from "@/app/util/SpotifyManager";
import {getBiggestImage} from "@/app/util/Interfaces/SpotifyProfile";
import LogInButton from "@/app/components/LogInButton";

export default async function ShowUserDetails()
{
    const session : Session | null = await auth();

    if(!session)
        redirect("/");

    const profile = await SpotifyManager.getProfile(session.accessToken);

    return(
        <div>
            <div className={"sm-d-normal sm:mx-auto sm:text-center flex justify-items-start items-center"}>
                <div className={"aspect-square h-40 sm:h-60 sm:mx-auto sm:text-center"}>
                    <div className={"rounded-full p-1 w-full h-full "} style={{borderRadius: "30%", backgroundColor: "var(--foreground-rgb)"}}>
                        <img className={"w-full h-full"} style={{borderRadius: "30%"}} src={getBiggestImage(profile.images).url}></img>
                    </div>
                </div>
                <h1 className={"p-4 sm:mx-auto sm:text-center"}>Hey, {profile.display_name}</h1>
                <div className={"flex-grow h-full flex justify-end items-center sm:justify-center"}>
                    <LogInButton scale={"1.5rem"}/>
                </div>
            </div>
        </div>
    )
}