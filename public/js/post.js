// grab references to the important DOM elements
const createBtn = $("#create");
const updateBtn = $("#update")
const deleteBtn = $("#delete")
const addPostModal = $("#addPostModal");
const editPostModal = $("#editPostModal");
const viewMoreModal = $("#viewMoreModal");
const listGroupItem = $(".list-group-item");
const card = $(".card");
const editTitle = $('#editTitle')
const editContent = $('#editContent')
const postTitle  = $("#postTitle");
const postContent  = $("#postContent");
const commentText = $("#comment")
const commentsSection = $("#comments");
const submitBtn = $("#submit");

// get request to get data from api url
async function getData(url) {
    try {
        const response = await fetch(url,
            {method: "GET"}
        )
    
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        return data;
    } catch (err) {console.log(err)};
}

const createPostHandler = async (event) => {
    event.preventDefault()

     // get user id from api
     const userData = await getData("/api/user");
     const userId = userData.id;

    // collect values from form
    const title = $('#title').val();
    const content = $('#content').val();

    if (title && content && userId) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, content, userId }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            location.reload()
        } else {
            alert(response.statusText);
        }
    }
};

const addExistingComments = (commentData, i) => {
    // create card elements using information from fetch response
    const commentCard = $("<div>").addClass("list-group-item list-group-item-action")
    const commentMessage = $("<p>")
        .addClass("card-text")
        .html(commentData[i].text)
    const commentPoster = $("<small>")
        .addClass("text-muted")
        .html(`–${commentData[i].username}, ${commentData[i].date}`)
    
    // append comment elements to parent div
    commentCard.append(commentMessage, commentPoster)

    return commentCard;
}

const populateFields = async (event) => {
    if (window.location.href.includes("/dashboard")) {

        const postId = event.target.id

        // get blog post data from api
        const postData = await getData(`/api/blog/${postId}`);

        // populate fields from post data
        editTitle.val(postData.title);
        editContent.val(postData.content);

        editPostModal.attr("data-id", postId);

        editPostModal.show();

    } else {
        let postId;
        if (event.target.closest("#submit")) {
            postId = viewMoreModal.attr("data-id");
        } else {
            postId = $(event.target)
                .closest('.card')
                .attr("id");
        }

        // get blog post data from api
        const postData = await getData(`/api/blog/${postId}`);

        // populate fields from post data
        postTitle.html(postData.title)
        postContent.html(postData.content);

        // removes any previously opened post's comments from modal
        if (commentsSection.children()) {
            commentsSection.children().remove(); 
        }

        if (postData.comments !== "[]") {
            let commentsArray = JSON.parse(postData.comments);

            for (let i=0; i < commentsArray.length; i++) {
                let card = addExistingComments(commentsArray, i);
                commentsSection.append(card);
            }
        }

        viewMoreModal.attr("data-id", postId);

        viewMoreModal.show();
    }

}

const editPostHandler = async (event) => {
    event.preventDefault();

    postId = editPostModal.attr("data-id");

    // collect values from form
    const title = editTitle.val();
    const content = editContent.val();

    if (title && content) {
        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/blog/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            location.reload()
        } else {
            alert(response.statusText);
        }
    }
}

const deletePostHandler = async (event) => {
    event.preventDefault();

    postId = editPostModal.attr("data-id");

    // Send a DELETE request to the API endpoint
    const response = await fetch(`/api/blog/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        location.reload()
    } else {
        alert(response.statusText);
    }
}

const postCommentHandler = async (event) => {
    event.preventDefault();

    postId = viewMoreModal.attr("data-id");

    // get user id from api
    const userData = await getData("/api/user");
    const username = userData.username;

    // get current timestamp
    const date = dayjs().format("M/DD/YY");


    if (commentText.val()) {
        // collect values from form
        text = commentText.val();

        commentObj = {
            text,
            username,
            date
        }

        // get blog post data from api
        const postData = await getData(`/api/blog/${postId}`);
        let commentsArray = JSON.parse(postData.comments);

        commentsArray.push(commentObj);
        commentsArray = JSON.stringify(commentsArray)

        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/blog/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ comments: commentsArray }),
            headers: { 'Content-Type': 'application/json' },
        });

        commentText.val("");
    
        if (response.ok) {
            viewMoreModal.hide();
            populateFields(event);
            viewMoreModal.show();
        } else {
            alert(response.statusText);
        }
    }
}


createBtn.on("click", createPostHandler);
listGroupItem.on("click", populateFields);
card.on("click", populateFields);
updateBtn.on("click", editPostHandler);
deleteBtn.on("click", deletePostHandler);
submitBtn.on("click", postCommentHandler)