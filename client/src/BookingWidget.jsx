import React from 'react'

const BookingWidget = ({place}) => {
    return (
        <div className='bg-white shadow  p-4 rounded-2xl'>
            <div className="text-2xl text-center my-1">
                Price : ${place.price} / Per Night
            </div>

            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className='py-3 px-4'>
                        <label>Check in:</label>
                        <input type="date" />
                    </div>

                    <div className='py-3 px-4 border-l'>
                        <label>Check out:</label>
                        <input type="date" />
                    </div>
                </div>
                <div className='py-3 px-4 border-t flex'>
                    <label>No. Of Guests:</label>
                    <input type="number" value={1} />
                </div>
            </div>

            <button className='primary mt-4'>Book This Place</button>
        </div>
    )
}

export default BookingWidget
