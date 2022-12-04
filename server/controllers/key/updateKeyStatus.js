import keysSchema from "../../models/keys.js";
import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const updateKeyStatus = async (req, res) => {
  const {
    key_id,
    request_id,
    from,
    id_link,
    photo_link,
    to,
    is_available = false,
    key_status,
  } = req.body;
  try {
    await keysSchema.findByIdAndUpdate(key_id, {
      $push: {
        holder_history: {
          from,
          to,
          id_card: id_link,
          timestamps: Date(),
          photo: photo_link,
        },
      },
      is_available,
    });
    const data = await requestsSchema.findByIdAndUpdate(
      request_id,
      {
        key_holder: { id_card: id_link, photo: photo_link },
        key_status,
      },
      { new: true, runValidators: true }
    );

    console.log(data);

    sendSuccessResponse({
      res,
      data: { ...data },
    });
  } catch (err) {
    console.log(err);
    sendFailResponse({
      err,
      res,
    });
  }
};

export default updateKeyStatus;
