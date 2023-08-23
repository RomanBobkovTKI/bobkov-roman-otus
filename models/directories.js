import mongoose, { Schema }  from "mongoose"

const directoriesSchema = new Schema({
    name: String,
    age: Number,
})

const DirectoriesModel = mongoose.model('directors', directoriesSchema)
export { DirectoriesModel }