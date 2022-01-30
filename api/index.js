const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const multer = require("multer")
const path = require("path")
const Cors = require('cors');
// dot env
dotenv.config();
// app initialised
const app = express();

//using cors for cross url fetching
app.use(Cors()); 

// 
app.use("/images",express.static(path.join(__dirname,"public/images")))

// mongoose connection
mongoose.connect(process.env.DB_URL , {useNewUrlParser : true , useUnifiedTopology : true})
	.then(() => console.log('Mongo connection established'))
	.catch((err) => console.log(err))

// to use json parsing from express built in functions 
app.use(express.json());
// using helemt for secure request calls
app.use(helmet());

// using morgan for better logging
app.use(morgan('common'));

// root url
app.get('/',(req,res) => {
	res.end("Hello");
})

// using multer to store
// const storage = multer.diskStorage({
// 	destination:(req,file,cb) => {
// 		cb(null),"public/images";
// 	},
// 	filename:(req,file,cb) => {
// 		cb(null,req.body.name);
// 	}
// })

// // using  multer to upload files
// const upload = multer({});
// app.post('/api/upload',upload.single("file"),(req,res)=> {
// 	try {
// 		return res.status(200).json("file is uploaded")
// 	} catch(e) {
// 		// statements
// 		console.log(e);
// 	}
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});



app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute);


app.listen(process.env.PORT || 3001,() => console.log(`we are running on ${process.env.PORT || 3001}`));