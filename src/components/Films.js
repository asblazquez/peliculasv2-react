import { useState, useEffect } from "react";
import axios from "axios";
import { CardFilm } from "./subComponents/CardFilm";
import Paginator from "./subComponents/Paginator";
import Loader from "./subComponents/Loader";

const Films = () => {

    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";
    const moviePopular_url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=es-Es&page=`;

    const [list, setListFilms] = useState([])
    const [page, setPage] = useState(1)
    const [loader, setLoder] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            setLoder(true)
            const res = await axios.get(moviePopular_url + page)
            setListFilms(res.data.results)
            setLoder(false)
        }

        fetchPost()
    }, [moviePopular_url, page])

    return (
        <div className="pt-20">
            {loader ? <Loader /> : null}
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-5 px-5 mb-10">
                {
                    list.map((element, index) => {
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
            <div>
                <Paginator currentPage={page} setPage={setPage} />
            </div>
        </div>
    )
}

export default Films