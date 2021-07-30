<template>
<div>
    <h2>Registration</h2>
    <label for="username-input">Username</label>
    <input type="text" id="username-input" v-model="username">
    <label for="password-input">Password</label>
    <input type="text" id="password-input" v-model="password">
    <button @click="onRegister()">Register</button>
</div>

</template>


<script>

export default {
    data() {
        return {
            username: "",
            password: "",
        }
    },
    methods: {
        async onRegister() {

            let credentials = btoa(`${this.username}:${this.password}`)

            const response = await fetch("http://localhost:3000/users", {
                method: "GET",
                mode: "cors",
                headers: {
                    "authorization": `Basic ${credentials}`
                }
            })
            
            response.json().then((data) => {
                console.log(data);
            })
        }
    }
}
</script>