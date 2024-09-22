const usermodel = require('../model/usermodel')

const userblog = require('../model/userblog');

const profile = require('../model/profilemodel')

const bcrypt = require('bcrypt')

const { render } = require('../route/route');

const nodemailer = require("nodemailer");

const cookies = require("cookies");

const fs = require('fs')

var randomstring = require("randomstring");

require('dotenv').config();
 

var u_id = null;
const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: process.env.pass
    },
});




const indexPath = async (req, res) => {
    const logIn = req.cookies;
    console.log("cokkie is herre", logIn);
    let user;
    // if(logIn.u_id == null){

    //     res.redirect('/login')

    // }else{

    //     var singupdata =await usermodel.find();

    //     const u = singupdata.filter((user) =>{
    //         return user.id == u_id
    //     });
    //     console.log("this is a user" , u);

    //      user = u[0];

    // }   
    if (logIn.u_id) {
        try {
            var singupdata = await usermodel.find();

            const u = singupdata.filter((user) => {
                return user.id == logIn.u_id
            });
            console.log("this is a user", u);

            user = u[0];
            let blogUpload = await userblog.find();
            console.log("blogUpload is here", blogUpload);
            console.log("u_id ", u_id);
            res.render('index', { user, blogUpload, u_id, logIn });
        } catch (err) {
            console.log("login indexpath err", err);
        }

    } else {
        res.redirect('/Login')
    }
}


let loginPath = (req, res) => {

    res.render('login')
}


let  registerPath = (req, res) => {
    res.render('register')
}

let adddata = async (req, res) => {
    try {
        let sratio = 10;
        const encpass = await bcrypt.hash(req.body.password, sratio);
        console.log(encpass);

        const newuser = await new usermodel({
            userpath: req.file.path,
            username: req.body.username,
            useremail: req.body.useremail,
            password: encpass,
            token : ''
        })
        console.log("our check pass ", newuser);
        console.log("filepathsglasdkj", req.file.path);
        if (encpass) {


            await newuser.save();
            console.log(newuser);
            res.render('login');
        }
        else {
            res.render("register")
        }

    } catch (error) {
        console.log("filepath", req.file.path);
        console.log('dbc err', error);
    }
}




let adminpannnel = async (req, res) => {

    try {
        var singupdata = await usermodel.find();

        const user = singupdata.filter((user) => {
            return user.useremail == req.body.useremail
        })

        if (user.length == 0) {
            console.log("creater account");
            res.redirect('/register')
        }
        else {
            let checq = await bcrypt.compare(req.body.userpassword, user[0].password)
            if (checq) {
                console.log('login success');
                u_id = user[0].id
                console.log("u_id = ", u_id);
                res.cookie('u_id', user[0].id, { httpOnly: true })
                res.redirect('/');
                // res.render('index', {user : user[0]});
            }
            else {
                console.log('pass wrong');
                res.redirect('/register')
            }
        }

    } catch (error) {
        console.log("login err", error);
    }

}




let blogs = (req, res) => {
    res.render('blog-form');
}

let blogforms = (req, res) => {
    console.log("blog-form data", req.body);

    console.log("blog ing here", req.file);

    const blogdata = new userblog({
        blog_discription: req.body.blog_description,
        blogtitle: req.body.blogtitle,
        blogpath: req.file.path,
        userId: u_id
    })

    blogdata.save();
    console.log("blogdata", blogdata);

    res.redirect('/blogs')
}




const delteBlog = async (req, res) => {

    try {

        const delteblogs = await userblog.findByIdAndDelete(req.params.id);

        fs.unlink(delteblogs.blogpath, () => {
            console.log("success remove");
        });

        res.redirect('/')

    } catch (err) {
        console.log("delte blog err is", err);
    }

}

