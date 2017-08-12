import mongoose from 'mongoose'

let Schema = mongoose.Schema;
let session_schema = Schema({
	session: String,
	expires: Date
});

let Session = mongoose.model("session", session_schema);

export default Session;