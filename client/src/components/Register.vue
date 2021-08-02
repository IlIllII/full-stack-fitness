<template>
  <div>
    <h2>Registration</h2>
    <label for="username-input">Username</label>
    <input type="text" id="username-input" v-model="username" />
    <label for="password-input">Password</label>
    <input type="password" id="password-input" v-model="password" />
    <button @click="onRegister()">Register</button>
  </div>
</template>


<script>
import API from "../services/Api";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onRegister() {
      // Encode credentials into base64
      let credentials = btoa(`${this.username}:${this.password}`);

      const response = await fetch(API.baseURL + "/users", {
        method: "POST",
        mode: "cors",
        headers: {
          authorization: `Basic ${credentials}`,
        },
      });

      // Parse response and store token/redirect as needed
      response
        .json()
        .then((data) => {
          console.log(data);
          if (data.success == false) {
            alert("Registration Failed."); // TODO: Improve this
          } else if (data.success == true) {
            console.log(data);
            window.localStorage.setItem("token", data.token);
            window.localStorage.setItem("username", this.username);
          }
        })
        .then(() => {
          // Send POST request to populate empty workout hx in db.
          let res = fetch(API.baseURL + "/workout", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              // Initialize an empty workout history.
              username: this.username,
              bench: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              press: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              squat: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              deadlift: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              row: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              pullups: [
                {
                  date: Date.now(),
                  weight: 0,
                  reps: 0,
                  sets: 0,
                  failed: false,
                },
              ],
              benchFails: 0,
              pressFails: 0,
              squatFails: 0,
              deadliftFails: 0,
              rowFails: 0,
              lastWorkout: "A",
            }),
          });
          return res;
        })
        .then((data) => data.json())
        .then((data) => {
          // Confirmation
          if (data.success == false) {
            alert("Couldn't save blank workout hx.");
          } else if (data.success == true) {
            console.log("Created new user successfully!");
          }
        });
      this.$router.push("/");
    },
  },
};
</script>