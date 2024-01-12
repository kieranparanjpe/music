import {SpotifyProfile} from "next-auth/providers/spotify";
import {SpotifyCurrentlyPlaying} from "@/app/util/Interfaces/SpotifyCurrentlyPlaying";
import {SpotifyProfile1} from "@/app/util/Interfaces/SpotifyProfile";
import {SpotifyHandler} from "@/app/util/SpotifyHandler";
import {SpotifyTopArtists} from "@/app/util/Interfaces/SpotifyTopArtists";
import {SpotifyTopSongs} from "@/app/util/Interfaces/SpotifyTopSongs";

export default class SpotifyManager
{
    static async getProfile(token: string) : Promise<SpotifyProfile1>
    {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: {Authorization: `Bearer ${token}`}
        });
        return await result.json() as SpotifyProfile;
    }

    static async getCurrentSong(token: string) : Promise<SpotifyCurrentlyPlaying> {
        const resultA = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            method: "GET", headers: {Authorization: `Bearer ${token}`}
        });

        return await resultA.json() as SpotifyCurrentlyPlaying;
    }

    static async getTopArtists(token: string, duration: string) : Promise<SpotifyTopArtists> {
        const params = new URLSearchParams();
        params.append("time_range", duration);
        params.append("limit", "50");
        params.append("offset", "0");
        const resultA = await fetch(`https://api.spotify.com/v1/me/top/artists?${params.toString()}`, {
            method: "GET", headers: {Authorization: `Bearer ${token}`}
        });

        return await resultA.json() as SpotifyTopArtists;
    }

    static async getTopSongs(token: string, duration: string) : Promise<SpotifyTopSongs> {
        const params = new URLSearchParams();
        params.append("time_range", duration);
        params.append("limit", "50");
        params.append("offset", "0");
        const resultA = await fetch(`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`, {
            method: "GET", headers: {Authorization: `Bearer ${token}`}
        });

        return await resultA.json() as SpotifyTopSongs;
    }

    static async getSongDetails(id : string) {
        const resultB = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
            method: "GET", headers: {Authorization: `Bearer ${SpotifyHandler.accessToken}`}
        });
        if(resultB.ok){
            return await resultB.json();
        }

        return null;
    }

    /*requires list to have a 'name' property*/
    static namesToString(list : any[]) : string{
        let r = '';
        list.map((value, index)=>{
            if(!value.name)
                throw new DOMException("list provided to namesToString did not contain name property");
            else
                r += value.name + (index != list.length-1 ? ', ' : '');
        });

        return r;
    }
}