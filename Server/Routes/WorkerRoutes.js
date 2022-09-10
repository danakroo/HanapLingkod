const express = require("express");
const router = express.Router();
const Worker = require("../Models/Workers");

router.route("/Worker").get(function (req, res) {
  Worker.find({}, function (err, found) {
    if (found) {
      res.send(found);
    } else {
      res.send("No such data found");
    }
  });
});

//////specific///

router
  .route("/Worker/:id")
  .get(function (req, res) {
    Worker.findOne({ _id: req.params.id }, function (err, found) {
      if (found) {
        res.send(found);
      } else {
        res.send("No such data found");
      }
    });
  })
  .put(function (req, res) {
    Worker.findOneAndUpdate(
      { _id: req.params.id },
      {
        profilePic: "psssic",
      },
      function (err) {
        if (!err) {
          res.send("Updated Successfully");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    Worker.findOneAndDelete({ _id: req.params.id }, function (err) {
      if (!err) {
        res.send("Deleted Successfully");
      } else {
        res.send(err);
      }
    });
  });

module.exports = router;