  var mandrill = require('mandrill-api/mandrill');
  var mandrill_client = new mandrill.Mandrill('');
  var fs = require('fs');
  var ejs = require('ejs');
  var dataParser = require("./data_parser"); 

// Authenticate via OAuth
  var tumblr = require('tumblr.js');
  var client = tumblr.createClient({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  });

  var csvFile = fs.readFileSync("friend_list.csv","utf8");
  var emailTemplate = fs.readFileSync('email_template.html', 'utf8');
  var friend_list = dataParser.csvParse(csvFile)
  //console.log(friend_list)


// Make the request
  client.posts('ches-codes.tumblr.com', function(err, blog){
    
    var latestPosts = dataParser.getLatestPosts(blog);

    friend_list.forEach(function(row){
      var customizedTemplate = ejs.render(emailTemplate, 
                  { firstName: row.firstName,  
                    numMonthsSinceContact: row.numMonthsSinceContact,
                    latestPosts: latestPosts
                  });
      sendEmail(row.firstName, "emilychesler@gmail.com", "Ches" , "emilychesler@gmail.com", "BLOG UPDATE!", customizedTemplate)
    });
   
  function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);   
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
 }



});


