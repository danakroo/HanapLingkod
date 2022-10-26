const Worker = require("../Models/Workers");
const ServiceRequest = require("../Models/ServiceRequest");
const dayjs = require("dayjs");
var isBetween = require("dayjs/plugin/isBetween");

async function checkConflict(user, workId, endTime) {
  dayjs.extend(isBetween);

  const result = await ServiceRequest.findOne({ _id: workId });
  const worker = await Worker.findOne({ _id: user });
  const { startTime } = result;
  const { unavailableTime } = worker;
  for (item of unavailableTime) {
    console.log(startTime, item.startTime);

    if (
      dayjs(startTime).isBetween(
        item.startTime,
        dayjs(item.endTime),
        null,
        "[]"
      ) ||
      dayjs(endTime).isBetween(
        item.startTime,
        dayjs(item.endTime),
        null,
        "[]"
      ) ||
      dayjs(item.startTime).isBetween(startTime, dayjs(endTime), null, "[]") ||
      dayjs(item.endTime).isBetween(startTime, dayjs(endTime), null, "[]")
    ) {
      console.log("conflict sched");
      // return res.status(400).send("some text");
      return false;
    }
  }
  console.log("no conflict sched");
  return false;
}

module.exports = checkConflict;
