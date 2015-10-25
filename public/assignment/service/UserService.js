/* global Guid */
(function()
{
  angular
    .module("FormBuilderApp")
    .factory("UserService", userService);
    
  function userService()
  {
    var users = [];
    
    var service = {
	  findUserByUsernameAndPassWord: findUserByUsernameAndPassWord,
      findAllUsers: findAllUsers,
      createUser: createUser,
	  deleteUserById: deleteUserById,
	  updateUser: updateUser
    };
    
    return service;
	
	function findUserByUsernameAndPassWord(username, password, callback)
    {
		var user = null;
	 	for(var i = 0; i < users.length; i++) 
		 {
			 if(users[i].username == username && users[i].password == password) 
			 	user = users[i];
		 }
		 callback(user);
    }
    
    function findAllUsers(callback)
    {
      callback(users);
    }
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    function createUser(user, callback)
    {
		var newUser = {
			userid: guid(),
			username: user.username,
			password: user.password,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
		}
		users.push(newUser);
		callback(newUser);
    }
    
	function deleteUserById(id, callback) 
	{
		for(var j = 0; j < users.length; j++) 
		{
			if(users[j].userid == id) {
				users.slice(j,1);
			}
		}
		callback(users);
	}
	function updateUser(id, user, callback)
	{
		var newUser = null;
		for(var i = 0; i < users.length; i++)
		{
			if (users[i].userid == id) {
				users[i].username = user.username;
				users[i].password = user.password;
				users[i].firstname = user.firstname;
                users[i].lastname = user.lastname;
                users[i].email = user.email;
				newUser = users[i];
			}
		}
		callback(newUser);
	}
  }
})();