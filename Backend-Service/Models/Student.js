const mongoose = require('mongoose');
const schema = mongoose.Schema;

const studentSchema = new schema({
	name:{
		type:String,
		required:true,
	},
	college_id:{
		type: String,
		ref: 'Colllege'
	},
	batch_year : {
		type:String
	},
	skills :{
		type:Array
	}
},
	{
	timestamps: true
});


var Students = mongoose.model('Student', studentSchema);

module.exports = Students;