import keysSchema from "../../models/keys.js";
import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const updateKeyStatus = async (req, res) => {
  const { key_id, request_id, from, id_link, photo_link } = req.body;
  try {
    await keysSchema.findByIdAndUpdate(key_id, {
      $push: {
        holder_history: {
          from,
          to: { role: req.user.role[0], email: req.user.email },
          id_card: id_link,
          timestamps: Date(),
          photo: photo_link,
        },
      },
    });
    const data = await requestsSchema.findByIdAndUpdate(
      request_id,
      {
        key_holder: { id_card: id_link, photo: photo_link },
      },
      { new: true, runValidators: true }
    );

    console.log(data);

    sendSuccessResponse({
      res,
      data: { ...data, uploaded: req.files.length },
    });
  } catch (err) {
    sendFailResponse({
      err,
      res,
    });
  }
};

export default updateKeyStatus;
