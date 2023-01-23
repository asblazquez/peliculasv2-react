import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { FaStar } from 'react-icons/fa'
import Generos from "./subComponents/Generos";
import { CardFilm } from "./subComponents/CardFilm";
import DropDown from "./subComponents/DropDown";
import Loader from "./subComponents/Loader";
import Plataformas from "./subComponents/Plataformas";

const Serie = () => {
    const { id } = useParams()
    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";
    const serieDetails_url = `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=es-ES`
    const trailer_url = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${api_key}&language=es-ES`
    const youtubeWatch_url = `https://www.youtube-nocookie.com/embed/`
    const plataform_url = `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${api_key}`

    const [details, setDetails] = useState([])
    const [seasonDetails, setSeasonDetails] = useState([])
    const [season, setSeason] = useState(1)
    const [trailer, setTrailer] = useState([])
    const [platform, setPlatform] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            setLoader(true)
            const res = await axios.get(serieDetails_url)
            setDetails(res.data)
            setLoader(false)
        }

        const changeSeason = async () => {
            setLoader(true)
            const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=3ad3c5861f62921ba8cb86c9f5e85044&language=es-ES`)
            setSeasonDetails(res.data)
            setLoader(false)
        }

        const fetchTrailer = async () => {
            setLoader(true)
            const res = await axios.get(trailer_url)
            const newRes = res.data.results.find(function (item) { return item.type === 'Trailer' })
            setTrailer(newRes != null ? newRes : [])
            setLoader(false)
        }

        const getProviders = async () => {
            setLoader(true)
            const res = await axios.get(plataform_url)
            setPlatform(res.data.results.ES)
            setLoader(false)
        }

        fetchPost()
        changeSeason()
        fetchTrailer()
        getProviders()
    }, [serieDetails_url, season, trailer_url, id, plataform_url])

    return (
        <div className="pt-20">
            {loader ? <Loader /> : null}
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div className="col-span-1 w-96 m-auto">
                    <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://image.tmdb.org/t/p/original/${details.poster_path}`} alt={details.title} title={details.title} />
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
                            {`${details.vote_average} (${details.vote_count} votos)`}
                        </div>
                    </div>
                    <div className="text-white mt-3">
                        <p className="font-bold" style={{ fontSize: '1.5rem' }}>Argumento</p>
                        <p>{details.overview === '' ? 'Esta serie no dispone de argumento😢' : details.overview}</p>
                    </div>
                    <div className={`w-fit mt-3 gap-1 grid grid-cols-${Array.isArray(details.genres) && details.genres.length}`}>
                        {Array.isArray(details.genres) && details.genres.map((item, index) => {
                            return (
                                <Generos
                                    text={item.name}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    {platform == null ?
                        <p className="text-white font-bold mt-3">No hay plataformas disponibles para esta película</p> :
                        (Array.isArray(platform.flatrate) && platform.flatrate != null ?
                            Array.isArray(platform.flatrate) && <Plataformas text={'Plataformas:'} list={platform.flatrate} /> :
                            Array.isArray(platform.rent) && <Plataformas text={'Alquilar:'} list={platform.rent} />)
                    }
                </div>
            </div>
            {trailer.length === 0 ? null :
                <div className="mt-5">
                    <iframe
                        className="rounded-lg m-auto"
                        width="853"
                        height="480"
                        src={youtubeWatch_url + trailer.key}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                    />
                </div>
            }
            {Array.isArray(details.seasons) ?
                <DropDown list={details.seasons} setSeason={setSeason} season={season} /> :
                null}
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-10 gap-5 px-5 mb-10">
                {Array.isArray(seasonDetails.episodes) && seasonDetails.episodes.map((element, index) => {
                    if (element.poster_path === null) {
                        return null
                    } else {
                        return (
                            <CardFilm img={`https://image.tmdb.org/t/p/original/${element.still_path}`}
                                filmName={element.name}
                                voteAverage={element.vote_average}
                                id={details.id}
                                route={'Episodio'}
                                season={element.season_number}
                                episode={element.episode_number}
                                key={index} />
                        );
                    }
                })}
            </div>
        </div>

    )
}

export default Serie
