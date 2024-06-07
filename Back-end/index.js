const express = require('express')
const mongoose=require("mongoose")
const jwt=require("jsonwebtoken")
const multer=require("multer")
const path=require("path")
const cors=require("cors")
const { error } = require('console')


const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from this origin only
}));

//image storage engine for blogimage

const storage2=multer.diskStorage({
    destination:"./upload/images/blogs",
    filename:(req,file,cb)=>{
        return cb(
            null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
        )
    }
})

const upload2=multer({storage:storage2})
app.use("/image",express.static("upload/images/blogs"))

app.post("/uploadblogimg",upload2.single("blogimg"),(req,res)=>{
    console.log(req.body);
    res.json({success:true,image_url:`http://localhost:${port}/image/${req.file.filename}`})
})

//image storage engine for profileimage
const storage=multer.diskStorage({
    destination:"./upload/images",
    filename:(req,file,cb)=>{
        return cb(
            null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
        );
    },
});

const upload=multer({storage:storage});
app.use("/images",express.static("upload/images"))

//creating upload endpoint for image upload
app.post("/uploadprofile",upload.single("profimg"),(req,res)=>{
    
    res.json({
        success:true,
        image_url:`http://localhost:${port}/images/${req.file.filename}`,
    })
})

//databse connect with mongodb
mongoose.connect("mongodb+srv://hedaumayur2003:64fU8a59Na7T6PPQ@cluster0.saixtve.mongodb.net/Blogdb")
console.log("connected");
//creating user collections
const Users = mongoose.model("Users", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profimage: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now, // <-- Issue here, should be 'default' instead of 'Default'
    }
});

//creating Blog collections
const Blogs=mongoose.model("Blogs",{
    blogid:{
        type:Number,
        required:true,
    },
    blogtitle:{
        type:String,
        required:true,
    },
    blogdesc:{
        type:String,
        required:true,
    },
    blogimg:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
        default:"General",
    },
    userid:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

//creating comment collections
const Comments=mongoose.model("Comments",{
    id:{
        type:Number,
        required:true,
    },
    uid:{
        type:Number,
        required:true,
    },
    blogid:{
        type:Number,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
//creating middleware for fetch user
const fetchuser=async (req,res,next)=>{
    const token=req.header("auth-token");
    console.log(token);
    if(!token)
        {
            console.log("token is not there");
        }
    else{
        try{
            const data=jwt.verify(token,'blog_sec')
            req.user=data.user;
            console.log(req.user);
            next();
        }
        catch(error){
            res.send({success:false,error:"Please authenticate user2"})
        }
    }
}

//end point for add comments
app.post("/addcomment",fetchuser,async (req,res)=>{
    const allComments=await Comments.find({});
    let id;
    if(allComments.length>0)
        {
            console.log(allComments);
            const commentarray=allComments.slice(-1);
            const commentdata=commentarray[0];
            console.log(commentdata);
            id=commentdata.id+1;
        }
        else{
            id=1;
        }
    const comment=new Comments({
        id:id,
        uid:req.user.id,
        blogid:req.body.blogid,
        content:req.body.content,
    })
    await comment.save();
    console.log(comment);
    res.send({success:true,message:"Comment posted"})
})




//creating Signup endpoint
app.post("/signup",async(req,res)=>{
    const users=await Users.find({})
    let id=0;
    if(users.length>0)
        {
            let last_user_array=users.slice(-1);
            let last_user=last_user_array[0];
            id=last_user.id+1;
        }
        else{
            id=1;
        }
    const check=await Users.findOne({email:req.body.email})
    if(check)
        {
            return ({success:false,error:"Users already exist"})
        }
        else{
            
            const user=new Users({
                id:id,
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                profimage:req.body.profimage,
            })
            
            await user.save();
            
            console.log("saved");
            const data={
                user:{
                    id:user.id
                }
            }
    
            const token=jwt.sign(data,'blog_sec');
            res.json({success:true,token})
        }
        
});

//creating login end point 
app.post("/login",async (req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user)
        {
            let pass=(user.password===req.body.password)
            if(pass)
                {
                    const data={
                        user:{
                            id:user.id
                        }
                    }
                    const token=jwt.sign(data,'blog_sec');
                    res.json({success:true,token})
                }
                else{
                    return ({success:false,error:"Password does not match"})
                }
        }
    else{
        return ({success:false,error:"Users not exist"})
    }
})

//endpoint for create blog
app.post("/createblog",fetchuser,async (req,res)=>{
    let userdata=await Users.findOne({id:req.user.id})
    let allblog=await Blogs.find({})
    let id;
    if(allblog.length>0)
        {
            const blogarray=allblog.slice(-1);
            const blogdata=blogarray[0];
             id=blogdata.blogid+1;
        }
        else{
            id=1;
        }
    
    const blog=new Blogs({
        blogid:Number(id),
        blogtitle:req.body.title,
        blogdesc:req.body.description,
        blogimg:req.body.blogimage,
        category:req.body.category,
        userid:req.user.id,
    })
    console.log(blog);
    await blog.save();
    
    res.send({success:true,message:"Blog added",blog})
})

//endpoint for fetch all blogs data
app.get("/allblogs",async (req,res)=>{
    const blogdata=await Blogs.find({});
    console.log("All blogs fetched");
    res.json(blogdata);
})
//end point for fetch all comments
app.get("/blogs/:blog_id/comments", async (req, res) => {
    try {
        const comments = await Comments.find({ blogid: req.params.blog_id });

        const promises = comments.map(async (comment) => {
            const userdata = await Users.findOne({ id: Number(comment.uid) });
            return {
                ...comment.toObject(),
                userimage: userdata.profimage,
                username: userdata.name
            };
        });
        
        const commentsWithUserData = await Promise.all(promises);
        res.send(commentsWithUserData);
    } catch (error) {
        console.error('Error:', error); // Log any errors
        res.status(500).json({ error: 'Internal server error' });
    }
});

// deleting particular blogs  with blogs comments
app.get("/blogdelete/:blogid",async (req,res)=>{
    await Comments.deleteMany({blogid:req.params.blogid});

    const result=await Blogs.deleteOne({blogid:req.params.blogid});

    console.log(`${result.deletedCount} documents are deleted`);
    
    res.send({success:true,message:"Blog and associated with that comments are deleted"})
});

//updating particular blogs 
app.put("/updateblog/:blogid",async(req,res)=>{
    console.log(req.params.blogid);
    console.log(req.body);
    const{blogimage,category,description,title}=req.body;

    if (!title|| !description|| !blogimage|| !category) {
        return res.status(400).send('Name and age are required');
      }
      else{
        const updateblog=await Blogs.findOneAndUpdate({blogid:req.params.blogid},{blogtitle:title,blogdesc:description,blogimg:blogimage,category:category},{ new: true })
        console.log("blog updated");
  
        if (!updateblog) {
          return res.status(404).send('Blog not found');
        }
        return res.send({success:true,error:"Blog updated successfully"})
      }
})

//return user id 
app.get("/fetchuserid",fetchuser,async(req,res)=>{
    res.send({success:true,userid:req.user.id});
})

//fetch blog data id wise
app.get("/fetchblog/:blogid",async(req,res)=>{
    const data=await Blogs.find({blogid:req.params.blogid})
    res.send(data);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})