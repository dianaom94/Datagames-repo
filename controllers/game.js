const slugify = require("slugify");
const Game = require("../models/game");

exports.create = async (req, res) => {
    try {
        console.log(req.body);

        req.body.slug = slugify(req.body.title);

        const newGame = await new Game(req.body).save();
        res.json(newGame);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message,
            code: err.code,
        });
    }
};

exports.gamesCount = async (req, res) => {             //estimate nos entrega la cantidad de documentos 
    let total = await Game.find({ status: "Active" }).estimatedDocumentCount().exec();
    res.json(total);
};

exports.listAll = async (req, res) => {
    let games = await Game.find({ status: "Active" })
        .limit(parseInt(req.params.count))//parsear para convertir a entero con un limite
        .sort([["createdAt", "asc"]]) //lo ordenamos en ascendentev
        .exec();
    res.json(games);
};

exports.removeSoft = async (req, res) => {
    try {
        const deleted = await Game.findOneAndUpdate(
            {
                slug: req.params.slug,
            },
            { status: "Inactive" },
            { new: true }
        ).exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Game deleted failed");
    }
};

exports.read = async (req, res) => {
    const game = await Game.findOne({
        slug: req.params.slug,
        status: "Active",
    }).exec();
    res.json(game);
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
        // createdAt/updatedAt, desc/asc, 3
        const { sort, order, page } = req.body;
        const currentPage = page | 1;
        const perPage = 3;

        const games = await game.find({ status: "Active" })
            .skip((currentPage - 1) * perPage)
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(games);
    } catch (err) {
        console.log(err);
    }
};