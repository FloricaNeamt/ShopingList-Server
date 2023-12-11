import knex from 'knex'
import config from './knexfile.js';
const db = knex(config);
const productTable = 'product'

export async function getAllProducts(category) {
    try{
        let product ;
        if(category)
            product = await db.select('*').where('category',category).from(productTable);
        else
            product = await db.select('*').from(productTable);

        console.log(product);
        return product;

    }
    catch (error) {
      console.error('Error retrieving product:', error);
    } 
  }
  
export async function addProducts(product) {
try{
    let result = await db.insert([
            {  name: product.name, category: product.category, price: product.price, quantity: product.quantity, place: product.place}], 
            )
            .into(productTable)
    console.log(result)
    }
catch (error) {
    console.error(error.stack);
    } 

}

export async function deleteProducts(productName) {
try{
    let result = await db(productTable)
    .where('name', productName)
    .del()
    console.log(result)
    }
catch (error) {
    console.error(error.stack);
    } 

}

export async function updateProducts(productBody, idReq){
    try{
        let result = await db(productTable).where({ id: idReq }).update({ 
            name: productBody.name, category:productBody.category,  price:productBody.price, quantity: productBody.quantity, place:productBody.place, },['id','name','category', 'price', 'quantity', 'place'])
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