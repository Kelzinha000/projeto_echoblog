import multer from "multer";
import { request } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageStorage = multer.diskStorage({
  destination: (request, file, cb) => {
    let folder = "";

    if (request.baseUrl.includes("usuarios")) {
      folder = "usuarios";
    }
    if (request.baseUrl.includes("postagem")) {
      folder = "postagens";
    }
    cb(null, path.join(__dirname, `../public/${folder}`));
  },
  filename: (request, file, cb) => {
    cb(
      null,
      Date.now() +
        String(Math.floor(Math.random() * 10000)) +
        path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(request, file, cb) {
    if (!file.originalname.match(/\.(png||jpg)$/)) {
      return cb(new Error("Por favor, envie apenas jpg o png"));
    }
    cb(null, true);
  },
});

export default imageUpload;
