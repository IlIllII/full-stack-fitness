<template>
  <div class="main">
    <a href="/"><img src="../assets/bench-press.gif"/></a>

    <h2>Registration</h2>
    <div class="input-duo">
      <label for="username-input"><strong>Username</strong></label>
      <input type="text" id="username-input" v-model="username" />
    </div>
    <div class="input-duo">
      <label for="password-input"><strong>Password</strong></label>
      <input type="password" id="password-input" v-model="password" />
    </div>

    <button @click="onRegister()">Register</button>
    <p style="font-size: 10px">Already have an account?
      <a href="/login">Login</a>
      <br>
      <a style="font-size: 4px" href="https://icons8.com/icon/gaokY6HiHgpc/deadlift">Deadlift icon by Icons8</a>
    </p>
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

<style scoped>
.main {
  margin: auto;
  padding: 10px;
  width: 20em;
  border: 1px solid lightgray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.input-duo {
  width: 15em;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
}

label {
  text-align: left;
}

input {
  height: 2em;
  border-radius: 5px;
  border: 1px solid lightgray;
}

input:focus {
  outline: none;
  border: 1px solid cornflowerblue;
}

button {
  color: white;
  background-color: cornflowerblue;
  border: 0;
  height: 3.5em;
  width: 10em;
  border-radius: 8px;
  margin: 10px auto;
}

button:hover {
  cursor: pointer;
  background-color: rgb(88, 139, 233);
}

</style>