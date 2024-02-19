import config from "config/firebase.config";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import multer from "multer";
import { SendImageToStorageParams } from "./types";

export class Storage {
  private app_;
  private storage_;
  private multer_;
  constructor() {
    this.app_ = initializeApp(config.firebaseConfig);

    this.storage_ = getStorage(this.app_, "gs://teste-site-wit.appspot.com");

    this.multer_ = multer({
      storage: multer.memoryStorage(),
      limits: { fileSize: 1024 * 1024 * 3 },
    });
  }

  async sendImageToStorage(params: SendImageToStorageParams) {
    console.log("[sendImageToStorage] params", params);

    const imageName = uuidv4();
    const imageType = params.file.originalname.split(".").pop();

    const storageRef = ref(
      this.storage_,
      params.path + imageName + "." + imageType
    );

    const metadata = {
      contentType: params.file.mimetype,
    };

    const snapshot = await uploadBytesResumable(
      storageRef,
      params.file.buffer,
      metadata
    );

    const downloadUrl = await getDownloadURL(snapshot.ref);

    const response = {
      downloadUrl,
      imageName,
      imageType,
    };

    console.log("[sendImageToStorage] response", response);

    return response;
  }
}
