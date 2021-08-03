<template>
    <div>
        <Navbar id="nav" />
        <div class="content">
            <!-- Landing Page -->
            <div class="head">
                <div class="text">
                    <h1 class="banner">A Better Way to Start Strength Training</h1>
                    <p>
                        Rigidly programmed, flexibly scheduled linear progression with less frequent squatting. If you thought <em>Starting Strengh</em> made you look like a dinosaur, welcome to <strong>Beginning Brawn.</strong>
                    </p>
                    <button>Sign Up</button>
                    <p style="font-size: 10px; text-align: center">Already have an account?
                    <a href="/login">Login</a></p>
                </div>
                <img width="480" height="360" src="../assets/linear-graph.png" alt="">
            </div>

            <hr>
            
            <!-- Separator -->
            <div class="separator">
                <div class="outline">
                    <div class="tools">
                        <h2 class="tools-text">The Tools for Your Goals</h2>
                    </div>
                </div>
            </div>
            
            <!-- Cards -->
            <div class="cards-container">
                <div class="card">
                    <img height="64" width="64" src="../assets/linear.gif" alt="">
                    <h3>Linear Progression</h3>
                    <p class="card-text">
                        Add weight in a linear fashion for optimal strength building.
                    </p>

                </div>
                <div class="card">
                    <img height="64" width="64" src="../assets/tracking.gif" alt="">
                    <h3>Progress Tracking</h3>
                    <p class="card-text">
                        Track and view your progress within the app and save workouts with the click of a button.
                    </p>
                    
                </div>
                <div class="card">
                    <img height="64" width="64" src="../assets/dumbbell.gif" alt="">
                    <h3>Massive Gainz</h3>
                    <p class="card-text">
                        Follow proven programming to make the most of your time in the gym.
                    </p>
                    
                </div>
            </div>

            <hr>

            <!-- Separator -->
            <div style="background-color: cornflowerblue" class="separator">
                <div style="background-color: cornflowerblue" class="outline">
                    <div style="background-color: #2c3e50" class="tools">
                        <h2 style="color: white" class="tools-text">Testimonials</h2>
                    </div>
                </div>
            </div>
            
            <!-- Testimonials -->
            <div class="test-container">
                <div class="inner-test-container">
                    <img class="arrow" @click="decrement()" height="48" width="48" src="../assets/arrow-left.png" alt="">

                    <div v-if="testimonial == 0" class="test-card">
                        <img height="256" width="256" src="../assets/t-rex.png" alt="">
                        <div class="test-caption">
                            <p class="quote">&#8220;</p>
                            <p class="quotation">I used to be a human, but then I tried Starting Strength. If only I had known about Beginning Brawn, I might still fit in my jeans!</p>
                            <p class="attr">- T-Rex</p>
                        </div>
                    </div>

                    <div v-if="testimonial == 1" class="test-card">
                        <img height="256" width="256" src="../assets/pumping-iron.png" alt="">
                        <div class="test-caption">
                            <p class="quote">&#8220;</p>
                            <p class="quotation">If you want to win Mr. Olympia like me, all you need to do is follow a good training program. Many exist, but my favorite and what I used personally is Beginning Brawn.</p>
                            <p class="attr">- Arnold Schwarzenegger</p>
                        </div>
                    </div>

                    <div v-if="testimonial == 2" class="test-card">
                        <img height="256" width="256" src="../assets/skinny-nerd.jpg" alt="">
                        <div class="test-caption">
                            <p class="quote">&#8220;</p>
                            <p class="quotation">I want to get buff ASAP, but I haven't ever worked out before. I heard that Beginning Brawn is the best program for people with my goals!</p>
                            <p class="attr">- Novice</p>
                        </div>
                    </div>

                    <img class="arrow" @click="increment()" height="48" width="48" src="../assets/arrow-right.png" alt="">
                </div>
            </div>

            <h2 class="banner">Not Convinced Yet?</h2>
            <p><strong>I wouldn't be either.</strong></p>
            <div>
                <p>I'd demand to know more about the program than some silly sales copy on the landing page. Toward this end, you can visit the about page to learn everything there is to know about this free program.</p>
                <a href="/about"><button>About</button></a>

            </div>

        </div>

        <Footer />
    </div>
</template>

<script>
import Navbar from "./Navbar.vue"
import Footer from "./Footer.vue"





export default {
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            testimonial: Math.floor(Math.random() * 3) // Randint 0-2
        }
    },
    methods: {
        increment() {
            this.testimonial++;
            if (this.testimonial > 2) {
                this.testimonial = 0;
            }
        },
        decrement() {
            this.testimonial--;
            if (this.testimonial < 0) {
                this.testimonial = 2;
            }
        },
    }
}
</script>


<style scoped>

.content {
    max-width: 50em;
    margin: auto;
}

.text {
    max-width: 300px;
}

.banner {
    text-align: left;
    font-weight: 900;
}

p {
    text-align: left;
}

.head {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 60px;
    margin-bottom: 50px;
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

.separator {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
    height: 100px;
    width: 100%;
    border-radius: 100px;
    margin-top: 50px;
    margin-bottom: 50px;
}

.outline {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
    width: 550px;
    height: 150px;
    border-radius: 300px;
}

.tools {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: cornflowerblue;
    width: 500px;
    height: 100px;
    margin: auto;
    border-radius: 300px;
}

.tools-text {
    margin: auto;
}

.cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 50px;
}

.card {
    width: 200px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    border: 2px solid lightgray;
    border-radius: 5px;
}

.card-text {
    text-align: center;
}

.test-container {
    border: 2px solid lightgray;
    width: 100%;
    padding: 15px;
    border-radius: 5px;
    margin: 50px 0;
}

.inner-test-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.test-card {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.test-caption {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.quote {
    font-size: 48px;
    font-weight: 900;
}

.attr {
    color: gray;
    text-align: right;
}

.quotation {
    text-align: center;
    max-width: 400px;
}

.arrow {
    cursor: pointer;
}

</style>