import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PageForPlace = () => {

    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        })
    }, [id])

    if (!place) return '';

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0  min-h-screen'>
                <div className='p-8 grid gap-4 bg-black text-white place-content-center'>
                    <h2 className='text-3xl'>Photos Of {place.title}</h2>
                    <div>
                        <button onClick={() => setShowAllPhotos(false)} className='fixed top-8 flex right-12 gap-1 py-2 px-4 rounded-2xl bg-black text-gray-50 shadow shadow-black border border-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            Close Photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div key={photo}>
                            <img src={'http://localhost:4000/uploads/' + photo} width='720px' height='480 px' alt="" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <a target='_blank' className='my-2 gap-1 my-3 flex block font-semibold text-sm underline' href={'https://maps.google.com/?q=' + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5  h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
            </a>

            <div className="relative">
                <div className="grid gap-2 grid-cols-[1fr,1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img className='aspect-square object-cover' width='640px' height='420px' src={'http://localhost:4000/uploads/' + place.photos[0]} alt="" />
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        {place.photos?.slice(1, 5).map((photo, index) => (
                            <img key={index} className='aspect-square object-cover' width='320px' height='200px' src={'http://localhost:4000/uploads/' + photo} alt="" />
                        ))}
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-4 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                    Show More Photos
                </button>
            </div>

            
        </div>
    )
}

export default PageForPlace
