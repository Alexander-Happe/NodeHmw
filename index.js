const fs = require('fs');
const inquirer = require('inquirer');
const until = require('until');
const axios = require('axios');
const pdf = require('html-pdf');

async function writePDF() {
    try {
        const { username } = await inquirer.prompt({
            message: "What is your GitHub username?",
            name: "username"
        });
        const { favColor } = await inquirer.prompt({
            message: "What is your favorite color?",
            name: "favColor"
        })
        const { data } = await axios.get(
            `https://api.github.com/users/${username}`
        )
        const name = data.name
        const image = data.avatar_url
        const following = data.following
        const followers = data.followers
        const repos = data.public_repos
        const location = data.location
        const link = data.html_url
        const bio = data.bio
        function generateHTML(){
            const newHTML = 
            `<!doctype html>
        <html lang="en">
          <head>
            <title>Title</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            
            
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          </head>
          <body style="background-color: ${favColor};">
              <h1>${name}</h1>
              <img src="${image}" alt="profile image" height="42" width="42">
              <a href ="https://www.google.com/maps/place/${location}">Location: ${location}</a>
              <a href="${link}">GitHub profile</a>
              <h2>Following: ${following}</h2>
              <h2>Followers: ${followers}</h2>
              <h2>Number of repos: ${repos}</h2>
              <h2>Bio: ${bio}</h2>
              
            
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
          </body>
        </html>`;
        return newHTML}
        
        const html = await generateHTML()
        const options = { format: 'Letter' };
        pdf.create(html, options).toFile('./githubprofile.pdf', function(err,res){
            if(err) return console.log(err);
            console.log(res)
        })
    }
    catch (err) {
        console.log(err)
    }
}

writePDF()
