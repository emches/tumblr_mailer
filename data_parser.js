var csvParse = function(file) { 
  var data = file.trim().split("\n");
  var headers = data[0].split(",");
  var results = [];
   for (j = 1; j < data.length ; j++){
   	  var obj = {};
   	  for ( i = 0 ; i < headers.length; i++) {
   	    obj[headers[i]] = data[j].split(",")[i];
       }
      results.push(obj);
    }
    return results;
}

var getLatestPosts = function (blog){
  var currentDate = new Date();
  var latestPosts = []
  
  for (i = 0 ; i < blog.posts.length ; i++){
    var post = blog.posts[i];
    var postObj = {};
    var postDate = new Date(post.date );
    var dateDiff = Math.floor((currentDate - postDate) / (1000*60*60*24));
    
    if ( dateDiff <= 7 ){
      postObj.href = post.post_url;
      postObj.title = post.title;
      latestPosts.push(postObj);
    }
  } 
  console.log(latestPosts)
  return latestPosts;
};

module.exports.csvParse = csvParse;
module.exports.getLatestPosts = getLatestPosts;