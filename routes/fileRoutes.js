import express from 'express';
import { uploadFile } from '../controllers/uploadFileController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/',upload.single('file'), uploadFile);
export default router;
