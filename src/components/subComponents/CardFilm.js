import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export function CardFilm({ img, filmName, original_name, voteAverage, id, route, season, episode }) {
    const calification = Math.round(voteAverage)

    let navigate = useNavigate()

    const loadFilmInfo = () => {
        season == null ?
            navigate('/' + route + '/' + id) :
            navigate('/' + route + '/' + id + '/' + season + '/' + episode)
    }

    return (
        <div className='cursor-pointer m-auto md:m-0 lg:m-0 w-32' onClick={loadFilmInfo}>
            <div className='grid grid-cols-2 text-yellow-400 w-10'>
                <div className='col-span-1 pt-1'>
                    <FaStar />
                </div>
                <div className='col-span-1'>
                    {calification}
                </div>
            </div>
            <div className="max-w-sm rounded-t overflow-hidden shadow-lg col-span-1" title={filmName === null ? original_name : filmName}>
                {img.substr(img.length - 4) === 'null' ? null : <img className="w-full" src={img} alt="name" />}
            </div>
            <div id='filmCard' className='max-w-sm rounded-b overflow-hidden shadow-lg col-span-1 text-center text-white'>
                <p>{filmName == null ? original_name : filmName}</p>
            </div>
        </div>
    )
}
