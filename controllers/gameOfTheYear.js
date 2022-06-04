const slugify = require("slugify");
const GameOfTheYear = require("../models/gameOfTheYear");

exports.create = async (req, res) => {
    try {
        console.log(req.body);

        req.body.slug = slugify(req.body.title);

        const newGameOfTheYear = await new GameOfTheYear(req.body).save();
        res.json(newGameOfTheYear);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
            code: err.code,
        });
    }
};

exports.gamesOfTheYearCount = async (req, res) => {             
    let total = await GameOfTheYear.find({ status: "Active" }).estimatedDocumentCount().exec();
    res.json(total);
};

exports.listAll = async (req, res) => {
    let gamesOfTheYear = await GameOfTheYear.find({ status: "Active" })
        .limit(parseInt(req.params.count))
        .sort([["createdAt", "asc"]]) 
        .exec();
    res.json(gamesOfTheYear);
};

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await GameOfTheYear.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            { status: "Inactive" },
            { new: true }
        ).exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.status(400).send("GameOfTheYear deleted failed");
    }
};

exports.read = async (req, res) => {
    const gameOfTheYear = await gameOfTheYear.findOne({
        slug: req.params.slug,
        status: "Active",
    }).exec();
    res.json(gameOfTheYear);
};

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();
        res.json(updated);
    } catch (err) {
        console.log("GAME UPDATE ERR ---->", err);
        res.status(400).json({
            err: err.message,
        });
    }
};

exports.list = async (req, res) => {
    console.table(req.body);
    try {
    
        const { sort, order, page } = req.body;
        const currentPage = page | 1;
        const perPage = 3;

        const gamesOfTheYear = await gamesOfTheYear.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(gamesOfTheYear);
    } catch (err) {
        console.log(err);
    }
};