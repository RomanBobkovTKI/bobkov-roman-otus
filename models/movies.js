import mongoose, { Schema }  from "mongoose"

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorsId: String
})
const MoviesModel = mongoose.model('movies', movieSchema)
export { MoviesModel }