const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        /* const category = await new Category( { name, slug: slugify(name ) } ).save();
        res.json(category) */
        res.json(await new Category({ name, slug: slugify(name) }).save())
    } catch (err) {
        res.status(400).send("Create Category failed")
    }
}

exports.list = async (req, res) =>
    res.json(
        await Category.find({ status: "Active" }).sort({ createdAt: -1 }).exec()
    );

exports.read = async (req, res) => {
    let category = await Category.findOne({
        slug: req.params.slug,
        status: "Active",
    }).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const { name, status } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name), status },
            { new: true }
        ).exec();
        res.json(updated);
    } catch (err) {
        res.status(400).send("Category update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
};

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { status: "Inactive" },
            { new: true }
        );
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
};
