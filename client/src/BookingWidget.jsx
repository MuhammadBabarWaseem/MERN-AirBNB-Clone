import React, { useContext, useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from './userContext'

const BookingWidget = ({ place }) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user])

    let numberOfNights = 0;

    const bookThisPlace = async () => {

        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            placeId: place._id,
            price: numberOfNights * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white shadow  p-4 rounded-2xl'>
            <div className="text-2xl text-center my-1">
                Price : ${place.price} / Per Night
            </div>

            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className='py-3 px-4'>
                        <label>Check in:</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>

                    <div className='py-3 px-4 border-l'>
                        <label>Check out:</label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className='py-3 px-4 border-t flex'>
                    <label>No. Of Guests:</label>
                    <input type="number"
                        value={numberOfGuests || 1}
                        onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className='py-3 px-5 border-t'>
                        <label>Your Full Name :</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} />
                        <label>Phone Number:</label>
                        <input type="tel"
                            value={phone}
                            onChange={ev => setPhone(ev.target.value)} />
                    </div>

                )}
            </div>

            <button onClick={bookThisPlace} className='primary mt-4'>
                Book This Place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget
