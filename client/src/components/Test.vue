<template>
<div>
    <h2>Testing the API</h2>
    <input type="text" v-model="username" placeholder="username">
    <br>
    <input type="text" v-model="bench" placeholder="bench">
    <br>
    <input type="text" v-model="press" placeholder="press">
    <br>
    <input type="text" v-model="squat" placeholder="squat">
    <br>
    <input type="text" v-model="deadlift" placeholder="deadlift">
    <br>
    <input type="text" v-model="row" placeholder="row">
    <br>
    <input type="text" v-model="pullups" placeholder="pullups">
    <br>
    <input type="text" v-model="benchFails" placeholder="benchFails">
    <br>
    <input type="text" v-model="pressFails" placeholder="pressFails">
    <br>
    <input type="text" v-model="squatFails" placeholder="squatFails">
    <br>
    <input type="text" v-model="deadliftFails" placeholder="deadliftFails">
    <br>
    <input type="text" v-model="rowFails" placeholder="rowFails">
    <br>
    <input type="text" v-model="lastWorkout" placeholder="lastWorkout">
    <br>

    


    <button @click="onSubmit()">Send PUT request</button>
</div>

</template>


<script>
import API from "../services/Api"

export default {
    data() {
        return {
            username: "username",
            bench: [{date: Date.now(), sets: 3, reps: 5, weight: 135, fail: true}],
            press: "",
            squat: "",
            deadlift: "",
            row: "",
            pullups: "",
            benchFails: "",
            pressFails: "",
            squatFails: "",
            deadliftFails: "",
            rowFails: "",
            lastWorkout: ""
        }
    },
    methods: {
        async onSubmit() {

            
            let header = {"authorization": `Bearer ${window.localStorage.getItem("token")}`}

            const response = await fetch(API.baseURL + "/users", {
                method: "POST",
                mode: "cors",
                headers: header,
            })
            
            // Parse response and store token/redirect as needed
            response.json().then((data) => {
                if (data.success == false) {
                    alert("Registration Failed.") // TODO: Improve this
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