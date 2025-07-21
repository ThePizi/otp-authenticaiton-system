/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: no users found!
 */

const User = require("../models/users");

exports.getUsers = async (req, res) => {
  const users = await User.find();

  if (users.length === 0) {
    return res.status(404).json({ error: "no users found!" });
  }

  return res.status(200).json({ status: "success", data: users });
};
