import axios from "axios"
import { useEffect, useState } from "react"
import { CardFilm } from "./subComponents/CardFilm"
import Loader from "./subComponents/Loader"

const Home = () => {

  const api_key = "3ad3c5861f62921ba8cb86c9f5e85044"
  const latestFilms_url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=es-ES&page=1`
  const popularSeries_url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=es-ES&page=1`

  const [listFilms, setListFilms] = useState([])
  const [listSeries, setListSeries] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {

    const getPopularFilms = async () => {
      setLoader(true)
      const res = await axios.get(latestFilms_url)
      setListFilms(res.data.results)
      setLoader(false)
    }

    const getPopularSeries = async () => {
      setLoader(true)
      const res = await axios.get(popularSeries_url)
      setListSeries(res.data.results)
      setLoader(false)
    }

    getPopularFilms()
    getPopularSeries()
  }, [latestFilms_url, popularSeries_url])
  console.log(listSeries)
  return (
    <div className="pt-20">
      {loader ? <Loader /> : null}
      <p className="text-white font-bold text-xl ml-5">Peliculas</p>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-5 px-5 mb-10">
        {
          listFilms.map((element, index) => {
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
      <p className="text-white font-bold text-xl mt-5 ml-5">Series</p>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-8 lg:grid-cols-10 gap-5 px-5 mb-10">
        {
          listSeries.map((element, index) => {
            if (element.poster_path === null) {
              return null
            } else {
              return (
                <CardFilm img={`https://image.tmdb.org/t/p/original/${element.poster_path}`}
                  filmName={element.name}
                  voteAverage={element.vote_average}
                  id={element.id}
                  route={'Serie'}
                  season={null}
                  episode={null}
                  key={index} />
              );
            }
          })
        }
      </div>
    </div>
  )
}

export default Home