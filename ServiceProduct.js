import knex from 'knex'
import config from './knexfile.js';
const db = knex(config);
const productTable = 'product'

export async function getAllProducts(category,user_id) {
    try{
        let product ;
        if(category)
            product = await db.select('*').where({category:category, user_id:user_id}).from(productTable);
        else
            product = await db.select('*').where({user_id:user_id}).from(productTable);

        // console.log(product);
        return product;

    }
    catch (error) {
      console.error('Error retrieving product:', error);
    } 
  }
  
export async function addProducts(product,user_id) {
try{
    let result = await db.insert([
            {  user_id: user_id, name: product.name, category: product.category, price: product.price, quantity: product.quantity, place: product.place}], 
            )
            .into(productTable)
    // console.log(result)
    }
catch (error) {
    console.error(error.stack);
    } 

}

export async function deleteProducts(productName,user_id) {
try{
    return  await db(productTable)//return deleted rows
    .where({name:productName,user_id:user_id})
    .del()
    
}
catch (error) {
    console.error(error.stack);
    } 

}

export async function updateProducts(productBody, idReq, user_id){
    try{
        let result = await db(productTable).where({ id: idReq, user_id:user_id }).update({ 
            name: productBody.name, category:productBody.category,  price:productBody.price, quantity: productBody.quantity, place:productBody.place},['id','name','category', 'price', 'quantity', 'place'])
        console.log(result.length)
        if(result.length!=0)
            return true//S-a gasit elementul
        else
            return false//Nu s-a gasit elementul

        }
    catch(error) {
        console.error(error.stack);
    } 
    
}