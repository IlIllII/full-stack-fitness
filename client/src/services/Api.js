
const baseURL = "http://localhost:3000"


// ******* Have to consider scope issues when using this function, there may be a better way to make a wrapper function for this. Particularly, check:
// window.getItem()
// this.$router
// return from promise on redirect after invalid token


/**
 * Wrapper for sending API requests with JSON web tokens attached and
 * redirecting to a login page if token is invalid upon response from server.
 * 
 * Returns a promise, so include a callback to access the data returned from server.
 * 
 * @arg {string} method - http request method
 * @arg {string} endpoint - API endpoint, eg: "/users"
 * @arg {Object} router - this.$router for redirects as needed
 * @arg {callback} callback - callback fired with param: data<JSON>
 * @arg {JSON} [body={}] - the body to include in the request, needed for POST/PUT.
 * 
 * @returns {Promise<JSON>} Returns a promise containing JSON data from server if token is valid, otherwise we are redirected to the login page.
 */
async function fetchEndpoint(method, endpoint, router, callback, body = {}) {
    let username = window.localStorage.getItem("username");
    let token = window.localStorage.getItem("token");

    // Send the username as a url parameter
    const response = await fetch(baseURL + endpoint + `/${username}`, {
        method: method,
        mode: "cors",
        headers: {
            "authorization": `Bearer ${token}`
        },
        body: body
    });

    response.json().then((data) => {
        if (data.success == true) {
            callback(data)
        } else {
            router.push("/login")
            return
        }
    });
}

function testWindow() {
    let username = window.localStorage.getItem("username");
    let token = window.localStorage.getItem("token");
    console.log(username)
    console.log(token)
}


const API = {
    baseURL: baseURL,
    fetchEndpoint: fetchEndpoint,
    testWindow: testWindow,
}

module.exports = API