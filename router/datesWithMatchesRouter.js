// external imports
const express = require("express");
const db = require("../db");
const ObjectId = require("mongodb").ObjectId;

// internal imports

const datesWithMatchesRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Dates with matches:
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
 *   name: Dates With Matches
 *   description: The experience manage API
 */

/**
 * @swagger
 * /datesWithMatches:
 *   get:
 *     summary: Get the experience by id
 *     tags: [Dates With Matches]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: The Fixture date
 *     responses:
 *       200:
 *         description: The Fixuture date with matches
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dates with matches'
 *       404:
 *         description: The Experience was not found
 */


// fixutes lists
datesWithMatchesRouter.get("/", async (req, res) => {
   try {
         let query = {};
        const date = req.query.date;

        if (date !== "null") {
           query.date = {
              $gte: `${date}T00:00:00.000000Z`,
              $lt: `${date}T23:59:59.999999Z`,
           };
        }
      const cursor = db.get().fixtures.collection("listing").find(query);
      const result = await cursor.toArray();
      res.json(result);
   } catch (e) {
      res.status(404).send(e.message);
   }
});

module.exports = datesWithMatchesRouter;
