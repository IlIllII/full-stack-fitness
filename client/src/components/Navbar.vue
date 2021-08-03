<template>
    <div class="main">
        <div class="side">
            <a href="/"><img height="36" width="36" src="../assets/logo.png"/></a>
            <a href="/"><button><strong>Home</strong></button></a>
        </div>
        <h1>Beginning Brawn</h1>
        <div style="justify-content: flex-end" class="side">
            <a href="/workout"><button><strong>Workout</strong></button></a>
            <a href="/about"><button><strong>About</strong></button></a>
            <a href="/login"><button><strong>Login</strong></button></a>
            <a href="/register"><button><strong>Register</strong></button></a>
        </div>
    </div>
</template>


<script>
export default {
    
}
</script>


<style scoped>

.main {
    background: cornflowerblue;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.side {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 450px;
    margin: 15px
}

button {
    border: 0 solid blue;
    outline: none;
    width: 8em;
    height: 3em;
    background-color: cornflowerblue;
    color: white;
}

button:hover {
    background-color: rgb(73, 106, 168);
    cursor: pointer;
}
</style>