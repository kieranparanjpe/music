/**@Deprecated**/
export class SpotifyHandler {

    static clientId = "11350c577ada4e1a956e4acf008e932a";
    static urlCode = "";
    //For development use:
    static redirect = 'http://localhost:3000/homepage';
    //For production use:
    //static redirect = 'https://audio-visualisers-b0876.web.app/';
    static profile : any = null;
    static accessToken: string | null;
    static details: any;
    static song: any;

    static async spotifySignIn() {
        await SpotifyHandler.redirectToAuthCodeFlow(SpotifyHandler.clientId);
    }

    static async initialise(code: string | null){
        if (code == null || code == "" || SpotifyHandler.accessToken != null)
            return null;
        SpotifyHandler.accessToken = localStorage.getItem("access key");

        SpotifyHandler.urlCode = code;

        console.log("Posting for code");
        if(SpotifyHandler.accessToken == null || SpotifyHandler.accessToken == "undefined") {
            SpotifyHandler.accessToken = await SpotifyHandler.getAccessToken(SpotifyHandler.clientId, code);
            localStorage.setItem("access key", SpotifyHandler.accessToken);
        }
      //  console.log("access token: " + SpotifyHandler.accessToken);
        console.log("Time: " + Date.now() + ", Code: " + SpotifyHandler.accessToken);
        SpotifyHandler.profile = await SpotifyHandler.fetchProfile();
        console.log("Profile after get: " + SpotifyHandler.profile);
        return SpotifyHandler.profile;
    }

    static async getAccessToken(clientId: string, code: string) {
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", SpotifyHandler.redirect);
        params.append("code_verifier", verifier);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: params
        });

        const accessToken = await result.json();
        return accessToken["access_token"];
    }


    static async fetchProfile() {
        console.log("fetch");
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: {Authorization: `Bearer ${SpotifyHandler.accessToken}`}
        });
        return await result.json();
    }

    static async updateSong() {
        if (SpotifyHandler.urlCode && SpotifyHandler.profile.email != null) {
            let old = "";
            if(SpotifyHandler.song)
                old = SpotifyHandler.song.item.id;

            SpotifyHandler.song = await SpotifyHandler.getCurrentSong();

            if(!SpotifyHandler.song)
            {
                SpotifyHandler.accessToken = await SpotifyHandler.getAccessToken(SpotifyHandler.clientId, SpotifyHandler.urlCode);
                SpotifyHandler.profile = await SpotifyHandler.fetchProfile(SpotifyHandler.accessToken);
                return;
            }

            if(SpotifyHandler.song.item.id == old)
                return;

            SpotifyHandler.details = await SpotifyHandler.getSongDetails(SpotifyHandler.song.item.id);
        }
    }

    static async getCurrentSong() {
        const resultA = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            method: "GET", headers: {Authorization: `Bearer ${SpotifyHandler.accessToken}`}
        });

        return await resultA.json();
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

    static async redirectToAuthCodeFlow(clientId : string) {
        const verifier : string = SpotifyHandler.generateCodeVerifier(128);
        const challenge : string = await SpotifyHandler.generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", SpotifyHandler.redirect);
        params.append("scope", "user-read-private user-read-email user-read-currently-playing");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    static generateCodeVerifier(length: number) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    static async generateCodeChallenge(codeVerifier : string) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        // @ts-ignore
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}