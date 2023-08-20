const mockCategories = [
    {
        _id: '1',
        name: 'Category 1',
        properties: [
            { name: 'property1', values: ['value1', 'value2'] },
            { name: 'property2', values: ['valueA', 'valueB', 'valueC'] },
        ],
    },
    {
        _id: '2',
        name: 'Category 2',
        properties: [
            { name: 'property3', values: ['optionX', 'optionY'] },
        ],
    },
];

const mockProduct = {
    _id: '123',
    title: 'Sample Product',
    description: 'This is a sample product description.',
    price: 150,
    // images: ['image-url-1', 'image-url-2'],
    // category: '1',
    // properties: {
    //     property1: 'value1',
    //     property2: 'valueA',
    // },
};

const mockUpdatedProduct = {
    ...mockProduct,
    title: 'Updated Product Title',
    description: 'Updated product description.',
    price: 200,
};

export {
    mockCategories,
    mockProduct,
    mockUpdatedProduct,
};
