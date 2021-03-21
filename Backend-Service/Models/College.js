const mongoose = require('mongoose');
const schema = mongoose.Schema;

const collegeSchema = new schema({
	name:{
		type:String,
	},
	founded_year :{
		type:String,
	},
	city : {
		type:String,
	},
	state : {
		type:String,
	},
    country : {
		type:String,
	},
    student_count: {
        type: Number,
        default: 0
    },
    courses: {
        type: Array,
    }
},
	{
	timestamps: true
});


var Colleges = mongoose.model('College', collegeSchema);

module.exports = Colleges;