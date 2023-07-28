const filmModel = require("../models/filmModel");

const mongoose = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
  const isValidBody = function (body) {
    return Object.keys(body).length > 0;
  };

  const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
  };

  ///////////////////////////////////////// Create Film //////////////////////////////////////////////

  const createFilm = async function(req, res){

    try {
        let data = req.body;
        let nameRegex = /^[a-zA-Z ]{2,30}$/;

        if (!isValidBody(data)) {
            return res.status(400).send({status:false, message:"Film details required!"})
          }

          let { filmName, directorName, leadActor, filmLanguage } = data;

          if (!isValid(filmName)) {
            return res.status(400).send({status:false, message:"Film Name is required"})
          }

          if (!filmName.match(nameRegex))
          return res.status(400).send({status: false, msg: "film name should have alphabets only"});

          if (!isValid(directorName)) {
            return res.status(400).send({status:false, message:"Director Name is required"})
          }

          if (!directorName.match(nameRegex))
          return res.status(400).send({status: false, msg: "Director name should have alphabets only"});

          if (!isValid(leadActor)) {
            return res.status(400).send({status:false, message:"Lead Actor name is required"})
          }

          if (!leadActor.match(nameRegex))
          return res.status(400).send({status: false, msg: "Actor name should have alphabets only"});

          if (!isValid(filmLanguage)) {
            return res.status(400).send({status:false, message:"Film Language name is required"})
          }

          if (!filmLanguage.match(nameRegex))
          return res.status(400).send({status: false, msg: "Film Language name should have alphabets only"});

          const filmInUse = await filmModel.findOne({ filmName: filmName })
          if (filmInUse) {
            return res.status(400).send({status:false, message: "This film name is already in Database" })
          }

          let savedData = await filmModel.create(data);
          res.status(201).send({status:true, msg: savedData});
    }

    catch (err) {
        res.status(500).send({status:false, message:err.message})
      }
  }

///////////////////////////////////////////// Get Films /////////////////////////////////////////////////////

  const getFilms = async function(req, res) {

    try {
        const films = await filmModel.find({})
        return res.status(200).send({ status: true, data: films });
    }

    catch (err) {
        res.status(500).send({status:false, message:err.message})
      }
  }

////////////////////////////////////////// Get Film By Id ///////////////////////////////////////////////////

  const getFilmById = async function(req, res) {

    try {
        const filmId = req.params.filmId

        const checkFilm = await filmModel.findOne({ _id: filmId })

        if (!checkFilm) {
          return res.status(404).send({ status: false, message: "No Film Found" });
      }

        if (!isValidObjectId(filmId)) {
          return res.status(404).send({status: false, message: "Invalid film Id"});
      }

          return res.status(200).send({ status: true, message: "Film Details", data: checkFilm });
    }

    catch (err) {
        res.status(500).send({status:false, message:err.message})
      }
  }

  ///////////////////////////////////////Get Films By Pagination ////////////////////////////////////////////

  const getFilmsByPagination = async function(req, res) {

    const page = req.query.page;
    const size = req.query.size;
      
    try {
        const totalMovies = await filmModel.countDocuments();
        const totalPages = Math.ceil(totalMovies / size);
    
        const moviesOnPage = await filmModel.find().skip((page - 1) * size).limit(size);

        res.status(200).send({
          currentPage: page,
          totalPages: totalPages,
          totalMovies: totalMovies,
          moviesPerPage: size,
          movies: moviesOnPage,
        });
    }

    catch (err) {
      res.status(500).send({status:false, message:err.message})
    }
  }

  module.exports.createFilm = createFilm

  module.exports.getFilms = getFilms

  module.exports.getFilmById = getFilmById

  module.exports.getFilmsByPagination = getFilmsByPagination