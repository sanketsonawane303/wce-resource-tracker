import keysSchema from "../../models/keys.js";
import requestsSchema from "../../models/requests.js";
import fs from "fs";
import { compress } from "../../utils/compressor.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import uploadImage from "../../utils/uploadS3.js";

const updateKeyStatus = async (req, res) => {
  const { key_id, request_id, holder_history } = req.body;

  try {
    const photo = req.files.photo[0];
    const id_card = req.files.id_card[0];

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
    console.log("links", id_link, photo_link);

    await keysSchema.findByIdAndUpdate(key_id, {
      $push: {
        holder_history: {
          ...holder_history,
          id_card: id_link,
          photo: photo_link,
        },
      },
    });
    const data = await requestsSchema.findByIdAndUpdate(request_id, {
      key_holder: { id_card: id_link, photo: photo_link },
    });

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

export default updateKeyStatus;
