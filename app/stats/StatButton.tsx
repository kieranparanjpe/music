'use client'

export default function StatButton({text, location} : {text: string, location: string})
{
    return(
        <button onClick={()=> {window.location=location as string & Location}}
                className={"bg-spotify border-black dark:border-white border-2 rounded-2xl p-2.5 max-w-full w-96 h-20"}
                style={{marginLeft: "auto", marginRight: "auto", marginTop: "20px"}}>
            <p style={{fontSize: "1.5rem"}}>{text}</p>
        </button>
    )
}