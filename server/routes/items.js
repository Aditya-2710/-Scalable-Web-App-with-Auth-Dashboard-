const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Item = require('../models/Item');

// @route   GET api/items
// @desc    Get all items for a user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const items = await Item.find({ user: req.user.id }).sort({ date: -1 });
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/items
// @desc    Create a new item
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, description } = req.body;

    try {
        const newItem = new Item({
            title,
            description,
            user: req.user.id
        });

        const item = await newItem.save();
        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, description } = req.body;

    // Build item object
    const itemFields = {};
    if (title) itemFields.title = title;
    if (description) itemFields.description = description;

    try {
        let item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        item = await Item.findByIdAndUpdate(
            req.params.id,
            { $set: itemFields },
            { new: true }
        );

        res.json(item);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let item = await Item.findById(req.params.id);

        if (!item) return res.status(404).json({ msg: 'Item not found' });

        // Make sure user owns item
        if (item.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Item.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Item removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
