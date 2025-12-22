import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import pkg from 'multer-storage-cloudinary';
const CloudinaryStorage = pkg.CloudinaryStorage || pkg;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dino_app/avatars',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    },
});

export const uploadAvatar = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Apenas imagens são permitidas'));
        }
        cb(null, true);
    },
});
