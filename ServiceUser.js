import knex from 'knex';
import config from './knexfile.js';
const db = knex(config);
const userTable = 'users';
import bcrypt from 'bcrypt';
const saltRounds = 10;

function isValidEmail(email) {
    if (typeof email !== 'string') {
      return false; // Ensure the input is a string
    }
  
    // Split the email address into two parts using '@'
    const parts = email.split('@');
  
    // Check if there are exactly two parts
    if (parts.length !== 2) {
      return false;
    }
  
    const [username, domain] = parts;
  
    // Check if the username and domain have non-empty lengths
    if (!username.length || !domain.length) {
      return false;
    }
  
    // Check if the domain contains at least one '.'
    if (domain.split('.').length < 2) {
      return false;
    }

    if (domain.split('.')[1].length == 0) {
        return false;
      }
    return true;
}

export async function addUser(user) {
try{
    
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    if(isValidEmail(user.email)){
        let result = await db.insert([
                {  username: user.username, email: user.email, password: hashedPassword}], 
                )
                .into(userTable)
        
        return {status:true, message:user.username + ' was added'}
    }else
        return {status:false, message:'Please enter a right email!'};
    }
catch (error) {
    console.error(error.stack);
    } 

}

export async function deleteUsers(userName,userId) {
try{
    console.log(userName)
    let result = await db(userTable)
    .where({username: userName, id:userId})
    .del()
    console.log(result)
    }
catch (error) {
    console.error(error.stack);
    } 

}

export async function updateUser(userBody, userId){
try{
    let hashedPassword = userBody.password;
    if(userBody.password)
        hashedPassword = await bcrypt.hash(userBody.password, saltRounds);
    if(userBody.email)
        if(!isValidEmail(userBody.email))
            return {status:0, message:'Please enter a right email!'};
            
    let result = await db(userTable).where({ id: userId }).update({ 
        username: userBody.username, email: userBody.email, password: hashedPassword},
        ['id','username','email', 'password']);
    
    if(result.length!=0)
        return {status:1, message:result[0].username + ' was updated!!'};
    else
        return {status:-1, message:""};//Nu s-a gasit elementul
        
}catch(error) {
    console.error(error.stack);
    } 
    
}

function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

export async function checkAuth(token) {
    token = token?.replace('Bearer ', '');
    if (!token) {
        return {success:false, message:'Token isnot exist'}
    }
    let user = await getUserByToken(token);
    if (!user) {
        return {success:false, message:'Token isnot correct'}

    }
    // return {succes:true,...user};
    user.success = true;
    return user;
}

export async function getUserByToken(token){
    const result = await db(userTable).where('token',token);
    if(result.length === 0)
        return false;
    else
        return result[0];
}

export async function auth(user) {
    try {
        // Use Knex to select a user with the given username
        const result = await db(userTable).where('username', user.username);
        // Check if the user exists
        if (result.length === 0) {
            return {success: false}; // User does not exist
        }
  
        const hashedPassword = result[0].password; 

        // Compare the entered password with the hashed password
        let passwordValid =  await bcrypt.compare(user.password, hashedPassword);
        
        if(passwordValid)
            var newtoken = generate_token(32)
            await db(userTable).where({ username: user.username }).update({ 
                token: newtoken}, ['id','token']);
            // return [true, token];
            return {success: true, token:newtoken}

    } catch (error) {
      console.error('Error checking user existence', error);
      return {success: false}; // Return false in case of an error
    } 
  }