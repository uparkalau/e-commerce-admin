import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '@/components/Spinner'

function UploadImagesButton({ onUpload }) {
    const [isUploading, setIsUploading] = useState(false)

    async function uploadImages(ev) {
        const files = ev.target?.files
        if (files?.length > 0) {
            setIsUploading(true)
            const data = new FormData()
            for (const file of files) {
                data.append('file', file)
            }
            const res = await axios.post('/api/upload', data)
            onUpload(res.data.links)
            setIsUploading(false)
        }
    }

    return (
        <label className="flex flex-col items-center justify-center w-24 h-24 gap-1 text-sm text-center bg-white border rounded-sm shadow-sm cursor-pointer text-primary border-primary">
            {/* SVG icon */}
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
            {isUploading && (
                <div className="flex items-center h-24">
                    <Spinner />
                </div>
            )}
        </label>
    )
}

export default UploadImagesButton
