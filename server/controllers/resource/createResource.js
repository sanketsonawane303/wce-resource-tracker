import resourcesSchema from "../../models/resources.js";
import keysSchema from "../../models/keys.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const createResource = async (req, res) => {
  try {
    const { name, department, is_room, capacity, key_code } = req.body;

    const key = await keysSchema.create({
      resource_name: name,
      department,
      key_code,
    });

    const { _id: key_id } = key;

    const resource = await resourcesSchema.create({
      name,
      department,
      is_room,
      key_id,
      capacity,
    });

    sendSuccessResponse({ res, data: { resource, key } });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default createResource;
