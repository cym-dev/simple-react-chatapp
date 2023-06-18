const Entity = require("../models/Messages"),
  Chat = require("../models/Chats");

// entity/
exports.browse = (req, res) =>
  Entity.find()
    .byChatId(req.query.key)
    .populate("chatId")
    .then(items => res.json(items.filter(item => !item.deletedAt)))
    .catch(error => res.status(400).json({ error: error.message }));

// entity/save
exports.save = (req, res) =>
  Entity.create(req.body)
    .then(item => {
      Chat.findByIdAndUpdate(
        item.chatId,
        { latestMessage: item._id },
        { new: true }
      ).then(data => console.log(data));
      res.json(item);
    })
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
