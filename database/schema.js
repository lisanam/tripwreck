const Schema = {
	users: {
		id: {type: "increments", nullable: false, primary: true},
		name: {type: "string", maxlength: 150, nullable: false},
		email: {type: "string", maxlength: 254, nullable: false, unique: true},
		phone: {type: "integer", maxlength: 20, nullable: true, unique: true}
	},
	lists: {
		id: {type: "increments", nullable: false, primary: true},
		user_id: {type: "integer", nullable: false, unsigned: true},
		title: {type: "string", maxlength: 150, nullable: false},
		html: {type: "string", maxlength: 150, nullable: false},
		created_at: {type: "dateTime", nullable: false},
		updated_at: {type: "dateTime", nullable: true}
	}
};

module.exports = Schema;