const editBlog = async (req, res) => {

    try {

        const editblogs = await userblog.findById(req.params.id)

        res.render('editblog', { editblogs })


    } catch (error) {
        console.log("this is a edit blog err", error);
    }

}
const updateBlog = async (req, res) => {

    let { id, blogtitle, blog_description } = req.body
    let { path } = req.file

    try {
        let oldBlog = await userblog.findById(id);
        fs.unlink(oldBlog.blogpath, () => {
            console.log("success remove");
        });
        const updateblog = await userblog.findByIdAndUpdate(id, { blogtitle, blog_description, blogpath: path })
        res.redirect('/blogs')

    } catch (error) {
        console.log("this is a our update blog err", error);
    }

}



let addprofile = (req, res) => {
    res.render('addprofile');

}

const profiledata = async (req, res) => {

    try {
        const profiles = await new profile({

            profilepath: req.file.path,
            city: req.body.city,
            skils: req.body.skils,
            profilename: req.body.profilename,
            profilebio: req.body.profilebio,
            userId: u_id
        })
        profiles.save();
        res.redirect('/addprofile')
    } catch (error) {
        console.log("this is  our profiledata err", error);
    }
}

let viewblog = async (req, res) => {


    try {

        const newprofile = await profile.find();
        console.log("your new profile is here", newprofile);


        res.render('viewblog', { newprofile, u_id });

    } catch (err) {
        console.log("view profile is not working", err);
    }

}

const editprofile = async (req, res) => {


    try {

        const addprofile = await profile.findById(req.params.id)
        res.render('editprofile', { addprofile })

    } catch (err) {

    }

}

const updateprofile = async (req, res) => {
    const { city, profilename, profilebio, skils, id } = req.body
    const { path } = req.file
    console.log("its our update path", req.file.path);
    try {

        let oldprofile = await profile.findById(id);
        fs.unlink(oldprofile.profilepath, () => {
            console.log("success remove");
        });

        const update = await profile.findByIdAndUpdate(id, { city, profilename, profilebio, skils, city, profilepath: path })
        res.redirect('/viewblog')
    } catch (err) {
        console.log("update err in profile", err);
    }
}

const logOut = (req, res) => {
    res.clearCookie('u_id')
    res.redirect('/')
}

const changepass = (req, res) => {
    res.render('changepass');
}

const updatepass = async (req, res) => {
    const { u_id } = req.cookies;
    console.log("uid is here", u_id);
    const { oldpass, newpass, confpass } = req.body
    console.log("its our password", req.body);
    const user = await usermodel.findById(u_id)
    console.log("you pass change object here ", user.password);
    let checq = await bcrypt.compare(oldpass, user.password)
    console.log("checq is here", checq);
    if (checq) {
        if (newpass == confpass) {
            const sratio = 10;
            const encpass = await bcrypt.hash(newpass, sratio);
            const main = await usermodel.findByIdAndUpdate(u_id, { password: encpass })
            res.redirect('/logOut')
        }
        else {
            console.log("your new pass is not math your conf password");
        }
    } else {
        console.log("yor pass is not math");
    }
}


let forgetpass = (req  ,res) => {
    res.render('forgetpass');
}

