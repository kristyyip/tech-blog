// grab references to the important DOM elements
const createBtn = $("#create");
const addPostModal = $("#addPostModal");

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
     console.log(userId)

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
    
        if (!response.ok) {
            alert(response.statusText);
        }
    }
};

createBtn.on("click", createPostHandler);