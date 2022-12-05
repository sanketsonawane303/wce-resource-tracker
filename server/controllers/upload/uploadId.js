import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";
import uploadImage from "../../utils/uploadS3.js";
import { compress } from "../../utils/compressor.js";
import fs from "fs";

const uploadId = async (req, res) => {
  try {
    const photo = req.files.photo[0];
    const id_card = req.files.id_card[0];

    console.log(photo);
    console.log(id_card);

    const { sourcePath: photoSource, destinationPath: photoDestination } =
      await compress(photo.path);
    const { sourcePath: idSource, destinationPath: idDestination } =
      await compress(id_card.path);

    const photoBlob = fs.readFileSync(photoDestination);
    const idBlob = fs.readFileSync(idDestination);

    const idData = uploadImage(id_card.originalname, idBlob);
    const photoData = uploadImage(photo.originalname, photoBlob);

    const id_link = (await idData).Location;
    const photo_link = (await photoData).Location;

    const data = { photo_link, id_link };

    sendSuccessResponse({
      res,
      data: { ...data, uploaded: req.files.length },
    });
    fs.unlinkSync(idSource);
    fs.unlinkSync(idDestination);
    fs.unlinkSync(photoSource);
    fs.unlinkSync(photoDestination);
  } catch (err) {
    console.log(err);
    sendFailResponse({
      err,
      res,
    });
  }
};

export default uploadId;
