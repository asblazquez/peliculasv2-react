
function DropDown({ list, setSeason, season }) {
    const newList = list.filter(function (element) { return element.name !== 'Especiales' })
    return (
        <div className="list-choice">
            <div className="list-choice-title">temporada</div>
            <div className="list-choice-objects">
                {
                    newList.map((item, index) => {
                        return (
                            <label className="relative" key={index}>
                                <input type="radio" name="temporada" onClick={() => setSeason(index + 1)} />
                                <span>{item.name}</span>
                            </label>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DropDown