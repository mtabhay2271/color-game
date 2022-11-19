
import multer, { MulterError } from 'multer';

var storage = multer.diskStorage({
    destination: (req, file: any, cb: any) => {
        cb(null, 'uploads')
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

export const upload = multer({ storage: storage });
