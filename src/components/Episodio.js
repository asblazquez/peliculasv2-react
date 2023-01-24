import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Loader from './subComponents/Loader';
import { FaStar } from 'react-icons/fa'
import moment from "moment/moment";
import Paginator from './subComponents/Paginator';
import Alert from './subComponents/Alert';

const Episodio = () => {
    const { id, season, episode } = useParams()

    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";

    const [details, setDetails] = useState([])
    const [loader, setLoader] = useState(true)
    const [numEpisode, setNumEpisode] = useState(parseInt(episode))
    const [alert, setAlert] = useState(false)

    useEffect(() => {

        const getEpisodeDetails = async () => {
            setLoader(true)
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${numEpisode}?api_key=${api_key}&language=es-ES`)
                setDetails(res.data)
            } catch (e) {
                setAlert(true)
            }
            setLoader(false)

        }

        getEpisodeDetails()
    }, [numEpisode, id, season])

    return (
        <div className='pt-20'>
            {alert ? <Alert setAlert={setAlert} tittle={'Error '} text={'No se ha encontrado el capitulo seleccionado'} /> : null}
            {loader ? <Loader /> : null}
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
                <div className="col-span-1 w-96 m-auto">
                    {details.still_path == null ?
                        <div>
                            <p className='text-white absolute pl-2 pr-2 mt-44 ml-10 font-bold rounded-3xl' style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)' }}>Este episodio no dispone de imagen</p>
                            <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://media.tenor.com/KzPtX-GDqLQAAAAM/sad-pikachu-pikachu-triste.gif`} alt={'Este episodio no dispone de imagen😥'} title={'Este episodio no dispone de imagen😥'} />
                        </div>
                        :
                        <img className="w-full rounded-lg" style={{ aspectRatio: '468∶703' }} src={`https://image.tmdb.org/t/p/original/${details.still_path}`} alt={details.title} title={details.title} />}
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
                    <div className="mt-3 text-white font-bold" style={{ fontSize: '1.5rem' }}>
                        <p>Lanzamiento: {changeDateFormat(details.air_date)}</p>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Paginator currentPage={numEpisode} setPage={setNumEpisode} />
            </div>
        </div>
    )
}

export default Episodio

function changeDateFormat(date) {
    return moment(date).format('DD/MM/YYYY')
}