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
router.post('/user/favorites', authenticateToken, validateAddFavorites, handleValidationErrors, favoritesController.addToFavoritesHandler);
router.get('/user/favorites', authenticateToken, favoritesController.getFavoritesCharactersHandler);
router.get('/user/favorites/episodes', authenticateToken, favoritesController.getEpisodesPerFavoriteHandler);
router.get('/user/favorites/episodes/count', authenticateToken, favoritesController.getTotalUniqueEpisodesHandler);
router.put('/user/favorites', authenticateToken, favoritesController.updateFavoriteHandler);
router.delete('/user/favorites/:id', authenticateToken, favoritesController.removeFavoriteHandler);

router.get('/characters/search/:name', authenticateTokenOptional, countUserRequest, searchCharacterHandler.searchCharacterController);


export { router };



