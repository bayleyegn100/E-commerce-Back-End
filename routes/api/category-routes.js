const router = require('express').Router();
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint
// finding all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, as: 'products' }]
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// finding a category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// creating a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// updating a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.status(500).json(err);
    })
});

// deleting a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
