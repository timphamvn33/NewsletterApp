const { urlencoded } = require("express")
const bodyParser = require("body-parser")
const express = require("express")
const request = require("request")
const https = require("https")
const app = express()

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const email = req.body.email;
    const first = req.body.f
    const last = req.body.l
    // res.send(email +first+  last)


  const data = {
      members: [
          {
              email_address: email, 
              status: "subscribed",
              merge_fields:{
                  FNAME: first,
                  LNAME: last
              }
              
          }

      ] 
  };

  // post to maichim api
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/c4e781aa0e";
  const option = {
    method:"POST",
    auth: "thuong:fafaef6a94a1cd51f6b934dee255e2fd-us5"
  };
  const request = https.request(url, option, function(response){
    if( response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data))
    });

  });
  request.write(jsonData);
  request.end();

// click the try again button then track back to home page
  app.post("/failure", function(req, res){
    res.redirect("/")
  })


});
app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server work");
});
// Api Id:  fafaef6a94a1cd51f6b934dee255e2fd-us5
// Audience Id: c4e781aa0e.

// const mailchimp = require("@mailchimp/mailchimp_marketing");

// mailchimp.setConfig({
//   apiKey: "fafaef6a94a1cd51f6b934dee255e2fd-us5",
//   server: "us5",
// });

// async function run1() {
//     const response = await mailchimp.lists.getAllLists();
//     console.log(response);
// }

// const run = async () => {
//   const response = await mailchimp.lists.addListMember("c4e781aa0e", {
//     email_address: "huong1@gmail.com",
//     status: "subscribed",
//     merge_fields:{
//       FNAME:"huong",
//       LNAME: "tran"
//     }
  
//   });

//   console.log(response);
// };
// run()


