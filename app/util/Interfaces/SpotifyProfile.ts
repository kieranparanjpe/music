import {number} from "prop-types";

export interface SpotifyProfile1 {
    country: string
    display_name: string
    email: string
    explicit_content: ExplicitContent
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    product: string
    type: string
    uri: string
}

export interface ExplicitContent {
    filter_enabled: boolean
    filter_locked: boolean
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: string
    total: number
}

export interface Image {
    url: string
    height: number
    width: number
}

export function getBiggestImage(imgs: Image[]) : Image
{
    let biggest : Image = {url: "", height: 0, width: Number.MIN_VALUE};
    imgs.map((value: Image) => {
        if(value.width > biggest.width)
        {
            biggest = value;
        }
    });
    return biggest;
}
