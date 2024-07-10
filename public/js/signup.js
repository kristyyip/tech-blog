const formEl = document.querySelector("form");

formEl.addEventListener("submit", async (e) => {
    e.preventDefault;
    console.log(e);

    const formData = new FormData(formEl);
    const newUser = {};

    for (const [key, value] of formData) {
        newUser[key] = value;
    }

    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })

    if(response.ok) {
        window.location.href = "/";
    } else {
        alert(response.statusText)
    }
})