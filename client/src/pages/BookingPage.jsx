import React from 'react'
import { useParams } from 'react-router-dom'

const BookingPage = () => {

    const {id} = useParams()

    return (
        <div>
            Your Single Booking Here : {id}
        </div>
    )
}

export default BookingPage
