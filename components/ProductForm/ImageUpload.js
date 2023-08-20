import React from 'react'
import { ReactSortable } from 'react-sortablejs'
import UploadImagesButton from './UploadImagesButton'

function ImageUpload({ images, onUpload, updateImagesOrder }) {
    return (
        <div className="flex flex-wrap gap-1 mb-2">
            {/* Existing images */}
            <ReactSortable
                list={images}
                setList={updateImagesOrder}
                className="flex flex-wrap gap-1"
            >
                {images.map((link) => (
                    <div
                        key={link}
                        className="h-24 p-4 bg-white border border-gray-200 rounded-sm shadow-sm"
                    >
                        <img src={link} alt="" className="rounded-lg" />
                    </div>
                ))}
            </ReactSortable>

            {/* Upload button */}
            <UploadImagesButton onUpload={onUpload} />
        </div>
    )
}

export default ImageUpload
