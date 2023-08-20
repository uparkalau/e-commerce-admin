import React from 'react'

function SaveProductButton({ onSave }) {
    return (
        <button type="submit" className="btn-primary" onClick={onSave}>
            Save
        </button>
    )
}

export default SaveProductButton
