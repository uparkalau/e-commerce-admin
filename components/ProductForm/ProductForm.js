import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import CategorySelect from './CategorySelect'
import PropertySelector from './PropertySelector'
import ImageUpload from './ImageUpload'
import SaveProductButton from './SaveProductButton'

function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
}) {
    const [title, setTitle] = useState(existingTitle || '')
    const [description, setDescription] = useState(existingDescription || '')
    const [category, setCategory] = useState(assignedCategory || '')
    const [productProperties, setProductProperties] = useState(
        assignedProperties || {}
    )
    const [price, setPrice] = useState(existingPrice || '')
    const [images, setImages] = useState(existingImages || [])
    const [goToProducts, setGoToProducts] = useState(false)
    const [categories, setCategories] = useState([])
    const router = useRouter()

    useEffect(() => {
        axios.get('/api/categories').then((result) => {
            setCategories(result.data)
        })
    }, [])

    async function saveProduct(ev) {
        ev.preventDefault()
        const data = {
            title,
            description,
            price,
            images,
            category,
            properties: productProperties,
        }
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id })
        } else {
            //create
            await axios.post('/api/products', data)
        }
        setGoToProducts(true)
    }

    function uploadImages(newImages) {
        setImages((oldImages) => [...oldImages, ...newImages])
    }

    if (goToProducts) {
        router.push('/products')
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function setProductProp(propName, value) {
        setProductProperties((prev) => {
            const newProductProps = { ...prev }
            newProductProps[propName] = value
            return newProductProps
        })
    }

    const propertiesToFill = []
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category)
        propertiesToFill.push(...catInfo.properties)
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(
                ({ _id }) => _id === catInfo?.parent?._id
            )
            propertiesToFill.push(...parentCat.properties)
            catInfo = parentCat
        }
    }

    return (
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="product name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <label>Category</label>
            <CategorySelect
                category={category}
                categories={categories}
                onSelectCategory={setCategory}
            />

            {propertiesToFill.map((p) => (
                <div key={p.name}>
                    <label>
                        {p.name[0].toUpperCase() + p.name.substring(1)}
                    </label>
                    <PropertySelector
                        property={productProperties[p.name]}
                        values={p.values}
                        onSelectValue={(value) => setProductProp(p.name, value)}
                    />
                </div>
            ))}

            {/* <ImageUpload images={images} onUpload={uploadImages} updateImagesOrder={updateImagesOrder} /> */}
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
            />

            <label>Price (in USD)</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
            />
            <SaveProductButton onSave={saveProduct} />
        </form>
    )
}

export default ProductForm
