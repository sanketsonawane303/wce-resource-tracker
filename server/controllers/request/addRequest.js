import requestsSchema from "../../models/requests.js";
import resourcesSchema from "../../models/resources.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const addRequest = async (req, res) => {
  try {
    const {
      resources,
      time: { from, to },
      ...data
    } = req.body;

    if (Date(from) > Date(to)) throw "Invalid time period";

    const rooms = [];
    for (let i = 0; i < resources.list.length; i++) {
      const resource = await resourcesSchema.findOne({
        name: resources.list[i],
        department: resources.department,
      });

      if (!resource)
        throw `Invalid resource ${resources.list[i]} in given department ${resources.department}`;

      if (resource.is_room) rooms.push(resources.list[i]);
    }
    console.log(resources, rooms);

    const request = await requestsSchema.find({
      "resources.list": { $in: rooms },
      status: { $ne: "declined" },
      $and: [{ "time.to": { $gt: from } }, { "time.from": { $lt: to } }],
    });
    console.log(request);

    if (request.length > 0)
      throw {
        msg: "Resources already occupied for given time period",
        request,
      };

    const response = await requestsSchema.create({
      ...data,
      applicant: req.user.email,
      club: req.user.representative_club,
      time: { from, to },
      resources,
    });

    sendSuccessResponse({ res, data: response });
  } catch (err) {
    console.log(err);
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default addRequest;
