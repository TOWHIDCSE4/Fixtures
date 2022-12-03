// external imports
const express = require("express");
const db = require("../db");
const ObjectId = require("mongodb").ObjectId;

// internal imports


const listRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Lists Fixtures:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the experience
 *         tournament_name:
 *           type: string
 *           description: The tournament name
 *         scores:
 *           type: number
 *           description: The tournament score
 *         date:
 *           type: string
 *           description: The tournament score date
 *       example:
 *         id: d5fE_asz
 *         tournament_name: "Crystal Palace"
 *         scores: 830
 *         date: 2022-03-24T22:30:00.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: The experience manage API
 */







/**
 * @swagger
 * /listsFixtures:
 *   get:
 *     summary: Returns the list of all the experiences
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: The list of the fixtures
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lists Fixtures'
 */

// fixutes lists
listRouter.get("/", async (req, res) => {
   const cursor = db.get().fixtures.collection("listing").find({});
   const result = await cursor.toArray();
   res.json(result);
});

module.exports = listRouter;