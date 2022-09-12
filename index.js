import fetch from 'node-fetch';
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/PMS");

const postSchema=new mongoose.Schema({

id:{
 type:String,
 required:true
},
name:{
  type:String,
  required:true
},
slug:{
  type:String,
  required:true
},
// parent_id:{
//   type:Number,
//   required:true
// }

});

const Post=mongoose.model('post',postSchema)

async function getPosts(){
  
  const myPosts= await fetch("https://www.instagram.com/explore/locations/?__a=1&__d=dis&page=2");
   const response= await myPosts.json();
  // //  console.log(response);
   const data=response

  for(let i=0; i<data.length; i++){
const post = new Post({
    id:data[i].country_list["id"],
    name:data[i].country_list["name"],
    slug:data[i].country_list["slug"],
   });
   post.save();
  }
}
getPosts();
