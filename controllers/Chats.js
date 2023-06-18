const Entity = require("../models/Chats");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .sort({ updatedAt: -1 })
    .populate("users")
    .populate({
      path: "latestMessage",
      select: "senderId content seen",
      populate: { path: "senderId", select: "name" },
    })
    .select("-latestMessage.senderId.password")
    // .populated("latestMessage.senderId")
    .then(items => {
      res.json(
        items.filter(item => {
          return (
            !item.deletedAt &&
            item.users.some(data => data._id.toString() === req.query.key)
          );
        })
      );
    })
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => res.json(item))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.params.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() => res.json(req.params.id))
    .catch(error => res.status(400).json({ error: error.message }));
