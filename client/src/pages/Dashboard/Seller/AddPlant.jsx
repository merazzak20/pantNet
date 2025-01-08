import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/util";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const [uploadImage, setUploadImage] = useState({
    // image: { name: "Upload Button" },
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // submit palnt data in db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const image_url = await imageUpload(image);

    // seller info
    const sellerInfo = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };

    // create plant data object
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: image_url,
      sellerInfo,
    };
    console.table(plantData);
    // save plant data in db
    try {
      axiosSecure.post("/plants", plantData);
      toast.success("Plant added successfully");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
