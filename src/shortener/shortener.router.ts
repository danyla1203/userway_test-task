import { Router } from 'express';
import { getFullUrlCntrl, shortenUrlCntrl } from './shortener.controller';
import { shortenUrlValidation } from './middlewares/shorterUrl.validation';

const router = Router();

router.get('/', getFullUrlCntrl);

router.post('/', shortenUrlValidation, shortenUrlCntrl);

export default router;
