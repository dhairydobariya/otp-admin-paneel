const express = require('express');
const route = express();
const data = require('../controller/controller')
const userpath = require('../middle-var/user-icon');
// const transporter = require('../controller/transpoter');

route.get('/' ,data.indexPath )
route.get('/register' , data.registerPath)
route.post('/addData' ,userpath.single('userpath'), data.adddata)
route.get('/Login', data.loginPath)
route.post('/adminpannnel' , data.adminpannnel)
route.get('/viewblog', data.viewblog)
route.get('/blogs'  , data.blogs)
route.post('/blog-form' ,userpath.single('blogpath') ,  data.blogforms )
route.get('/delteBlog/:id' , data.delteBlog )
route.get('/editBlog/:id',userpath.single('blogpath'), data.editBlog )
route.post('/updateBlog',userpath.single('blogpath') , data.updateBlog )

route.post('/profiledata' ,userpath.single('profilepath') , data.profiledata)
route.get('/addprofile' , data.addprofile);
route.get('/editprofile/:id'  ,userpath.single('profilepath') , data.editprofile )
route.post('/updateprofile',userpath.single('profilepath') ,data.updateprofile )

route.get('/logOut', data.logOut)
route.get('/changepass' , data.changepass );
route.post('/updatepass' , data.updatepass)

route.get('/forgetpass' , data.forgetpass)
route.post('/emailcheq' , data.emailcheq)


route.get('/otpenter' , data.otpenter)
route.post('/otpcheqe' , data.otpcheqe)

route.get('/newpass' , data.newpass);
route.post('/newforgetpass' , data.newforgetpass)

route.get('/choicepath' , data.choicepath)
route.get('/tokengen' , data.tokengen)

route.post('/tokenemailcheq' , data.tokenemailcheq)
route.get('/sendToken/:gtoken' , data.sendToken)


route.post('/tokennewforgetpass' , data.tokennewforgetpass)

// route.get('/sendMail' , transporter.sendmail)
module.exports = route;