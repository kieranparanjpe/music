'use client'

export default function StatButton({text, location})
{
    return(
        <button onClick={()=> {window.location=location}}
                className={"bg-spotify border-black dark:border-white border-2 rounded-2xl p-2.5 max-w-full w-96 h-20"}
                style={{marginLeft: "10px", marginRight: "10px", marginTop: "20px"}}>
            <p style={{fontSize: "1.5rem"}}>{text}</p>
        </button>
    )
}