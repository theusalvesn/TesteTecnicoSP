import { Router } from 'express';
import { userHandler } from '../controllers/users';
import { validateSignUp , validateSignIn, validateAddFavorites} from '../middlwares/';
import { handleValidationErrors } from '../middlwares';
import { favoritesController } from '../controllers/favorites/';
import { authenticateToken } from '../middlwares/user/auth/authMiddleware';
import { searchCharacterHandler } from '../controllers/searchCharacter';
import { authenticateTokenOptional, countUserRequest } from '../middlwares/';

const router = Router();

router.post('/user/signup', validateSignUp, handleValidationErrors, userHandler.signUp);
router.post('/user/signin', validateSignIn, handleValidationErrors, userHandler.signInController);

/** 
 * @swagger
 * /user/favorites:
 *   post:
 *     summary: Adiciona um personagem aos favoritos do usuário
 *     description: Esta rota permite que o usuário adicione um personagem à sua lista de favoritos. Requer autenticação e validação para garantir que o usuário não ultrapasse o limite de favoritos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               characterId:
 *                 type: integer
 *                 description: ID do personagem a ser adicionado aos favoritos.
 *                 example: 242
 *     responses:
 *       201:
 *         description: Personagem adicionado aos favoritos com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Character added to favorites"
 *                 data:
 *                   type: object
 *                   properties:
 *                     characterId:
 *                       type: integer
 *                       example: 242
 *       400:
 *         description: Bad Request - Se o corpo da requisição estiver mal formado.
 *       401:
 *         description: Unauthorized - Se o usuário não estiver autenticado.
 *       404:
 *         description: Not Found - Se o usuário não for encontrado.
 *       409:
 *         description: Conflict - Se o personagem já estiver nos favoritos.
 *       403:
 *         description: Forbidden - Se o usuário tiver atingido o limite de favoritos.
 *       500:
 *         description: Internal Server Error - Se ocorrer um erro no servidor.
 */


router.post('/user/favorites', authenticateToken, validateAddFavorites, handleValidationErrors, favoritesController.addToFavoritesHandler);
router.get('/user/favorites', authenticateToken, favoritesController.getFavoritesCharactersHandler);
router.get('/user/favorites/episodes', authenticateToken, favoritesController.getEpisodesPerFavoriteHandler);
router.get('/user/favorites/episodes/count', authenticateToken, favoritesController.getTotalUniqueEpisodesHandler);
router.put('/user/favorites', authenticateToken, favoritesController.updateFavoriteHandler);
router.delete('/user/favorites/:id', authenticateToken, favoritesController.removeFavoriteHandler);

router.get('/characters/search/:name', authenticateTokenOptional, countUserRequest, searchCharacterHandler.searchCharacterController);


export { router };
