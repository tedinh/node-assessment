const userData = require('./userData.json')

module.exports = {
    getUsers: (req, res, next) => {
        var users = userData

        if (req.query.age){
            var users = userData.filter(function(value){
                if( value.age < req.query.age ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.lastname){
            var users = userData.filter(function(value){
                if( value.last_name == req.query.lastname ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.email){
            var users = userData.filter(function(value){
                if( value.email == req.query.email ){
                    return value
                }
            });
            return res.status(200).json(users)
        }
        if (req.query.favorites){
            var users = userData.filter(function(value){
                if( value.favorites.includes(req.query.favorites) ){
                    return value
                }
            });
            return res.status(200).json(users)
        }        
        return res.status(200).json(userData)
    },

    getUsersId: (req, res, next) => {
        if (req.params.id) {
			for (var obj of userData) {
				if (obj.id == req.params.id) {
					res.json(obj);
					return;
				}
			}
			res.status(404).json(null);
    }
},

    getAdmins: (req, res, next) => {
        userArr = userData.filter( users => users.type == 'admin');
		res.status(200).json(userArr);
		return;
    },

    getNonAdmins: (req, res, next) => {
        userArr = userData.filter( users => users.type != 'admin');
        res.status(200).json(userArr);
        return;
    },

    getUserByTypes: (req, res, next) => {
        userArr = userData.filter( val => val.type == req.params.type);
		res.status(200).json(userArr);
		return;
    },

    putUser: (req, res, next) => {
        var userArr = userData;
		for (let i = 0; i < userArr.length; i++){
			if (req.params.id == userArr[i].id) {
				userArr[i] = req.body;
				res.status(200).json(userArr);
				return;
			}
		}
		res.status(200).json(userArr);
		return;
    },

    //post requests
    postUser: (req, res, next) => {
        var user = req.body;
		user.id = userData.length + 1;
		userData.push(user);
		res.status(200).json(userData);
		return;

    },

    deleteUser: (req, res, next) => {
        var user = userData;
        for(var i = 0; i < user.length; i++){
            if(user[i].id == req.params.id) {
                user.splice(i, 1);
                res.status(200).json(user);
                return;
            }
        }
    }


}