'use client'

import {useSearchParams} from "next/navigation";
import {SpotifyHandler} from "@/app/util/SpotifyHandler";
import {useEffect, useState} from "react";

export default function GetUrlParams()
{
    const params = useSearchParams();
    const  code : string | null = params.get("code");
    async function init(){
        let result : number = await SpotifyHandler.initialise(code);
        if (result == 1) {
            console.log("Profile: " + SpotifyHandler.profile["display_name"]);
            //location.href = './homepage';
        }
    }

    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        SpotifyHandler.initialise(code).then((res)=>{
            setData(res);
            setLoading(false);
        }
        )
    }, [code])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div>
            <h1>{data["display_name"]}</h1>
        </div>
    )
}