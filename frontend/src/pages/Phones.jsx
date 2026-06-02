import { usePhones } from "../context/PhonesContext"
import { CiStar } from "react-icons/ci";

const Phones = () => {
  const { phones } = usePhones();

  return (
    <section>
      <h1>Phones</h1>
      <hr />
      {phones.map(phone => (
        <div key={phone._id} className={phone._id}>
          {/* Fixed "phones.model" to "phone.model" */}
          <h2>{phone.brand} - {phone.model}</h2>
          
          <div>
            {/* Fixed: changed curly braces to parentheses and used imgObj.url */}
            {phone.images.map((imgObj, ind) => (
              <img key={imgObj.public_Id || ind} src={imgObj.url} alt={`${phone.brand} ${ind}`} />
            ))}
          </div>

          <div>
              <h3>Specs:</h3>
              <p><b>Battery:</b> {phone.specs.battery}</p>
              <p><b>Camera:</b> {phone.specs.camera}</p>
              <p><b>Display:</b> {phone.specs.display}</p>
              <p><b>Processor:</b> {phone.specs.processor}</p>
              <p><b>Ram:</b> {phone.specs.ram}</p>
              <p><b>Storage:</b> {phone.specs.storage}</p>
              <p><b>Release year:</b> {phone.releaseYear}</p>
          </div>

          <p>{phone.price} {phone.currency}</p>
          <p>{phone.inStock ? "In stock" : "Not in stock"}</p>

          <div>
            <p>Rating <CiStar /> - {phone.rating}/10</p>
          </div>

          <div>
              <h3>Options</h3>
              {phone.options.map((option, ind) => (
                  <p key={ind}>Option: {option}</p>
              ))}
          </div>
          <hr />
        </div>
      ))}
    </section>
  );
};

export default Phones;