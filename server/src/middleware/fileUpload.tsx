import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		cb(null, './images')
	},
	filename: function (req: any, file: any, cb: any) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, uniqueSuffix + path.extname(file.originalname));
	}
})

const fileFilter = (req: any, file: any, cb: any) => {
	const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
	if (mimeTypes.includes(file.mimetype)) {
		return cb(null, true);
	} else {
		cb(new Error('Invalid File Type. Only jpg, jpeg, png, and gif image types are allowed'), false);
	}
};

export const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 2 * 1024 * 1024 }
})
	.single('image');
