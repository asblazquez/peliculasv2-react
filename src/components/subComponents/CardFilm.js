import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export function CardFilm({ img, filmName, original_name, voteAverage, id, route, season, episode, showRate }) {
    const calification = Math.round(voteAverage)

    let navigate = useNavigate()

    const loadFilmInfo = () => {
        season == null ?
            navigate('/' + route + '/' + id) :
            navigate('/' + route + '/' + id + '/' + season + '/' + episode)
    }

    return (
        <div className='cursor-pointer m-auto md:m-0 lg:m-0 w-32' onClick={loadFilmInfo}>
            {showRate ?
                <div className='absolute grid grid-cols-2 text-yellow-400  rounded-3xl m-1 w-fit' style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}>
                    <div className='col-span-1 pt-1 ml-2'>
                        <FaStar />
                    </div>
                    <div className='col-span-1 pr-1'>
                        <p>{calification}</p>
                    </div>
                </div> : null}

            <div className="max-w-sm rounded-t overflow-hidden shadow-lg col-span-1" title={filmName === null ? original_name : filmName}>
                {img.substr(img.length - 4) === 'null' ? null : <img className="w-full" src={img} alt="name" />}
            </div>
            <div id='filmCard' className='max-w-sm rounded-b overflow-hidden shadow-lg col-span-1 text-center text-white'>
                <p>{filmName == null ? original_name : filmName}</p>
            </div>
        </div>
    )
}
