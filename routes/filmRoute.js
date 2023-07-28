const express = require("express");

const filmController = require("../controllers/filmController")

const router = express.Router();

router.post('/films', filmController.createFilm);

router.get('/get-all', filmController.getFilms);

router.get('/getFilm/:filmId', filmController.getFilmById)

router.get('/get-paginated', filmController.getFilmsByPagination)


module.exports = router;