'use client'
import "../globals.css";
import "./Navbar.css"
import {redirect} from "next/navigation";
export default function Navbar()
{
    return(
        <nav>
            <h2 className={"title"}>Spotify Stats</h2>
            <ul>
                <button onClick={() => {window.location='/homepage'}}><li><p>Home</p></li></button>
                <button onClick={() => {window.location='/stats'}}><li><p>Stats</p></li></button>
                <button onClick={() => {window.location='/downloadsongs'}}><li><p>Download Playlists</p></li></button>
                {/*<button onClick={() => {location.href='../account'}}><li><p>Account</p></li></button>*/}

            </ul>
        </nav>
    )
}