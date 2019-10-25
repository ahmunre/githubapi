'use strict';
 const baseurl = 'https://cors-anywhere.herokuapp.com/';
 const apikey = "d081b32be0919091a527911a6c4a72c829816d32";

function getUsernameRepo(username) {
  const usernameUrl = `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${username}/repos`
  
 

  const options = {
    headers: new Headers({
      "X-Api-Key": apikey
      })
  };
  console.log(`Searching Repos for ${username}`);
fetch(usernameUrl, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson,username))
    .catch(err => {
      $("#js-error-message").text(`Something is not right: ${err.message}`);
    });
}

function displayResults(responseJson,username) {
  
  console.log(responseJson, username);
  
  // if there are previous results, remove them 
  $("#username_list").empty();

  // for each repo listed, add a link to it in DOM  
  responseJson.forEach(obj =>
  {console.log(obj)
    $("#username_list").append(
      `<li><a href='${obj.html_url}'>${obj.name}</a></li>`
    )}
  );
  // set the username equal to the search value
  $("#username").text(`${username}`);

  // display the results section
  $("#results").removeClass("hidden");
}

// be on the lookout for form submissions. when they happen,
// get the username, and call `getGitHubRepos` with it
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const username = $("#username_id").val();
    getUsernameRepo(username);
     
  });
  
}

$(watchForm);