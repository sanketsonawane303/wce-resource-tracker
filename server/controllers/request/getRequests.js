import requestsSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getRequests = async (req, res) => {
  try {
    const { filter } = req.query;

    let requests = [];

    if (filter === "true") {
      const { role } = req.user;

      if (role.includes("representative"))
        requests.push(
          ...(await requestsSchema.find({ applicant: req.user.email }).sort('-updatedAt'))
        );
      if (role.includes("advisor"))
        requests.push(
          ...(await requestsSchema.find({
            club: { $in: req.user.advisor_club },
          }))
        );
      if (role.includes("hod"))
        requests.push(
          ...(await requestsSchema.find({
            "resources.department": req.user.department,
          }))
        );
      if (role.includes("helper")) {
        const { keystatus } = req.query;

        if (req.user.department !== "WCE")
          requests.push(
            ...(await requestsSchema.find({
              "resources.department": req.user.department,
              key_status: keystatus,
              status: "approved",
            }))
          );
        else
          requests.push(
            ...(await requestsSchema.find({
              status: "approved",
              key_status: keystatus,
            }))
          );
      }
    } else requests = await requestsSchema.find({});

    if (!requests) throw "Requests not found";

    sendSuccessResponse({ res, data: requests });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getRequests;
