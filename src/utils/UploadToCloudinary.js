

export async function uploadToCloudinary(file) {
  const cloudName = "dsl6mxqqe";
  const uploadPreset = "sanhar";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return response.json();
}
