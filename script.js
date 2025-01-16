let userProfile = {
    username: "john_doe",
    profilePicture: "profile.jpg",
    posts: [
        { id: 1, content: "Hello, this is my first post!", imageUrl: "post1.jpg", likes: 10, comments: ["Great post!", "Nice to see you!"] },
        { id: 2, content: "Enjoying a beautiful day!", imageUrl: "post2.jpg", likes: 20, comments: ["Lovely day!", "Agree!"] }
    ],
    following: [2] // User is following user with id 2
};

let loggedIn = true; // Assume user is logged in
let postsList = document.getElementById("posts-list");
let profilePic = document.getElementById("profile-pic");
let postInput = document.getElementById("post-input");
let postImage = document.getElementById("post-image");

const renderPosts = () => {
    postsList.innerHTML = ""; // Clear previous posts
    userProfile.posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <p><strong>${userProfile.username}</strong></p>
            <p>${post.content}</p>
            <img src="${post.imageUrl}" alt="Post Image">
            <div>
                <button onclick="likePost(${post.id})">${post.likes} Likes</button>
                <button onclick="showComments(${post.id})">Comments</button>
                <button class="follow-btn" onclick="followUser(${post.id})">Follow</button>
            </div>
            <div id="comments-${post.id}" class="comments"></div>
            <textarea id="comment-input-${post.id}" placeholder="Add a comment..."></textarea>
            <button onclick="addComment(${post.id})">Add Comment</button>
        `;
        postsList.appendChild(postDiv);
    });
};

const addPost = () => {
    const postContent = postInput.value;
    const postImageFile = postImage.files[0];
    if (postContent && postImageFile) {
        const newPost = {
            id: userProfile.posts.length + 1,
            content: postContent,
            imageUrl: URL.createObjectURL(postImageFile), // Temporary URL for image
            likes: 0,
            comments: []
        };
        userProfile.posts.push(newPost);
        postInput.value = "";
        postImage.value = "";
        renderPosts();
    }
};

const addComment = (postId) => {
    const commentInput = document.getElementById(comment-input-$,{postId});
    const commentContent = commentInput.value;
    if (commentContent) {
        const post = userProfile.posts.find((p) => p.id === postId);
        post.comments.push(commentContent);
        commentInput.value = "";
        showComments(postId);
    }
};

const showComments = (postId) => {
    const commentsDiv = document.getElementById(comments-$,{postId});
    commentsDiv.innerHTML = "";
    const post = userProfile.posts.find((p) => p.id === postId);
    post.comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = <p>${comment}</p>;
        commentsDiv.appendChild(commentDiv);
    });
};

const likePost = (postId) => {
    const post = userProfile.posts.find((p) => p.id === postId);
    post.likes++;
    renderPosts();
};

const followUser = (postId) => {
    alert("Followed user " + postId);
};

const showProfile = () => {
    document.getElementById("profile").style.display = "block";
    document.getElementById("feed").style.display = "none";
    document.getElementById("username").innerText = userProfile.username;
    profilePic.src = userProfile.profilePicture;
    renderUserPosts();
};

const renderUserPosts = () => {
    const profilePostsDiv = document.getElementById("profile-posts");
    profilePostsDiv.innerHTML = ""; // Clear previous posts
    userProfile.posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <p>${post.content}</p>
            <img src="${post.imageUrl}" alt="Post Image">
        `;
        profilePostsDiv.appendChild(postDiv);
    });
};

const showFeed = () => {
    document.getElementById("profile").style.display = "none";
    document.getElementById("feed").style.display = "block";
};

const handleLogout = () => {
    loggedIn = false;
    alert("Logged out successfully");
    showFeed();
};

document.getElementById("profile").addEventListener("click", showProfile);
document.getElementById("feed").addEventListener("click", showFeed);
document.getElementById("logout").addEventListener("click", handleLogout);
document.getElementById("post-button").addEventListener("click", addPost);

renderPosts();
