import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { FaStar } from 'react-icons/fa'
import Generos from "./subComponents/Generos";
import moment from "moment/moment";
import Plataformas from "./subComponents/Plataformas";
import { CardFilm } from "./subComponents/CardFilm";
import Loader from "./subComponents/Loader";

const Pelicula = () => {

    const { id } = useParams()
    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";
    const movieDetails_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=es-ES`
    const trailer_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3ad3c5861f62921ba8cb86c9f5e85044&language=es-ES`
    const youtubeWatch_url = `https://www.youtube-nocookie.com/embed/`
    const plataform_url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${api_key}`
    const similarFilms_url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${api_key}&language=es-ES&page=1`

    const [details, setDetails] = useState([])
    const [trailer, setTrailer] = useState('')
    const [providers, setProvider] = useState([])
    const [similarFilms, setSimilarFilms] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            setLoader(true)
            const res = await axios.get(movieDetails_url)
            setDetails(res.data)
            setLoader(false)
        }

        const getTrailer = async () => {
            setLoader(true)
            const res = await axios.get(trailer_url)
            const newRes = res.data.results.find(function (item) { return item.type === 'Trailer' })
            setTrailer(newRes != null ? newRes : [])
            setLoader(false)
        }

        const getWhatchProviders = async () => {
            setLoader(true)
            const res = await axios.get(plataform_url)
            setProvider(res.data.results.ES)
            setLoader(false)
        }

        const getSimilarFilms = async () => {
            setLoader(true)
            const res = await axios.get(similarFilms_url)
            setSimilarFilms(res.data.results)
            setLoader(false)
        }

        fetchPost()
        getTrailer()
        getWhatchProviders()
        getSimilarFilms()
    }, [movieDetails_url, trailer_url, plataform_url, similarFilms_url])

    return (
        <div className="pt-20">
            {loader ? <Loader /> : null}
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div className="col-span-1 w-96" style={{ margin: 'auto' }}>
                    <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://image.tmdb.org/t/p/original/${details.poster_path}`} alt={details.title} title={details.title} />
                </div>
                <div className="xl:col-span-2 col-span-1 rounded-lg p-5 xl:mr-5 xl:ml-5 md:mr-5 md:ml-5 mr-1 ml-1" style={{ background: '#1e293b' }}>
                    <div className="border-black border-b">
                        <h1 className="text-white font-bold" style={{ fontSize: '3rem' }}>{details.title}</h1>
                    </div>
                    <div className="text-white font-thin mt-3" style={{ fontSize: '1.5rem' }}>
                        {'(' + details.original_title + ')'}
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
                        <p className="font-bold" style={{ fontSize: '1.5rem' }}>Argumento:</p>
                        <p>{details.overview}</p>
                    </div>
                    <div className={`w-fit mt-3 gap-1 grid grid-cols-7`}>
                        {Array.isArray(details.genres) && details.genres.map((item, index) => {
                            return (
                                <Generos
                                    text={item.name}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                    <div className="mt-3 text-white font-bold" style={{ fontSize: '1.5rem' }}>
                        <p>Lanzamiento: {changeDateFormat(details.release_date)}</p>
                    </div>
                    {/* <div className="mt-3">
                        <Svg imbdId={details.imdb_id} />
                    </div> */}
                    {/* {providers == null ? null : Array.isArray(providers.buy) && <Plataformas text={'Comprar'} list={providers.buy} />}
                    {providers == null ? null : Array.isArray(providers.rent) && <Plataformas text={'Alquilar'} list={providers.rent} />}
                    {providers == null ? <p className="text-white font-bold mt-3">No hay plataformas disponibles para esta película</p> : Array.isArray(providers.flatrate) && <Plataformas text={'Plataformas:'} list={providers.flatrate} />} */}
                    {providers == null ?
                        <p className="text-white font-bold mt-3">No hay plataformas disponibles para esta película</p> :
                        (Array.isArray(providers.flatrate) && providers.flatrate != null ?
                            Array.isArray(providers.flatrate) && <Plataformas text={'Plataformas:'} list={providers.flatrate} /> :
                            Array.isArray(providers.rent) && <Plataformas text={'Alquilar:'} list={providers.rent} />)
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
            <div className="grid grid-flow-col gap-2 overflow-x-scroll m-5 scrollbar">
                {
                    similarFilms.map((element, index) => {
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
                                    key={index} />
                            );
                        }
                    })
                }
            </div>
        </div >

    )
}

export default Pelicula

function changeDateFormat(date) {
    return moment(date).format('DD/MM/YYYY')
}