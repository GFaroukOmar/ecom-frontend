import {useParams} from "react-router-dom";
import {useEffect, useState,useRef} from "react";
import {adminRoute, publicRoute, uploadProductImage, uploadVariationImage} from "../../api";
import {useNotification} from "../../hooks/NotificationContext";
import DragAndDropFiles from "../../components/in-components-reuseable-components/DragAndDropFiles";
import {Editor} from "primereact/editor";
import Loader from "../../components/in-pages-reuseable-components/Loader";
import Select from "react-select";
const updateProduct=(product,oldProduct)=>{
    // update information with
    // productName, quantity,
    // attributes, images, badges and variations like
    // attributes:{attributeId,name:"newName",values:[{valueId:1,value:"New Value"}]"}
    // images:[{imageId:"",imageUrl:"",isMainImage:""}]
    // badges:[{badgeId:"",name:"",backgroundColor:"",textColor:""}]
    // check if value exists in attribute with attributeId,
    // variations:[variationId:"",variationImageUrl:"",attributeValues:[{attributeId:"",valueId:"",value:""}]]
    // upload new product images
    // upload new variations images
}
const createProduct = async (product, addNotification, setVariations) => {
    const mapVariationIds = (frontendVariations, backendVariations = []) => {
        return frontendVariations.map((frontendVariation, index) => ({
            ...frontendVariation,
            variationId: backendVariations[index]?.variationId || frontendVariation.variationId, // Replace temp ID
        }));
    };
    console.log("product variation \n"+JSON.stringify(product.variations[0]))
    console.log("product variations in update shit",product.variations)
    let variations = product.variations?.map(variation => ({
        ...variation,
        variationImageUrl: variation.variationImageUrl || null, // Ensure this is preserved
        quantity: variation.quantity || 0,
        attributes: [...variation.attributeValues] || [],
    })) || [];


    let badges = product.badges?.map(b => ({
        name: b.name,
        backgroundColor: b.backgroundColor,
        textColor: b.textColor,
    })) || [];
    // Prepare product data

    console.log(product.attributes[0])
    let attributes = product.attributes?.map(attr => ({
        ...attr,
        name: attr.name || attr.attributeName,
        values: attr.values
            .filter(v => v.value && v.value.trim() !== "") // Filter out empty or invalid values
            .map(v => ({ value: v.value })),
    })) || [];


    const payload = {
        productName: product.productName,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        discountPrice: product.discountPrice,
        discountEndTime: product.discountEndTime,
        category_ids: product.categories,
        image_ids: [],
        badges,
        attributes,
        variations,
    };

    let productId = null;
    let updatedVariations = [];

    try {
        console.log(payload);
        let response = await adminRoute.post("/product", payload);
        productId = response.data.productId;

        if (product.variations && response.data.variations) {

            if (product.variations && response.data.variations) {
                updatedVariations = mapVariationIds(product.variations, response.data.variations);
            }


        }

        // addNotification("success", "Success", "Product Created Successfully");
    } catch (e) {
        console.log(payload);
        console.log(e.response.data)
        // addNotification("error", "Product Creation Error", e.response.data.detail);
        return;
    }

    // Upload images to the product ID
    // console.log("Uploading images start");

    // Use updated variations directly
    const imageUploads = product.images?.map(i =>
        uploadProductImage(i.imageUrl, i.isMainImage, productId)
            .then(() => addNotification("success", "Product Image", "Product Image Uploaded Successfully"))
            // .catch(e => addNotification("error", "Product Image", e.response.data.detail))
    );

    console.log("first updated variation object",updatedVariations[0])
    const variationImageUploads = updatedVariations
        .filter(v => v.variationImageUrl) // Skip variations without image URLs
        .map(v =>
            uploadVariationImage(v.variationImageUrl, v.variationId)
                .then(() => addNotification("success", "Variation Image", "Variation Image Uploaded Successfully"))
        );

    // Wait for all uploads to complete if needed
    await Promise.all([...imageUploads, ...variationImageUploads]);
};
const VariationsForm = ({ attributes = [], parentVariations = [], parentSetState }) => {
    const [localVariations, setLocalVariations] = useState(parentVariations);
    const prevParentVariationsRef = useRef(parentVariations);

    // Sync local variations when parent variations change
    useEffect(() => {
        if (prevParentVariationsRef.current !== parentVariations) {
            setLocalVariations(parentVariations);
            prevParentVariationsRef.current = parentVariations;
        }
    }, [parentVariations]);

    // Update parent state when local variations change
    useEffect(() => {
        if (prevParentVariationsRef.current !== localVariations) {
            parentSetState(localVariations);
            prevParentVariationsRef.current = localVariations;
        }
    }, [localVariations, parentSetState]);

    // Add a new variation
    const addVariation = () => {
        if (attributes.some(attribute => attribute.values.length === 0)) {
            alert("Please ensure all attributes have at least one value before adding a variation.");
            return;
        }

        const newVariation = {
            variationId: Date.now(),
            quantity: 100,
            variationImageUrl: null,
            attributeValues: attributes.map(attribute => ({
                attributeId: attribute.attributeId,
                valueId: attribute.values[0].valueId,
                value: attribute.values[0].value,
                attributeName: attribute.attributeName,
            })),
        };

        setLocalVariations(prev => [...prev, newVariation]);
    };

    // Handle drag-and-drop image changes
    const setImage = (image, variationId) => {

        setLocalVariations(prevVariations =>
            prevVariations.map(variation => {
                    if(variation.variationId === variationId) {
                        console.log("image object",image)
                        console.log("updated variation iobject",{...variation, variationImageUrl: image[0]?.imageUrl})
                        return {...variation, variationImageUrl: image[0]?.imageUrl}
                    }
                        else return variation
                }
            )
        );
    };

    // Update variation quantity
    const setVariationQuantity = (variationId, quantity) => {
        setLocalVariations(prevVariations =>
            prevVariations.map(variation =>
                variation.variationId === variationId
                    ? { ...variation, quantity }
                    : variation
            )
        );
    };
    const changeAttributeValue = (variationId, attributeId, valueId) => {
        const updatedVariations = localVariations.map((variation) => {
            if (variation.variationId === variationId) {
                const updatedAttributes = variation.attributeValues.map((attribute) => {
                    if (attribute.attributeId === attributeId) {
                        const newValue = attributes
                            .find((attribute) => attribute.attributeId === attributeId)
                            .values.find((value) => value.valueId === valueId);
                        return { ...attribute, value: newValue.value,valueId:newValue.valueId };
                    }
                    return attribute;
                });
                return { ...variation, attributeValues: updatedAttributes };
            }
            return variation;
        });

        setLocalVariations(updatedVariations);
        // parentSetState(updatedVariations);
    };

    if (!attributes.length) {
        return (
            <div>
                <button disabled className="btn btn-success">
                    Add New Variation
                </button>
                <h4 className={"mt-2"}>Create some Attributes first to add variations</h4>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-3 d-flex gap-2">
                <button onClick={addVariation} className="btn btn-success">
                    Create New Variation
                </button>
            </div>

            {localVariations.length === 0 ? (
                <div className="alert alert-info">
                    No variations added yet. Click "Add Variation" to get started.
                </div>
            ) : (
                <div className="accordion" id="variationsAccordion">
                    {localVariations.map((variation, index) => (
                        <div key={index} className="accordion-item">
                            <h2 className="accordion-header" id={`heading-${index}`}>
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${index}`}
                                    aria-expanded={index === 0 ? "true" : "false"}
                                    aria-controls={`collapse-${index}`}
                                >
                                    Variation {index}
                                </button>
                            </h2>
                            <div
                                id={`collapse-${index}`}
                                className="accordion-collapse collapse"
                                aria-labelledby={`heading-${index}`}
                                data-bs-parent="#variationsAccordion"
                            >
                                <div className="accordion-body">
                                    <label>Select Attributes</label>
                                    <div className="d-flex container gap-3 align-items-center">
                                        {attributes.map((attribute, attributeIndex) => (
                                            <div key={attributeIndex} className="mb-2">
                                                <label
                                                    htmlFor={`attribute-${attribute.attributeId}`}
                                                    className="form-label"
                                                >
                                                    {attribute.attributeName}
                                                </label>

                                                <select
                                                    id={`attribute-${attribute.attributeId}`}
                                                    className="form-select"
                                                    onChange={(e) =>
                                                        changeAttributeValue(
                                                            variation.variationId,
                                                            attribute.attributeId,
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    value={variation.attributeValues
                                                        .map(attributeValue => {
                                                            if (attributeValue.attributeId === attribute.attributeId)
                                                                return attributeValue.valueId;
                                                            return null;
                                                        })[0] || ""}
                                                >
                                                    <option disabled value="">
                                                        Select {attribute.attributeName}
                                                    </option>
                                                    {attribute.values.map((value, valueIndex) => (
                                                        <option key={valueIndex} value={value.valueId}>
                                                            {value.value}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>

                                    <label className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={variation.quantity}
                                        onChange={e =>
                                            setVariationQuantity(
                                                variation.variationId,
                                                parseInt(e.target.value, 10)
                                            )
                                        }
                                    />
                                    <DragAndDropFiles
                                        onImagesChange={image => setImage(image, variation.variationId)}
                                        initialImages={variation.variationImageUrl ? [{ imageUrl: variation.variationImageUrl }] : []}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ValueField = ({ valueText, onRemoveValue, onValueTextChange, attributeId,valueId, showError, isRemovable }) => {
    return (
        <div >
            <div className="d-flex align-items-center ">
                <input
                    type="text"
                    value={valueText}
                    onChange={(e) => onValueTextChange(attributeId,valueId, e.target.value)} // Update text when changed
                    className={`form-control me-2 ${showError ? 'is-invalid' : ''}`}
                    placeholder="Enter value"
                />
                <button
                    onClick={() => onRemoveValue(attributeId,valueId)} // Remove value when clicked
                    className="btn btn-danger btn-sm"
                    disabled={!isRemovable} // Disable button if not removable
                >
                    &#10006; {/* X icon for remove */}
                </button>
            </div>
            <div >
                {showError && <div className="text-danger">Value text cannot be empty.</div>}
            </div>
        </div>
    );
};


const AttributeField = ({onRemoveAttribute, onChangeAttributeName, attributeName, attributeId, values = [],
                            onRemoveValue, onValueTextChange, onAddValue, showAttributeError}) => {
    const showValueErrors = values.map((value) => !value.value); // Check for empty values

    return (
        <div style={{ width: '300px' }} className="border p-3 mb-4 rounded shadow-sm">
            <label className="form-label">Attribute Name*</label>
            <div className={'mb-3'}>
                <div className="d-flex justify-content-between align-items-center ">
                    <input
                        value={attributeName}
                        onChange={(e) => onChangeAttributeName(attributeId, e.target.value)} // Handle attribute name change
                        type="text"
                        className={`form-control me-2 ${showAttributeError ? 'is-invalid' : ''}`}
                        placeholder="Attribute name"
                    />
                    <button
                        onClick={() => onRemoveAttribute(attributeId)} // Remove attribute when clicked
                        className="btn btn-danger btn-sm"
                    >
                        Remove
                    </button>
                </div>
                {showAttributeError && <div className="text-danger">Attribute name required.</div>}
            </div>
            <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column flex-wrap gap-3">
                    {values.map((v, index) => (
                        <ValueField
                            key={index}
                            valueText={v.value}
                            onValueTextChange={onValueTextChange}
                            valueId={v.valueId}
                            attributeId={attributeId}
                            onRemoveValue={() => onRemoveValue(attributeId, v.valueId)} // Remove value when clicked
                            showError={showValueErrors[index]} // Show error for empty value
                            isRemovable={values.length > 1} // Allow removal only if there's more than one value
                        />
                    ))}
                </div>
                <button
                    onClick={() => onAddValue(attributeId)} // Add value when clicked
                    className="btn btn-primary btn-sm w-100"
                >
                    Add Value
                </button>
            </div>
        </div>
    );
}


const AttributeForm = ({ parentSetState,initialAttributes=[] }) => {
    const [attributes, setAttributes] = useState(initialAttributes);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        parentSetState(attributes);
    }, [attributes]);

    // Add new attribute with at least one value
    const addAttribute = () => {
        if (attributes.length && !attributes.some(attr => attr.attributeName && attr.values.length > 0)) {
            setErrors(['Attribute name cannot be empty and must have at least one value.']);
            return;
        }
        const newAttribute = {
            attributeId: Date.now(),
            attributeName: `Attribute ${attributes.length + 1}`,
            values: [{ valueId: Date.now(), value: '' }] // Add at least one value by default
        };
        setAttributes([...attributes, newAttribute]);
        setErrors([]);
    };

    // change attribute name
    const changeAttributeName = (attributeId, newName) => {
        setAttributes(attributes.map(attr =>
            attr.attributeId === attributeId ? { ...attr, attributeName: newName } : attr
        ));
    }

    // Remove an attribute
    const removeAttribute = (attributeId) => {
        setAttributes(attributes.filter(attr => attr.attributeId !== attributeId));
    };

    // Add a new value to an attribute
    const addValue = (attributeId) => {
        const updatedAttributes = attributes.map(attr => {
            if (attr.attributeId === attributeId) {
                return { ...attr, values: [...attr.values, { valueId: Date.now(), value: '' }] };
            }
            return attr;
        });
        setAttributes(updatedAttributes);
    };

    // Remove a value from an attribute (ensuring there's always at least one value)
    const removeValue = (attributeId, valueId) => {
        const updatedAttributes = attributes.map(attr => {
            if (attr.attributeId === attributeId) {
                // Ensure there's always at least one value in the attribute
                if (attr.values.length > 1) {
                    const updatedValues = attr.values.filter(value => value.valueId !== valueId);
                    return { ...attr, values: updatedValues };
                }
            }
            return attr;
        });
        setAttributes(updatedAttributes);
    };

    // Change the text of a value
    const changeValueText = (attributeId,valueId, newValueText) => {
        const updatedAttributes1 = attributes.map(attr => {
            if (attr.attributeId === attributeId) {
                const updatedValues1=attr.values.map(value=>{
                    if(value.valueId===valueId)
                        return {...value,value:newValueText}
                    return value
                })
                return{...attr,values:updatedValues1}
            }
            return attr
        })
        setAttributes(updatedAttributes1)
        // const updatedAttributes = attributes.map(attr => {
        //     const updatedValues = attr.values.map(value => {
        //         if (value.valueId === valueId) {
        //             return { ...value, value: newValueText }; // Update value text
        //         }
        //         return value;
        //     });
        //     return { ...attr, values: updatedValues };
        // });
        // setAttributes(updatedAttributes);
    };


    return (
        <div >
            {errors.length > 0 && (
                <div className="alert alert-danger" role="alert">
                    {errors.join(', ')}
                </div>
            )}
            <button onClick={addAttribute} className="btn btn-success mb-3 ">
                Add New Attribute
            </button>
            <div className={'d-flex gap-3 flex-wrap'}>
                {attributes.map((a,index) => (
                    <AttributeField
                        key={index}
                        attributeId={a.attributeId}
                        attributeName={a.attributeName}
                        values={a.values}
                        onRemoveAttribute={removeAttribute}
                        onChangeAttributeName={changeAttributeName}
                        onAddValue={addValue}
                        onRemoveValue={removeValue}
                        onValueTextChange={changeValueText}
                        showAttributeError={!a.attributeName} // Show error for empty attribute name
                    />
                ))}
            </div>

        </div>
    );
};



const BadgesForm = ({ parentSetState ,initialBadges=[]}) => {
    const [badges, setBadges] = useState(initialBadges);

    useEffect(() => {
        parentSetState(badges);
    }, [badges]);

    const addBadge = () => {
        setBadges([...badges, { badgeId: Date.now(), name: '', backgroundColor: '#ffffff', textColor: '#000000' }]);
    };

    const deleteBadge = (badgeId) => {
        setBadges(badges.filter(b => b.badgeId !== badgeId));
    };

    const changeColor = (badgeId, backgroundColor) => {
        setBadges(badges.map(b => b.badgeId === badgeId ? { ...b, backgroundColor } : b));
    };

    const changeTextColor = (badgeId, textColor) => {
        setBadges(badges.map(b => b.badgeId === badgeId ? { ...b, textColor } : b));
    };

    const changeName = (badgeId, name) => {
        setBadges(badges.map(b => b.badgeId === badgeId ? { ...b, name } : b));
    };

    return (
        <div className={'w-100'}>

            <button className="btn btn-success mb-3" onClick={addBadge}>
                Add New Badge
            </button>

            <div className="d-flex flex-wrap justify-content-start gap-3">
                {badges.map((badge,index) => (
                    <div
                        key={index}
                        className="badge-card p-3 border rounded shadow-sm flex-shrink-0"
                        style={{ width: '300px' }}
                    >
                        <div className="mb-3">

                            <label htmlFor={`badge-name-${badge.badgeId}`} className="form-label">Badge Name *</label>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <input
                                    value={badge.name}
                                    onChange={(e) => changeName(badge.badgeId, e.target.value)}
                                    type="text"
                                    className={`form-control me-2 ${!badge.name ? 'is-invalid' : ''}`}
                                    placeholder="Badge name"
                                />
                                <button
                                    onClick={() => deleteBadge(badge.badgeId)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Remove
                                </button>
                            </div>
                            <div >
                                {!badge.name && <div className="text-danger">Badge name is required.</div>}
                            </div>

                        </div>

                        <div className="mb-3">
                            <label htmlFor={`badge-bg-color-${badge.badgeId}`} className="form-label">Background Color</label>
                            <input
                                id={`badge-bg-color-${badge.badgeId}`}
                                type="color"
                                value={badge.backgroundColor}
                                onChange={(e) => changeColor(badge.badgeId, e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor={`badge-text-color-${badge.badgeId}`} className="form-label">Text Color</label>
                            <input
                                id={`badge-text-color-${badge.badgeId}`}
                                type="color"
                                value={badge.textColor}
                                onChange={(e) => changeTextColor(badge.badgeId, e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <button
                                className="btn btn-danger w-100"
                                onClick={() => deleteBadge(badge.badgeId)}
                            >
                                Delete Badge
                            </button>
                        </div>

                        {/* Badge Preview */}
                        {/*<div className="mt-3 text-center">*/}
                        {/*    <p>Badge Preview:</p>*/}
                        {/*    <Badge textColor={badge.textColor} backgroundColor={badge.backgroundColor}>*/}
                        {/*        {badge.name || 'Unnamed Badge'}*/}
                        {/*    </Badge>*/}
                        {/*</div>*/}
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProductInformation = ({ parentSetState,setCategories,initialProductInformation}) => {
    const [productInformation, setProductInformation] = useState(
        initialProductInformation
    );

    const [errors, setErrors] = useState({});
    useEffect(() => {
        parentSetState(productInformation);
    }, [productInformation]);

    const validateForm = () => {
        let formErrors = {};

        // Product Name Validation
        if (!productInformation.productName?.trim()) formErrors.productName = "Product name is required";

        // Price Validation
        if (productInformation.price === null || productInformation.price === undefined ) formErrors.price = "Price is required ";
        else if (productInformation.price <0) formErrors.price = "Price cannot be negative ";

        // Discount Price Validation
        if (productInformation.discountPrice && productInformation.discountPrice < 0) {
            formErrors.discountPrice = "Discount price cannot be negative";
        }
        if (productInformation.quantity && productInformation.quantity < 0) {
            formErrors.quantity = "Quantity cannot be negative";
        }

        // Discount End Time Validation (can be null, but if present it needs to be valid)
        if (productInformation.discountEndTime && isNaN(new Date(productInformation.discountEndTime).getTime())) {
            formErrors.discountEndTime = "Invalid discount end time";
        }

        setErrors(formErrors);
        return formErrors;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProductInformation({
            ...productInformation,
            [id]: value
        });

        // Perform real-time validation when inputs change
        validateForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form one last time on submit
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
        }
    };

    return (
        <form  onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="product-name" className="form-label">Product Name *</label>
                    <input
                        type="text"
                        id="productName"
                        value={productInformation.productName}
                        onChange={handleChange}
                        className={`form-control ${errors.productName ? 'is-invalid' : ''}`}
                    />
                    {errors.productName && <div className="invalid-feedback">{errors.productName}</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="product-price" className="form-label">Price *</label>
                    <input min={0}
                           type="number"
                           id="price"
                           value={productInformation.price}
                           onChange={handleChange}
                           className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="product-discount-price" className="form-label">Discount Price</label>
                    <input
                        type="number"
                        id="discountPrice"
                        value={productInformation.discountPrice}
                        onChange={handleChange}
                        className={`form-control ${errors.discountPrice ? 'is-invalid' : ''}`}
                    />
                    {errors.discountPrice && <div className="invalid-feedback">{errors.discountPrice}</div>}
                </div>

                <div className="col-md-6">
                    <label htmlFor="product-discount-end-time" className="form-label">Discount End Time</label>
                    <input min={0}
                           type="datetime-local"
                           id="discountEndTime"
                           value={productInformation.discountEndTime}
                           onChange={handleChange}
                           className={`form-control ${errors.discountEndTime ? 'is-invalid' : ''}`}
                    />
                    {errors.discountEndTime && <div className="invalid-feedback">{errors.discountEndTime}</div>}
                </div>

            </div>
            <div className={'row mb-3'}>
                <div className={'col-md-6'}>
                    <label htmlFor="quantity" className="form-label">Stock Quantity</label>
                    <input value={productInformation.quantity} id={"quantity"} onChange={handleChange} type={"number"} min={0}
                           className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    />
                    {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                </div>
                <div className={'col-md-6'}>
                    <CategoriesSelect initialSelectedCategories={productInformation.categories?.map(category=>category.categoryId)} parentSetState={setCategories} />
                </div>
            </div>
            <div className="row mb-3">
                {/*<h5>Select Product Images</h5>*/}
                <div className={'col-md-6'}>
                    <label className="form-label">Images</label>
                    <DragAndDropFiles
                        initialImages={productInformation.images}
                        onImagesChange={(images) =>
                            setProductInformation({
                                ...productInformation,
                                images
                            })
                        }
                    />
                </div>
                <div className={'col-md-6'}>
                    <label className="form-label">Description</label>
                    <Editor value={productInformation.description}   style={{minHeight:80}} onTextChange={(e)=>{setProductInformation({...productInformation,description: e.htmlValue})}} />
                </div>
            </div>

        </form>
    );
};

// ready to refactor
const CategoriesSelect = ({ parentSetState, initialSelectedCategories = []}) => {
    const [categories, setCategories] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories);
    const { addNotification } = useNotification();

    useEffect(() => {
        // Fetch categories data
        adminRoute
            .get("/categories")
            .then((data) => setCategories(data.data))
            .catch((e) =>
                addNotification("error", "Network Error", e.message)
            );
    }, []);

    useEffect(() => {
        // Update parent state whenever selected categories change
        parentSetState(selectedCategories);
    }, [selectedCategories]);

    const handleMultiSelectChange = (selectedOptions) => {
        // Extract IDs from selected options and update state
        const selectedIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setSelectedCategories(selectedIds);
    };

    if (!categories) {
        return (
            <div className="d-flex flex-column gap-1 flex-wrap">
                {/*<div className="d-flex gap-4">*/}
                <label className="form-label">Select Categories</label>
                {!categories && <Loader />}
                {/*</div>*/}
            </div>
        );
    }

    // Map categories to options for the multi-select
    const categoryOptions = categories.map((category={categoryId:0}) => ({
        value: category.categoryId,
        label: category.name,
    }));

    // Map selected categories to the correct options for the multi-select
    const selectedOptions = categoryOptions.filter((option) =>
        selectedCategories.includes(option.value)
    );

    return (
        <>
            {/*<div className="d-flex gap-4">*/}
            <label htmlFor="quantity" className="form-label">Select Categories</label>
            <Select
                options={categoryOptions}
                value={selectedOptions}
                onChange={handleMultiSelectChange}
                isMulti
                placeholder="Select categories..."
                classNamePrefix="react-select"
            />
            {/*</div>*/}
        </>
    );
};




const CreateEditProduct=({mode="create"})=>{
    const [product, setProduct] = useState(null)
    const [initialProduct, setInitialProduct] = useState(null)
    const { productId } = useParams();
    const {addNotification}=useNotification()
    useEffect(() => {
        if(productId && mode === "edit") {
            adminRoute.get(`/product/${productId}`).then(response => {

                setProduct({
                    ...response.data,
                    variations:response.data.variations
                        .map(variation=>({
                            ...variation,
                            attributes:variation.attributeValues.map(attributeValue=>({
                                ...attributeValue,
                                attributeName:response.data.attributes.find(attr=> {
                                    console.log("attribute inside loop",attr)
                                    return attr.attributeId === attributeValue.attributeId
                                })?.name
                            }))
                        }))
                })


                setInitialProduct(response.data)
            }).catch(e =>
                addNotification('error', 'Network Error', 'cannot get product')
            )
        }
    }, []);


    const setProductInformation=(productInformation)=>{
        setProduct({...product,...productInformation})
    }
    const setBadges=(badges)=>{
        setProduct({...product,badges})
    }
    const setCategories=(categories)=>{
        setProduct({...product,categories})
    }
    const setVariations=(variations)=>{
        if(product.attributes)
            setProduct({...product,variations})
        else setProduct({...product,variations:[]})
    }
    const setAttributes=(attributes)=>{
        if(attributes.length===0)
            setProduct({...product,variations:[],attributes:[]})
        else
            setProduct({...product,attributes})
    }
    const variationMaker2000=(variation)=>({
        variationId:variation.variationId,
        variationImageUrl:variation.variationImageUrl,
        attributeValues:variation.attributeValues?.map(attributeValue=>({
            attributeId:attributeValue.attributeId,
            value: {
                valueId:attributeValue.valueId,
                value:attributeValue.value,
            }
        }))
    })
    if(mode==="edit" && product==null)
        return (
            <Loader/>
        )
    return (
        <div className={"container d-flex flex-column gap-4 w-100"} >
            <h1>Edit Product </h1>
            {/* Product Information Accordion */}
            <div className="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".collapse-product-info"
                            aria-expanded="true"
                            aria-controls="collapse-product-info"
                        >
                            Product Information
                        </button>
                    </h2>
                    <div className="accordion-collapse collapse show collapse-product-info">
                        <div className="accordion-body">
                            <ProductInformation
                                initialProductInformation={product ? {
                                    productName: product.productName,
                                    price: product.price,
                                    discountPrice: product.discountPrice,
                                    discountEndTime: product.discountEndTime,
                                    quantity: product.quantity,
                                    description: product.description,
                                    categories: product.categories,
                                    images: product.images,
                                }:{}}
                                parentSetState={setProductInformation}
                                setCategories={setCategories}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges Accordion */}
            <div className="accordion">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target=".collapse-badges"
                            aria-expanded="false"
                            aria-controls="collapse-badges"
                        >
                            Manage Badges
                        </button>
                    </h2>
                    <div className="accordion-collapse collapse collapse-badges">
                        <div className="accordion-body">
                            <BadgesForm
                                initialBadges={product?.badges}
                                parentSetState={setBadges}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Attributes and Variations Accordion */}
            <div className="accordion" id="attributesVariationsAccordion">
                {/* Manage Attributes Section */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseAttributes"
                            aria-expanded="false"
                            aria-controls="collapseAttributes"
                        >
                            Manage Attributes
                        </button>
                    </h2>
                    <div
                        id="collapseAttributes"
                        className="accordion-collapse collapse"
                        data-bs-parent="#attributesVariationsAccordion"
                    >
                        <div className="accordion-body">
                            <AttributeForm
                                initialAttributes={product?.attributes?.map((attr) => ({
                                    ...attr,
                                    attributeName: attr.name,

                                    values: attr.values.map((v) => ({
                                        ...v,
                                        value: v.value,
                                    })),
                                }))}
                                parentSetState={setAttributes}
                            />
                        </div>
                    </div>
                </div>

                {/* Manage Variations Section */}
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseVariations"
                            aria-expanded="false"
                            aria-controls="collapseVariations"
                        >
                            Manage Variations
                        </button>
                    </h2>
                    <div
                        id="collapseVariations"
                        className="accordion-collapse collapse"
                        data-bs-parent="#attributesVariationsAccordion"
                    >
                        <div className="accordion-body">
                            <VariationsForm
                                parentVariations={product?.variations}
                                attributes={product?.attributes}
                                parentSetState={setVariations}
                            />
                        </div>
                    </div>
                </div>
            </div>



            <div className={"d-flex justify-content-center"}>
                <button
                    onClick={()=>createProduct(product,addNotification,setVariations)}

                    style={{ backgroundColor: 'black',borderRadius:8,marginBottom:32, color: 'white', width: 360, height: 64 }}
                >
                    Submit
                </button>
            </div>

        </div>
    );
}

export default CreateEditProduct

