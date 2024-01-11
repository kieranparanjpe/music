import "./globals.css"
import "./util/SpotifyHandler"
import "./components/LogInButton"
import LogInButton from "@/app/components/LogInButton";
import {SpotifyHandler} from "@/app/util/SpotifyHandler";
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
