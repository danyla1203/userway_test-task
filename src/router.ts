import { Router } from 'express';
import shortener from './shortener/shortener.router';

const router = Router();

router.use('/shortener', shortener);

export default router;
