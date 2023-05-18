import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

const BookingWidget = ({ place }) => {

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
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
            </div>

            <button className='primary mt-4'>
                Book This Place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget
