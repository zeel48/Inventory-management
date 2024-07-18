import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query") 
// Replace the uri string with your connection string.
const uri = "<mongodb+srv://Zeel:14122002@cluster0.bt81psf.mongodb.net/";
const client = new MongoClient(uri); 
  try {
    const database = client.db('Zeel');
    const inventory = database.collection('Project'); 
 
    const products = await inventory.aggregate([{
        $match: {
          $or: [
            { slug: { $regex: query, $options: "i" } }, // Partial matching for name field
           ]
        }
      }
    ]).toArray()
    return NextResponse.json({ success: true, products})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  } 

}

 
    
    
