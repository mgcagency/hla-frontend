import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {IMAGES} from "../assets/index";

export const uploadFile = async (photo) => {
    if (photo === "") {
      return IMAGES.teacher_avatar;
    }
    const storage = getStorage();
    const storageRef = ref(storage, photo?.name);

    // 'file' comes from the Blob or File API
    const response = await uploadBytes(storageRef, photo);
    const fileUrl = await getDownloadURL(response.ref);
    return fileUrl;
  };