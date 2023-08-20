import React from 'react'

function CategorySelect({ category, categories, onSelectCategory }) {
    return (
        <select
            value={category}
            onChange={(ev) => onSelectCategory(ev.target.value)}
        >
            <option value="">Uncategorized</option>
            {categories.map((c) => (
                <option key={c._id} value={c._id}>
                    {c.name}
                </option>
            ))}
        </select>
    )
}

export default CategorySelect
