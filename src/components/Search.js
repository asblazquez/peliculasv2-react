import { useState } from "react"
import { CardFilm } from "./subComponents/CardFilm"
import { BsSearch } from "react-icons/bs"
import RadioButton from "./subComponents/RadioButton"
import Loader from "./subComponents/Loader"


const Search = () => {

    const api_key = "3ad3c5861f62921ba8cb86c9f5e85044";

    const [value, setBusqueda] = useState('')
    const [list, setResultado] = useState([])
    const [loader, setLoader] = useState(false)

    const handleChange = ({ target }) => {
        setBusqueda(target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value === null || value === '') {
            alert('El campo de busqueda es obligatorio')
        } else {
            setLoader(true)
            const url = `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=es-ES&query=${value}&page=1&include_adult=false`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setResultado(data.results);
                    setLoader(false)
                });
        }
    }

    return (
        <div className="pt-20">
            {loader ? <Loader /> : null}
            <div className="grid grid-cols-8 gap-5 p-10 content-center">
                <form className="mb-3 pt-0 text-right col-start-2 col-span-5" onSubmit={handleSubmit}>
                    <input id="inputField" type="text" value={value} placeholder="Nombre de la Pelicula/Serie"
                        onChange={handleChange}
                        className="px-3 py-3 placeholder-slate-300 text-slate-600
             bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
                </form>
                <div className="col-span-1 h-12 w-16">
                    <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase 
                            text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none 
                            mr-1 mb-1 ease-linear transition-all duration-150 h-full w-full"
                        type="button"
                        onClick={handleSubmit}>
                        <BsSearch style={{ margin: 'auto' }} />
                    </button>
                </div>
            </div>
            {list.length === 0 ? <NoResult /> : <Card list={list} />}
        </div>

    )
}

export default Search

function Card({ list }) {
    console.log(list)
    return (
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-10 gap-5 px-5">
            {
                list.map((element, index) => {
                    if (element.poster_path === null) {
                        return null
                    } else {
                        console.log(element)
                        return (
                            <CardFilm img={`https://image.tmdb.org/t/p/original/${element.media_type == 'person' ? element.profile_path : element.poster_path}`}
                                filmName={element.title == null ? element.name : element.title}
                                voteAverage={element.media_type == 'person' ? element.popularity : element.vote_average}
                                route={element.media_type == 'person' ? 'Actor' : (element.media_type == 'movie' ? 'Pelicula' : 'Serie')}
                                id={element.id}
                                showRate={true}
                                season={null}
                                episode={null}
                                key={index} />
                        );
                    }
                })
            }
        </div>
    );
}

function NoResult() {
    return (
        <div className="grid grid-cols-3 px-5">
            <div className="col-start-2">
                <p className="text-center py-5 text-white font-bold">No se ha encontrado ningun registro</p>
                <img className="w-full rounded"
                    src='https://cms-assets.tutsplus.com/cdn-cgi/image/width=600/uploads/users/30/posts/25489/image/pac-404.png'
                    alt="404"></img>
            </div>
        </div>
    )
}