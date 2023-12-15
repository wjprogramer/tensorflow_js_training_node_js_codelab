import multer from "multer";
import {getGlobal} from "@src/global";
import path from "path";
import UuidHelper from "@src/helpers/uuid_helper";

class UploadHelper {
    private static _instance?: multer.Multer;
    static getStorage(): multer.Multer {
        return UploadHelper._instance!;
    }

    static init = () => {
        const storePath = path.join(getGlobal().projectRoot, 'data_upload');
        // UploadHelper._storage
        const storage = multer.diskStorage({
            destination: storePath,
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                cb(null, `${UuidHelper.generateUuid()}${ext}`);
                // cb(null, file.originalname); // 使用原始文件名作为存储的文件名
            }
        });
        UploadHelper._instance = multer({ storage });
    }

}

export default UploadHelper;