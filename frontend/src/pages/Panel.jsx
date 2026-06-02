import { useState } from "react";
import { usePhones } from "../context/PhonesContext.jsx";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/auth.context.jsx";

const Panel = () => {
    const { phones, deletePhone, updatePhone, addPhone } = usePhones();
    const {user} = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = async (e, id, option) => {
        const form = e.target;

        if (option === "update") {
            const data = {};

            if (form.productName.value)
                data.productName = form.productName.value;

            if (form.brand.value)
                data.brand = form.brand.value;

            if (form.model.value)
                data.model = form.model.value;

            if (form.releaseYear.value)
                data.releaseYear = Number(form.releaseYear.value);

            if (form.price.value)
                data.price = Number(form.price.value);

            if (form.currency.value)
                data.currency = form.currency.value;

            const specs = {};

            if (form.display.value)
                specs.display = form.display.value;

            if (form.processor.value)
                specs.processor = form.processor.value;

            if (form.ram.value)
                specs.ram = Number(form.ram.value);

            if (form.storage.value)
                specs.storage = Number(form.storage.value);

            if (form.camera.value)
                specs.camera = Number(form.camera.value);

            if (form.battery.value)
                specs.battery = Number(form.battery.value);

            if (Object.keys(specs).length > 0)
                data.specs = specs;

            if (form.options.value)
                data.options = form.options.value.split(" ");

            if (form.inStock.value)
                data.inStock = form.inStock.value.toLowerCase() === "true";

            if (form.rating.value)
                data.rating = Number(form.rating.value);

            await updatePhone(id, data);

            setIsEditing(false);
            return;
        }

        const formData = new FormData();

        formData.append("productName", form.productName.value);
        formData.append("brand", form.brand.value);
        formData.append("model", form.model.value);
        formData.append("releaseYear", form.releaseYear.value);
        formData.append("price", form.price.value);
        formData.append("currency", form.currency.value);

        formData.append("specs[display]", form.display.value);
        formData.append("specs[processor]", form.processor.value);
        formData.append("specs[ram]", form.ram.value);
        formData.append("specs[storage]", form.storage.value);
        formData.append("specs[camera]", form.camera.value);
        formData.append("specs[battery]", form.battery.value);

        formData.append("options", form.options.value.split(" ").join(" "));
        formData.append("inStock", form.inStock.value === "true");
        formData.append("rating", form.rating.value);

        // images
        for (let i = 0; i < form.images.files.length; i++) {
            formData.append("images", form.images.files[i]);
        }

        await addPhone(formData);

        form.reset();
    };

    if (!user) {
        return (
            <h1>You should be logged in and your role should be admin to use this page</h1>
        )
    }

    return (
        <section>
            <h1>Phones</h1>

            <hr />

            <div>
                <h2>Add phone</h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e, "", "post");
                    }}
                >
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product's name" required
                    />
                    <input type="text" name="brand" placeholder="Brand" required />
                    <input type="text" name="model" placeholder="Model" required />
                    <input
                        type="number"
                        name="releaseYear"
                        placeholder="Release year"
                        required
                    />
                    <input type="number" name="price" placeholder="Price" required />
                    <input type="text" name="currency" placeholder="Currency" required />
                    <input type="text" name="display" placeholder="Display" required />
                    <input
                        type="text"
                        name="processor"
                        placeholder="Processor"
                        required
                    />
                    <input type="number" name="ram" placeholder="Ram" required />
                    <input type="number" name="storage" placeholder="Storage" required />
                    <input type="number" name="camera" placeholder="Camera" required />
                    <input type="number" name="battery" placeholder="Battery" required />
                    <input
                        type="text"
                        name="options"
                        placeholder="Enter options (leave space between words)"
                        required
                    />
                    <input
                        type="text"
                        name="inStock"
                        placeholder="Stock (true / false)"
                        required
                    />
                    <input type="number" name="rating" placeholder="Rating" required /> <br />

                    <label htmlFor="image-input">Upload phone files: </label>
                    <input type="file" id="image-input" name="images" required />

                    <button>Submit</button>
                </form>
            </div>

            <hr />

            <section>
                {phones.map((phone, ind) => (
                    <div key={ind}>
                        <h2>
                            {phone.brand} - {phone.model}
                        </h2>
                        <div>
                            {phone.images.map((imgObj, ind) => (
                                <img src={imgObj.url} key={ind} />
                            ))}
                        </div>

                        <div>
                            <h3>Specs:</h3>
                            <p>
                                <b>Battery:</b> {phone.specs.battery}
                            </p>
                            <p>
                                <b>Camera:</b> {phone.specs.camera}
                            </p>
                            <p>
                                <b>Display:</b> {phone.specs.display}
                            </p>
                            <p>
                                <b>Processor:</b> {phone.specs.processor}
                            </p>
                            <p>
                                <b>Ram:</b> {phone.specs.ram}
                            </p>
                            <p>
                                <b>Storage:</b> {phone.specs.storage}
                            </p>
                            <p>
                                <b>Release year:</b> {phone.releaseYear}
                            </p>
                        </div>

                        <p>
                            {phone.price} {phone.currency}
                        </p>
                        <p>{phone.inStock ? "In stock" : "Not in stock"}</p>

                        <div>
                            <p>
                                Rating <FaStar /> - {phone.rating}/10
                            </p>
                        </div>

                        <div>
                            <h3>Options</h3>
                            {phone.options.map((option, ind) => (
                                <p key={ind}>Option: {option}</p>
                            ))}
                        </div>

                        <div>
                            <button
                                onClick={() => setIsEditing(true)}
                                disabled={isEditing}
                            >
                                Edit phone
                            </button>

                            {isEditing && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(e, phone._id, "update");
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="productName"
                                        placeholder="Product's name"
                                    />
                                    <input
                                        type="text"
                                        name="brand"
                                        placeholder="Brand"
                                    />
                                    <input
                                        type="text"
                                        name="model"
                                        placeholder="Model"
                                    />
                                    <input
                                        type="number"
                                        name="releaseYear"
                                        placeholder="Release year"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                    />
                                    <input
                                        type="text"
                                        name="currency"
                                        placeholder="Currency"
                                    />
                                    <input
                                        type="text"
                                        name="display"
                                        placeholder="Display"
                                    />
                                    <input
                                        type="text"
                                        name="processor"
                                        placeholder="Processor"
                                    />
                                    <input
                                        type="number"
                                        name="ram"
                                        placeholder="Ram"
                                    />
                                    <input
                                        type="number"
                                        name="storage"
                                        placeholder="Storage"
                                    />
                                    <input
                                        type="number"
                                        name="camera"
                                        placeholder="Camera"
                                    />
                                    <input
                                        type="number"
                                        name="battery"
                                        placeholder="Battery"
                                    />
                                    <input
                                        type="text"
                                        name="options"
                                        placeholder="Enter options (leave space between words)"
                                    />
                                    <input
                                        type="text"
                                        name="inStock"
                                        placeholder="Stock (true / false)"
                                    />
                                    <input
                                        type="number"
                                        name="rating"
                                        placeholder="Rating"
                                    />

                                    <button>Submit</button>
                                </form>
                            )}
                        </div>

                        <div>
                            <button onClick={() => deletePhone(phone._id)}>
                                Delete phone
                            </button>
                        </div>

                        <hr />
                    </div>
                ))}
            </section>
        </section>
    );
};

export default Panel;