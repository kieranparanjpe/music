import StatButton from "@/app/stats/StatButton";
import "../globals.css";
export default function Stats()
{
    return(
        <div id={"content"} className={"xl:block xl:mx-auto xl:text-center flex justify-center items-center"} style={{height: "30rem"}}>
            <div className={"h-full mr-2 xl:mr-0 xl:mt-2"} style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}>
                <h2>View Song Stats</h2>
                <p>view your most played songs for: </p>
                <StatButton location={"./stats/songs/short_term"} text={"the last 30 days"}/>
                <br/>
                <StatButton location={"./stats/songs/medium_term"} text={"the last 6 months"}/>
                <br/>
                <StatButton location={"./stats/songs/long_term"} text={"all time"}/>
            </div>
            <div className={"h-full xl:ml-0 xl:mt-2"} style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}>
                <h2>View Artist Stats</h2>
                <p>view your most listened to artists for: </p>
                <StatButton location={"./stats/artists/short_term"} text={"the last 30 days"}/>
                <br/>
                <StatButton location={"./stats/artists/medium_term"} text={"the last 6 months"}/>
                <br/>
                <StatButton location={"./stats/artists/long_term"} text={"all time"}/>
            </div>
            <div className={"h-full xl:h-fit items-center ml-2 xl:ml-0 xl:mt-2"} style={{borderRadius: "20px", borderWidth: "2px", padding: "1rem", borderColor: "var(--foreground-rgb)"}}>
                <h2>View Genre Stats</h2>
                <StatButton location={"./stats/genres/all"} text={"See your top genres"}/>
                <br/>
            </div>
        </div>
    )
}