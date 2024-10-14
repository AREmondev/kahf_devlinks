import express from 'express';
import {
  getUserProfile,
  updateProfile,
  generateShareLink,
  getSharedProfile,
} from '../../controllers/v1/userController';
import {
  removeLink,
  getUserLinks,
  addLinks,
} from '../../controllers/v1/linkController';
import { protect } from '../../middleware/authMiddleware';
import { upload, handleLocalUpload } from '../../middleware/upload';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users/links:
 *   post:
 *     summary: Add multiple links
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               links:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     platform:
 *                       type: string
 *                     url:
 *                       type: string
 *     responses:
 *       201:
 *         description: Links added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Link'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/links', protect, addLinks);
/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the currently authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/profile', protect, getUserProfile);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update the authenticated user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad Request - Validation errors or file upload issues
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: Not Found - User not found
 */
router.put(
  '/profile',
  protect,
  upload.single('profileImage'),
  handleLocalUpload,
  updateProfile
);

/**
 * @swagger
 * /users/links/{linkId}:
 *   delete:
 *     summary: Remove a link
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: linkId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Link removed successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Link not found
 */
router.delete('/links/:linkId', protect, removeLink);

/**
 * @swagger
 * /users/links:
 *   get:
 *     summary: Get user's links
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Links retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/links', protect, getUserLinks);

/**
 * @swagger
 * /users/generate-share-link:
 *   get:
 *     summary: Generate a share link for the user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Share link generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 shareLink:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/generate-share-link', protect, generateShareLink);

/**
 * @swagger
 * /users/share/{token}:
 *   get:
 *     summary: Get shared user profile
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shared profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     profileImage:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     links:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Link'
 *       404:
 *         description: Shared profile not found
 *       500:
 *         description: Server error
 */
router.get('/share/:token', getSharedProfile);

export default router;
