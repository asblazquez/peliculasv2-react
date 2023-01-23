import React from 'react'

const Plataformas = ({ text, list }) => {
    return (
        <div>
            <p className="text-white mt-3 font-bold" style={{ fontSize: '1.5rem' }}>{text}</p>
            <div className={`w-fit mt-3 gap-2 grid grid-cols-10`}>
                {list.map((item, index) => {
                    return (
                        <div className="col-span-1 m-auto" key={index}>
                            <img
                                className="w-10 rounded-lg"
                                src={`https://image.tmdb.org/t/p/original/${item.logo_path}`}
                                alt={item.provider_name}
                                title={item.provider_name}>
                            </img>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Plataformas