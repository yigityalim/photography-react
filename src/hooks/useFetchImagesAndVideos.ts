import { useEffect, useState } from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '@/firebase'

export function useFetchImagesAndVideos(): [images: string[], videos: string[], loading: boolean, error: string | Error | undefined] {
    const [imageList, setImageList] = useState<string[]>([])
    const [videoList, setVideoList] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | Error | undefined>(undefined)

    useEffect((): void => {
        setLoading(true)
        listAll(ref(storage, 'images/')).then((res): void => {
            res.items.forEach((itemRef): void => {
                getDownloadURL(itemRef).then((url: string): void => {
                    setImageList((prev: string[]) => [...prev, url])
                    setLoading(false)
                }).catch((err): void => setError(err.message))
            })
        }).catch((err): void => setError(err.message))

        listAll(ref(storage, 'videos/')).then((res): void => {
            res.items.forEach((itemRef): void => {
                getDownloadURL(itemRef).then((url: string): void => {
                    setVideoList((prev: string[]) => [...prev, url])
                    setLoading(false)
                }).catch((err): void => setError(err.message))
            })
        }).catch((err): void => setError(err.message))
    }, [])

    return [imageList, videoList, loading, error]
}