let emailcheq = async (req , res) => {

    let email = req.body.uemail;
    console.log("this users emailcheq0" , email);
    let users =await usermodel.find();
    // console.log('user email' , users);
    let user = users.filter((u) => {
        return u.useremail == req.body.uemail
    })
    console.log("THIS IS A  OUR EMAIL USER" , user);

   
    if(user.length == 1){
    //    let u_id = user[0].id
    let otp = Math.floor(Math.random() * 10000);
    res.cookie('u_id', user[0].id, { httpOnly: true })        
    res.cookie('otp', otp, { httpOnly: true });

    console.log('my',user[0].useremail);
    

    let sendmail = async (req, res) => {

        const mail =async () => {
            const info = await transporter.sendMail({
                from: 'dhairydobariya@gmail.com', // sender address
                to: user[0].useremail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `otp ${otp}`, // html body
              });
            
              console.log("Message sent: %s", info.messageId);
        }
        mail()

    }
    sendmail()

        // console.log("u_id = ", u_id);
        
        res.render('otpenter');
    }
    else{
        res.redirect('/forgetpass')
    }

}
let otpenter = (req , res) => {
    res.render('/otpenter')
}
let otpcheqe = (req ,res) => {

    let {otp} = req.cookies;

    let userotp = req.body.otp;

    if(otp == userotp) {
        res.render('createpass');
    }
    else{
        res.render('/forgetpass')
    }

}
let newpass = (req , res) => {
    res.render('createpass')
}
let newforgetpass =async (req , res) => {

    const u_id = req.cookies.u_id;

    console.log('uma',req.body);
    const {  newpass, confpass } = req.body
    const user =await usermodel.findById(u_id)
    // console.log("this is a new forgert pass id " , user);
    if (newpass == confpass) {
        const sratio = 10;
        const encpass = await bcrypt.hash(newpass, sratio);
        const main = await usermodel.findByIdAndUpdate(user.id, { password: encpass })
        res.redirect('/logOut')
    }
    else {
        console.log("your new pass is not math your conf password");
    }


}


let choicepath = (req ,res) => {
    res.render('choice')
}

let tokengen = (req ,res) => {
    res.render('tokenemail');
}

let tokenemailcheq =async (req ,res) => {

    let email = req.body.uemail;
    console.log("this users emailcheq0" , email);
    let users =await usermodel.find();
    // console.log('user email' , users);
    let user = users.filter((u) => {
        return u.useremail == req.body.uemail
    })
    console.log("THIS IS A  OUR EMAIL USER" , user);

   
    if(user.length == 1){
    //    let u_id = user[0].id
    let gtoken = randomstring.generate()
    res.cookie('u_id', user[0].id, { httpOnly: true })        

    

    await usermodel.findByIdAndUpdate(user[0].id, {
        token: gtoken
    })

    let sendmail = async (req, res) => {

        const mail =async () => {
            const info = await transporter.sendMail({
                from: 'dhairydobariya@gmail.com', // sender address
                to: user[0].useremail, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<a href="http://localhost:3001/sendToken/${gtoken}" >Reset pass</a>`, // html body
              });
            
              console.log("Message sent: %s", info.messageId);
        }
        mail()

    }
    sendmail()

        // console.log("u_id = ", u_id);
        res.json({msg: "Link sent on Mail...."})
        
        
    }
    else{
        res.redirect('/forgetpass')
    }

}
const sendToken = async (req ,res) => {

    let {u_id} = req.cookies;
    let user = await usermodel.findById(u_id);

    if(user.token == req.params.gtoken){
      
        res.render('tokencreatepass')
    }
    else{
        res.json({msg: "invalid token..."})
    }

}

let tokennewforgetpass =async (req , res) => {

    const u_id = req.cookies.u_id;

    const {  newpass, confpass } = req.body
    const user =await usermodel.findById(u_id)
    // console.log("this is a new forgert pass id " , user);
    if (newpass == confpass) {
        const sratio = 10;
        const encpass = await bcrypt.hash(newpass, sratio);
        const main = await usermodel.findByIdAndUpdate(user.id, { password: encpass, token: '' })
        res.redirect('/logOut')
    }
    else {
        console.log("your new pass is not math your conf password");
    }


}

module.exports = {
    indexPath
    , loginPath,
    registerPath,
    adddata,
    viewblog,
    adminpannnel,
    blogforms,
    blogs,
    delteBlog,
    editBlog,
    updateBlog,
    profiledata,
    addprofile,
    editprofile,
    updateprofile,
    logOut,
    changepass,
    updatepass,
    forgetpass,
    emailcheq,
    otpenter,
    otpcheqe,
    newpass,
    newforgetpass,
    choicepath,
    tokengen,
    tokenemailcheq,
    sendToken,
    tokennewforgetpass
}