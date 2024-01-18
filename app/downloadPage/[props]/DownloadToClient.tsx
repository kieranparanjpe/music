'use client'

import {songBinary} from "@/app/util/MP3Manager";
import {useEffect} from "react";
import {Loc} from "sucrase/dist/types/parser/traverser/base";

export default function DownloadToClient({title, mp3, redirect} : {title: string, mp3 : string, redirect : string})
{
    let hasDownloaded = false;

    useEffect(() => {
        if(hasDownloaded)
            return;
        const mp3Buffer = Buffer.from(mp3, 'base64');
        const blob = new Blob([mp3Buffer], { type: 'audio/mp3' });

        // Create a download link and trigger the click event
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${title}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        hasDownloaded = true;
        

        window.location = redirect.replaceAll('~', '/') as string & Location;

        }, []
    );

    return (
        <div>
        </div>
    )
}