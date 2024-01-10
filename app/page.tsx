import "./globals.css"
import "./SpotifyHandler"
import "./LogInButton"
import LogInButton from "@/app/LogInButton";
import {SpotifyHandler} from "@/app/SpotifyHandler";
export default async function Home() {

  return (
   <div id={"content"}>
       <div className={"flex justify-center"}>
           <h1 className={"p-1"}>See Your </h1>
           <h1 className={"p-1 text-spotify"}> Spotify </h1>
           <h1 className={"p-1"}> Stats</h1>
       </div>
       <br/>
       <br/>
       <div className={"flex justify-center"}>
            <LogInButton />
       </div>
   </div>
  )
}
