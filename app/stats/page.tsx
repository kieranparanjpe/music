import StatButton from "@/app/stats/StatButton";

export default function Stats()
{
    return(
        <div className={"flex justify-center items-center"} style={{height: "30rem"}}>
            <div className={"h-full"} style={{borderRadius: "20px", marginRight: "10px", borderWidth: "2px", padding: "1rem"}}>
                <h2>View Song Stats</h2>
                <p>see and view your most played songs for the last: </p>
                <StatButton location={"./stats/songs/short_term"} text={"last 30 days"}/>
                <br/>
                <StatButton location={"./stats/songs/medium_term"} text={"last 6 months"}/>
                <br/>
                <StatButton location={"./stats/songs/long_term"} text={"All time"}/>
            </div>
            <div className={"h-full"} style={{marginLeft: "10px", borderRadius: "20px", borderWidth: "2px", padding: "1rem"}}>
                <h2>View Artist Stats</h2>
                <p>see and view your most listented to artists for the last: </p>
                <StatButton location={"./stats/artists/short_term"} text={"last 30 days"}/>
                <br/>
                <StatButton location={"./stats/artists/medium_term"} text={"last 6 months"}/>
                <br/>
                <StatButton location={"./stats/artists/long_term"} text={"All time"}/>
            </div>
        </div>
    )
}