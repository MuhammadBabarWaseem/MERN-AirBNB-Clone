import React, { useEffect, useState } from 'react'
import Perks from './Perks';
import { Navigate, useParams } from 'react-router-dom'
import PhotosUploader from './PhotosUploader';
import axios from 'axios';
import AccountNav from '../AccountNav';

const PlacesFormPage = () => {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuest, setMaxGuest] = useState(1);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuest(data.maxGuest || 1);
        });

    }, [id])

    const savePlace = async (ev) => {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuest
        }

        if (id) {
            await axios.put('/places', {
                id, ...placeData

            });
            alert('Place Updated successfully')
            setRedirect(true);
        } else {
            await axios.post('/places', placeData);
            alert('Place Created successfully')
            setRedirect(true);
        }

    }

    if (redirect) {
        return <Navigate to="/account/places" />
    }

    return (
        <>
            <div>
                <AccountNav />
                <form onSubmit={savePlace}>
                    <h2 className='text-xl mt-4'>Title</h2>
                    <p className='text-gray-500 text-sm'>Title should be small and catchy</p>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Place Title, Eg: Double Story Villa' />

                    <h2 className='text-xl mt-4'>Address</h2>
                    <p className='text-gray-500 text-sm'>Address To This Place</p>
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder='Place Address, Eg: House:#, Street:#, Nearby:Place' />

                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    <h2 className='text-xl mt-4'>Description</h2>
                    <p className='text-gray-500 text-sm'>Detail Description Of The Place</p>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} />

                    <h2 className='text-xl mt-4'>Perks</h2>
                    <p className='text-gray-500 text-sm'>Select Perks That Suits Your Place</p>
                    <div className='grid mt-3 gap-2  grid-cols-2 md:grid-cols-4 lg:grid-cols-6'>
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    <h2 className='text-xl mt-4'>Extra Info</h2>
                    <p className='text-gray-500 text-sm'>Place Rules & Regulations etc.</p>
                    <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                    <h2 className='text-xl mt-4'>Check In & Check Out Times</h2>
                    <p className='text-gray-500 text-sm'>Add Check In & Check Out Time, Remember To Have Some Time Window For Cleaning or Managing The Place</p>

                    <div className='grid gap-2 sm:grid-cols-3 '>
                        <div>
                            <h3 className='mt-2 -mb-1 '>Check In Time</h3>
                            <input type="text" value={checkIn || ''} onChange={e => setCheckIn(e.target.value)} placeholder='14:00' />
                        </div>

                        <div>
                            <h3 className='mt-2 -mb-1 '>Check Out Time</h3>
                            <input type="text" value={checkOut || ''} onChange={e => setCheckOut(e.target.value)} placeholder='21:00' />
                        </div>

                        <div>
                            <h3 className='mt-2 -mb-1 '>Max Number Of Guests</h3>
                            <input type="number" value={maxGuest || 1} onChange={e => setMaxGuest(e.target.value)} placeholder='4' />
                        </div>
                    </div>

                    <button className='primary  my-4'>Save</button>
                </form>
            </div>
        </>
    )
}

export default PlacesFormPage
