const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const { create, gamesCount, listAll, removeSoft, read, update, list } = require("../controllers/game");



// routes
router.post("/game", authCheck, adminCheck, create);
/**
 * @swagger
 * /game:
 *   post:
 *     tags:
 *       - name: "Game"
 *     summary: "All Games Active"
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200: 
 *          description: ok   
 */

router.get("/games/total", gamesCount);

/**
 * @swagger
 * /games/{count}:
 *   get:
 *     tags:
 *       - name: "Game"
 *     summary: "All games active by count"
 *     parameters:
 *       - name: "count"
 *         in: "path"
 *         description: "count game search"
 *         required: true
 *         type: "integer"
 *         format: "int64"
 *     responses:
 *       200: 
 *          description: ok   
 */
router.get("/games/:count", listAll);
router.patch("/game/:slug", authCheck, adminCheck, removeSoft);
router.get("/game/:slug", read);
router.put("/game/:slug", authCheck, adminCheck, update);
router.post("/games", authCheck, adminCheck, list);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - brand
 *         - gender
 *       properties:
 *         title:
 *            type: string
 *            trim: true
 *            maxlength: 32
 *            text: true
 *         description:
 *            type: string
 *            maxlength: 2000
 *            text: true
 *         brand:
 *            type: string
 *         gender:
 *            type: string
 */