
function DropDown({ list, setSeason, season }) {
    const newList = list.filter(function (element) { return element.name !== 'Especiales' })
    return (
        <div className='w-fit m-auto mt-5'>
            <select
                className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase 
            text-sm px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none 
            mr-1 mb-1 ease-linear transition-all duration-150 h-full w-full"
                value={season}
                onChange={event => setSeason(event.target.value)}
            >
                {Array.isArray(newList) && newList.map((item, index) => {
                    return (
                        <option key={index} value={item.name === 'Especiales' ? index : index + 1}>{item.name}</option>
                    )
                })}
            </select>
        </div>
    )
}

export default DropDown