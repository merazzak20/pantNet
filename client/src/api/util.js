import axios from "axios";

// upload image and return image url
export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  // send image into imageBB
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_HOSTING_API
    }`,
    formData
  );
  return data.data.display_url;
};

export const saveUser = async (user) => {
  // save user in db
  await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    name: user?.displayName,
    image: user?.photoURL,
    email: user.email,
  });
};
