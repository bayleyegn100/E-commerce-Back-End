const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// finding all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, as: 'products' }]
    });
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// finding a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creating a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});
// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that ID!' });
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
