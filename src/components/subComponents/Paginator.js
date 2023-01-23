import { BsArrowRight, BsArrowLeft } from "react-icons/bs"

const Paginator = ({ currentPage, setPage }) => {
    return (
        <div className="grid grid-cols-5 w-96 gap-1 m-auto">
            <div className="col-start-2 col-span-1 text-right">
                <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase 
                                text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setPage(currentPage === 1 ? 1 : currentPage - 1)}>
                    <BsArrowLeft />
                </button>
            </div>
            <div className="col-span-1 col-start-3 text-center pt-1.5 rounded-full bg-indigo-500 text-white">
                {currentPage}
            </div>
            <div className="col-start-4 col-span-1 text-left">
                <button className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase 
                                text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none
                                 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setPage(currentPage + 1)}>
                    <BsArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Paginator