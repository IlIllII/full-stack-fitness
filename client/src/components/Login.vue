<template>
<div>
    <h2>Login</h2>
    <label for="username-input">Username</label>
    <input type="text" id="username-input" v-model="username">
    <label for="password-input">Password</label>
    <input type="password" id="password-input" v-model="password">
    <button @click="onLogin()">Login</button>
</div>

</template>


<script>
import API from "../services/Api"

export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        async onLogin() {

            // Encode credentials into base64
            let credentials = btoa(`${this.username}:${this.password}`)

            // Authenticate at server
            const response = await fetch(API.baseURL + "/users", {
                method: "GET",
                mode: "cors",
                headers: {
                    "authorization": `Basic ${credentials}`
                }
            })
            
            // Parse response and store token/redirect as needed
            response.json().then((data) => {
                if (data.success == false) {
                    alert("Login Failed.") // TODO: Improve this
                } else if (data.success == true) {
                    window.localStorage.setItem("token", data.token)
                    window.localStorage.setItem("username", this.username)
                    this.$router.push('/')
                }
            })
        }
    }
}
</script>