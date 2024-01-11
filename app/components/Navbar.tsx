'use client'

import "../globals.css";
import "./Navbar.css"
export default function Navbar()
{
    return(
        <nav>
            <h2>Spotify Stats</h2>
            <ul>
                <button onClick={() => {location.href='./homepage'}}><li><p>Home</p></li></button>
                <button><li><p>link 1</p></li></button>
                <button><li><p>link 1</p></li></button>
                <button onClick={() => {location.href='../account'}}><li><p>Account</p></li></button>

            </ul>
        </nav>
    )
}