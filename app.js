const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust12';

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL); 
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));




//app.get("/testListing",async (req,res)=>{
   // let sampleListing=new Listing({
   ////     title:"Sample Listing",
     //   description:"This is a sample listing for testing purposes.",
      //  image:"",
    //    price:100,
     //   location:"Sample Location",
    //    country:"Sample Country"
   // });

   // await sampleListing.save();
    //res.send("Sample listing created successfully!");
    //console.log("Sample listing created:");
//});



app.get("/",(req,res) =>{
    res.send("Working");
})

//Index Route
app.get("/listings" ,async (req,res)=>{
   const allListing = await Listing.find({});
   res.render("listings/index",{allListing});
});

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} =req.params;
    const  listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//create Route
app.post("/listings",async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} =req.params;
    const  listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Edit Route
app.put("/listings/:id",async(req,res)=>{
     let {id} =req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id",async (req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
})

app.listen(8080,() =>{
    console.log("Listing on Port 8080");
});