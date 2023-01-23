import React from 'react'

const RadioButton = ({ setFilm, handleSubmit }) => {
    const bgColorSelected = '#6366f1'
    const bgColorNotSelected = '#1e293b'

    const setSerachToFilm = () => {
        document.getElementById('btnIsfilm').style.backgroundColor = bgColorSelected
        document.getElementById('btnIsSerie').style.backgroundColor = bgColorNotSelected
    }

    const setSerachToSerie = () => {
        document.getElementById('btnIsSerie').style.backgroundColor = bgColorSelected
        document.getElementById('btnIsfilm').style.backgroundColor = bgColorNotSelected
    }

    return (
        <div className="flex justify-center">
            <div className='grid grid-cols-2 gap-5'>
                <div className="form-check col-span-1">
                    <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase 
                            text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none 
                            mr-1 mb-1 ease-linear transition-all duration-150 h-full w-full"
                        type="button"
                        id='btnIsfilm'
                        onClick={() => {
                            setFilm(true)
                            setSerachToFilm()
                            //handleSubmit()
                        }}>
                        Peliculas
                    </button>
                </div>
                <div className="form-check col-span-1">
                    <button className="text-white active:bg-indigo-600 font-bold uppercase 
                            text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none 
                            mr-1 mb-1 ease-linear transition-all duration-150 h-full w-full"
                        style={{ backgroundColor: bgColorNotSelected }}
                        type="button"
                        id='btnIsSerie'
                        onClick={() => {
                            setFilm(false)
                            setSerachToSerie()
                            //handleSubmit()
                        }}>
                        Series
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RadioButton