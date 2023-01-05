import axios from 'axios';

export const UploadImage = async (images) => {
  let imgArr = [];
  for(const item of images){
    const formData = new FormData()

    formData.append('file', item)
    formData.append('upload_preset', 'nbdu60qm')
    formData.append('cloud_name', 'dkynltcgz')

    const { data } = await axios.post('https://api.cloudinary.com/v1_1/dkynltcgz/image/upload', formData)
    console.log(data)
    imgArr.push({public_id: data.public_id, url: data.secure_url})
  }
  return imgArr;
}