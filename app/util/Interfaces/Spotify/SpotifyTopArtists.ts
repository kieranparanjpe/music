export interface SpotifyTopArtists {
    href: string
    limit: number
    next: any
    offset: number
    previous: any
    total: number
    items: TopArtist[]
}

export interface TopArtist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: any
    total: number
}

export interface Image {
    url: string
    height: number
    width: number
}
