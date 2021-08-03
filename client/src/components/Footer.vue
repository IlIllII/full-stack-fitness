<template>
    <div class="main">
        <a href="/">
            <div class="logo">
                <img height="48" width="48" src="../assets/logo.png" alt="">
            </div>
        </a>
        <div>
            <a href="/privacy">Privacy Policy</a>
            <span> | </span>
            <a href="/license">WTFPL</a>
            <span> | </span>
            <a href="https://icons8.com/">Icons from Icons8</a>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.logo {
    width: 48px;
    padding: 5px;
    background-color: cornflowerblue;
    border-radius: 10px;
}

a {
    font-size: 10px;
}
</style>