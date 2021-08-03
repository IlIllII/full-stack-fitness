<template>
  <div class="main">
    <a href="/"><img src="../assets/deadlift.gif"/></a>
    
    
    <h2>Login</h2>
    <div class="input-duo">
      <label for="username-input"><strong>Username</strong></label>
      <input type="text" id="username-input" v-model="username" />
    </div>
    <div class="input-duo">
      <label for="password-input"><strong>Password</strong></label>
      <input type="password" id="password-input" v-model="password" />
    </div>
    <button @click="onLogin()">Login</button>
    <p style="font-size: 10px">
      Don't have an account?
      <a href="/register">Register</a>
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
    async onLogin() {
      // Encode credentials into base64
      let credentials = btoa(`${this.username}:${this.password}`);

      // Authenticate at server
      const response = await fetch(API.baseURL + "/users", {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: `Basic ${credentials}`,
        },
      });

      // Parse response and store token/redirect as needed
      response.json().then((data) => {
        if (data.success == false) {
          alert("Login Failed."); // TODO: Improve this
        } else if (data.success == true) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("username", this.username);
          this.$router.push("/");
        }
      });
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