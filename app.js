const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review=require("./models/review.js");

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

const validateLisitng = (req,res,nest) => {
      let{error}= listingSchema.validate(req.body);
      if(error){
        throw new ExpressError(400,error);
      }else{
        next();
      }
};

//Index Route
app.get("/listings" ,wrapAsync (async (req,res)=>{
   const allListing = await Listing.find({});
   res.render("listings/index",{allListing});
}));

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",wrapAsync (async (req,res)=>{
    let {id} =req.params;
    const  listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));

//create Route
app.post("/listings", validateLisitng,  wrapAsync (async (req,res,next)=>{
        let result= listingSchema.validate(req.body);
         const newListing=new Listing(req.body.listing);
         await newListing.save();
         res.redirect("/listings");  
}));

//Edit Route
app.get("/listings/:id/edit",wrapAsync (async (req,res)=>{
    let {id} =req.params;
    const  listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//Edit Route
app.put("/listings/:id", validateLisitng, wrapAsync (async(req,res)=>{
     let {id} =req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id",wrapAsync (async (req,res)=>{
    let {id} =req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
}))

//Reviewa
//Post Route

app.post("/listings/:id/reviews", async(req,res) =>{

});

app.all("/{*any}",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message='Something went wrong!!'} =err;
    res.status(statusCode).render("error.ejs",{err})
})
app.listen(8080,() =>{
    console.log("Listing on Port 8080");
});