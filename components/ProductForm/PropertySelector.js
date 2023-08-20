import React from 'react'

function PropertySelector({ property, values, onSelectValue }) {
    return (
        <div>
            <select
                value={property}
                onChange={(ev) => onSelectValue(ev.target.value)}
            >
                {values.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PropertySelector
