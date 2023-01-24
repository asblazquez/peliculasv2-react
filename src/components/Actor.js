import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Loader from './subComponents/Loader';
import { FaStar } from 'react-icons/fa'
import moment from "moment/moment";
import Paginator from './subComponents/Paginator';
import { CardFilm } from './subComponents/CardFilm';

const Actor = () => {
    const { id } = useParams()

    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";
    const searchPerson_url = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}&language=es-ES`
    const movieCredits_url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}&language=es-ES`

    const [details, setDetails] = useState([])
    const [movieCredits, setMovieCredits] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {

        const getPeopleDetails = async () => {
            setLoader(true)
            const res = await axios.get(searchPerson_url)
            setDetails(res.data)
            setLoader(false)
        }

        const getMovieCredits = async () => {
            setLoader(true)
            const res = await axios.get(movieCredits_url)
            setMovieCredits(res.data)
            setLoader(false)
        }

        getPeopleDetails()
        getMovieCredits()
    }, [searchPerson_url, movieCredits_url])
    console.log(movieCredits.cast)
    return (
        <div className='pt-20'>
            {loader ? <Loader /> : null}
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div className="col-span-1 w-96 m-auto">
                    {details.profile_path == null ?
                        <div>
                            <p className='text-white absolute pl-2 pr-2 mt-44 ml-10 font-bold rounded-3xl' style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}>Este episodio no dispone de imagen</p>
                            <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://media.tenor.com/KzPtX-GDqLQAAAAM/sad-pikachu-pikachu-triste.gif`} alt={'Este episodio no dispone de imagen😥'} title={'Este episodio no dispone de imagen😥'} />
                        </div>
                        :
                        <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://image.tmdb.org/t/p/original/${details.profile_path}`} alt={details.name} title={details.name} />}
                </div>
                <div className="xl:col-span-2 col-span-1 rounded-lg p-5 xl:mr-5 xl:ml-5 xl:mb-0 md:mr-5 md:ml-5 md:mb-0 lg:mt-0 md:mt-0 m-5" style={{ background: '#1e293b' }}>
                    <div className="border-black border-b">
                        <h1 className="text-white font-bold" style={{ fontSize: '3rem' }}>{details.name}</h1>
                    </div>
                    <div className='grid grid-cols-10 text-yellow-400 w-fit mt-3' style={{ fontSize: '1.5rem' }}>
                        <div className='col-span-1 pt-1.5'>
                            <FaStar />
                        </div>
                        <div className='col-span-9 ml-1'>
                            {`${details.popularity}`}
                        </div>
                    </div>
                    <div className="text-white mt-3">
                        <p className="font-bold" style={{ fontSize: '1.5rem' }}>Biografía</p>
                        <p>{details.biography === '' ? 'No dispone de biografía😢' : details.biography}</p>
                    </div>
                    <div className="mt-3 text-white font-bold" style={{ fontSize: '1.5rem' }}>
                        <p>Género: {details.gender == 1 ? 'Femenino' : 'Masculino'}</p>
                    </div>
                    <div className="mt-3 text-white font-bold" style={{ fontSize: '1.5rem' }}>
                        <p>Cumpleaños: {changeDateFormat(details.birthday)}</p>
                    </div>
                    <div className="mt-3 text-white font-bold" style={{ fontSize: '1.5rem' }}>
                        <p>Nacido en: {details.place_of_birth}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-flow-col gap-2 overflow-x-scroll m-5 scrollbar">
                {
                    Array.isArray(movieCredits.cast) && movieCredits.cast.map((element, index) => {
                        if (element.poster_path === null) {
                            return null
                        } else {
                            return (
                                <CardFilm img={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
                                    filmName={element.title}
                                    voteAverage={element.vote_average}
                                    id={element.id}
                                    route={'Pelicula'}
                                    season={null}
                                    episode={null}
                                    showRate={false}
                                    key={index} />
                            );
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Actor

function changeDateFormat(date) {
    return moment(date).format('DD/MM/YYYY')
}