const mongoose=require("mongoose");
const data=require("./data.js");
const Listing=require("../models/listing.js");


const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust12';

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL); 
}

const initDB = async() => {
    await Listing.deleteMany({});
    console.log("Deleted all listings");
    await Listing.insertMany(data.data); 
}

initDB();