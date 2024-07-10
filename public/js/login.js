// grab references to the important DOM elements
const login = $("#login");
const signup = $("#signup");


const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = $('#email').val();
  const password = $('#password').val();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
  
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = $('#username').val();
  const email = $('#emailSignUp').val();
  const password = $('#passwordSignUp').val();
  
  // Send a POST request to the API endpoint
  if (username && email && password) {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
       // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};
  
login.on('click', loginFormHandler);
signup.on('click', signupFormHandler);