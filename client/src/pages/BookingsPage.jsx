import React, { useEffect, useState } from 'react'
import AccountNav from '../AccountNav'
import axios from 'axios'

const BookingsPage = () => {

    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data)
        })
    }, [])

    return (
        <div>
            <AccountNav/>
            <div>
                    {bookings?.length > 0 && bookings.map((booking,key) => (
                        <div key={key}>
                            {booking.checkIn} -{'>'} {booking.checkOut} 
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default BookingsPage
