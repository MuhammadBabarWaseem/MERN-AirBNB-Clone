import axios from 'axios';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const PlacesPage = () => {
    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        await axios.post('/upload-by-link', { link: photoLink })
    }



    return (
        <div>
            {action !== 'new' && (
                <div>
                    <div className="text-center">
                        <Link className='inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add New Place
                        </Link>
                    </div>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form>
                        <h2 className='text-xl mt-4'>Title</h2>
                        <p className='text-gray-500 text-sm'>Title should be small and catchy</p>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Place Title, Eg: Double Story Villa' />

                        <h2 className='text-xl mt-4'>Address</h2>
                        <p className='text-gray-500 text-sm'>Address To This Place</p>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Place Address, Eg: House:#, Street:#, Nearby:Place' />

                        <h2 className='text-xl mt-4'>Photos</h2>
                        <p className='text-gray-500 text-sm'>Attach Attractive Images</p>
                        <div className='flex gap-2'>
                            <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder={'Add Images Using A Link .......jpg'} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;Photo</button>
                        </div>
                        <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            <button className="flex justify-center gap-2 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </button>
                        </div>

                        <h2 className='text-xl mt-4'>Description</h2>
                        <p className='text-gray-500 text-sm'>Detail Description Of The Place</p>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />

                        <h2 className='text-xl mt-4'>Perks</h2>
                        <p className='text-gray-500 text-sm'>Select Perks That Suits Your Place</p>
                        <div className='grid gap-2 mt-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                </svg>
                                <span>Wifi</span>
                            </label>

                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <span>Free Parking Space</span>
                            </label>

                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span>TV</span>
                            </label>

                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: '24px', width: '24px', fill: 'currentcolor' }}><path d="M13.693 13.934a4 4 0 0 1 5.283.595l.292.366 4.768 6.755a4 4 0 0 1 .596 3.342 4.004 4.004 0 0 1-4.496 2.913l-.403-.084-3.474-.932a1 1 0 0 0-.518 0l-3.474.932a4 4 0 0 1-2.941-.347l-.401-.249a4.004 4.004 0 0 1-1.19-5.207l.229-.368 4.768-6.755a4 4 0 0 1 .961-.96zm3.756 1.889a2 2 0 0 0-2.979.09l-.104.136-4.838 6.861a2 2 0 0 0 2.048 3.017l.173-.038 3.992-1.07a1 1 0 0 1 .518 0l3.964 1.063.143.034a2 2 0 0 0 2.132-2.963l-4.947-7.014zM27 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM5 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm22 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>
                                <span>Pets</span>
                            </label>

                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <span>Private Entrance</span>
                            </label>

                            <label className="border p-4  flex rounded-2xl gap-2 items-center cursor-pointer"><input type="checkbox" />
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: '24px', width: '24px', fill: 'currentcolor' }}><path d="M26 2a1 1 0 0 1 .922.612l.04.113 2 7a1 1 0 0 1-.847 1.269L28 11h-3v5h6v2h-2v13h-2l.001-2.536a3.976 3.976 0 0 1-1.73.527L25 29H7a3.982 3.982 0 0 1-2-.535V31H3V18H1v-2h5v-4a1 1 0 0 1 .883-.993L7 11h.238L6.086 8.406l1.828-.812L9.427 11H12a1 1 0 0 1 .993.883L13 12v4h10v-5h-3a1 1 0 0 1-.987-1.162l.025-.113 2-7a1 1 0 0 1 .842-.718L22 2h4zm1 16H5v7a2 2 0 0 0 1.697 1.977l.154.018L7 27h18a2 2 0 0 0 1.995-1.85L27 25v-7zm-16-5H8v3h3v-3zm14.245-9h-2.491l-1.429 5h5.349l-1.429-5z"></path></svg>
                                <span>Dedicated Work Space</span>
                            </label>
                        </div>

                        <h2 className='text-xl mt-4'>Extra Info</h2>
                        <p className='text-gray-500 text-sm'>Place Rules & Regulations etc.</p>
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                        <h2 className='text-xl mt-4'>Check In & Check Out Times</h2>
                        <p className='text-gray-500 text-sm'>Add Check In & Check Out Time, Remember To Have Some Time Window For Cleaning or Managing The Place</p>

                        <div className='grid gap-2 sm:grid-cols-3 '>
                            <div>
                                <h3 className='mt-2 -mb-1 '>Check In Time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='14:00' />
                            </div>

                            <div>
                                <h3 className='mt-2 -mb-1 '>Check Out Time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='21:00' />
                            </div>

                            <div>
                                <h3 className='mt-2 -mb-1 '>Max Number Of Guests</h3>
                                <input type="number" value={maxGuest} onChange={e => setMaxGuest(e.target.value)} placeholder='4' />
                            </div>
                        </div>

                        <button className='primary  my-4'>Save</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PlacesPage
