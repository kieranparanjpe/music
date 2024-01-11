import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {auth} from "@/app/util/auth";

export default async function ShowUserDetails()
{
    //const session = await getServerSession();
    const session = await auth();

    console.log(session.accessToken);

    if(!session)
    {
        redirect("/");
    }

    //console.log("session token: " + session.user.name);


    return(
        <p>access token: {session.accessToken}</p>
    )
}