import "./globals.css"
import "./util/SpotifyHandler"
import "./components/LogInButton"
import LogInButton from "@/app/components/LogInButton";

export default async function Home() {

  return (
   <div id={"content"}>
       <div className={"flex justify-center sm:inline"}>
           <h1 className={"p-1 text-center sm:text-4xl"}>See Your </h1>
           <div className={"flex justify-center"}>
               <h1 className={"p-1 text-spotify sm:text-4xl"}> Spotify </h1>
               <h1 className={"p-1 sm:text-4xl"}> Stats</h1>
            </div>
       </div>
       <br/>
       <br/>
       <div className={"flex justify-center"}>
            <LogInButton scale={"inherit"}/>
       </div>
       <br/>
       <br/>
       <div className={"flex justify-center"}>
           <p>please note that spotify restricts this app to verified users only.</p>
       </div>
       <div className={"flex justify-center"}>
        <p>email kieranbellum@gmail.com with subject line STATSAPP to be added</p>
       </div>

   </div>
  )
}
