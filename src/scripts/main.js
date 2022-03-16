import { getUsers, getPosts, usePostCollection, createPost } from "./data/DataManager.js";
import { PostList } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js";
import { PostEntry } from "./feed/PostEntry.js";

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
	}
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
      //invoke a filter function passing the year as an argument
      showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
        return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}
  
applicationElement.addEventListener("click", event => {
    if (event.target.id === "directMessageIcon") {
        console.log("User would like to write a message")
    }
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "homeButton") {
        console.log("Going Home")
    }
})

const showFooter = () => {
    const footerElement = document.querySelector("footer");
    footerElement.innerHTML = Footer();
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

applicationElement.addEventListener("click", (event) => {
	if (event.target.id.startsWith("edit")){
		console.log("post clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
  })
  
applicationElement.addEventListener("click", event => {
event.preventDefault();
if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: 1,
            timestamp: Date.now()
        }

    // be sure to import from the DataManager
    createPost(postObject)
    }
})

const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

/**
 * Main logic module for what should happen on initial page load for Giffygram
 */

/*
    This function performs one, specific task.

    1. Can you explain what that task is?
    2. Are you defining the function here or invoking it?
*/

getUsers()
.then(data => {
    console.log("User Data", data)
})

getPosts()
.then(data => {
    console.log("Post Data", data)
})

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFooter();
    showPostEntry();
}


// Are you defining the function here or invoking it?
startGiffyGram();