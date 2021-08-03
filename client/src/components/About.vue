<template>
    <div class="main">
        <Navbar />
        <div class="content">
            <h1>About</h1>
            <p>
                Beginning Brawn is a variant of the popular beginners strength training program, <em>Starting Strength</em> (SS). For those familiar with SS, the main difference between the programs lies in their squatting frequency. Where Starting Strength has practitioners squatting every workout, Beginning Brawn has squats every other workout. The idea behind this change is to make a more balanced program, because one of the main criticisms of SS is that it is too <a href="https://thefitness.wiki/faq/starting-strength-and-stronglifts-not-recommended/">squat-centric</a>. We can compare the programs broadly as follows:
            </p>
            <div class="tables">
                <div class="table">
                    <h2>Starting Strength</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Day 1</th>
                                <th>Day 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Squats</td>
                                <td>Squats</td>
                            </tr>
                            <tr>
                                <td>Bench Press</td>
                                <td>Shoulder Press</td>
                            </tr>
                            <tr>
                                <td>Deadlifts/Powercleans</td>
                                <td>Pullups</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table">
                    <h2>Beginning Brawn</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Day 1</th>
                                <th>Day 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Squats</td>
                                <td>Deadlifts</td>
                            </tr>
                            <tr>
                                <td>Bench Press</td>
                                <td>Shoulder Press</td>
                            </tr>
                            <tr>
                                <td>Rows</td>
                                <td>Pullups</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>

            <p>
                Now, there is some nuance lost in the comparison above. In SS, Rippetoe breaks the program into 3 phases. In phase 1, practitioners deadlift and squat every day. In phase two, they alternate deadlifting and power cleaning. In the final phase, lifters swap out deadlifts for pullups every other deadlift day, so essentially you deadlift every 4th workout and power clean every other workout. The trend as you progress through the phases is to deadlift ever less frequently.
            </p>

            <p>
                The reason for this is because Rippetoe believes that as your deadlift gets heavier, it will become too taxing to both deadlift and squat every workout. This might be true, but instead of dropping deadlifts to once every 4 workouts like in SS, we elect to alternate deadlifts and squats from the get-go. This way we don't tax the body too much yet we can maintain frequency on the deadlift. We won't be reaching max squatting weight as fast, but we will see better progress in our other lifts.
            </p>
            <p>
                Another alteration is substituting rows for power cleans. I love power cleans but they are too complicated for novice lifters to do without hurting themselves. If you want to powerclean and you're a novice you should get a coach first to teach you how to do it.
            </p>
            <p>
                Rows are a suitable alternative that offer activation of the rear deltoids and upper back, areas that don't get hit too hard in SS. In sum, rows make the program safer and more well rounded. As you progress and get more comfortable with lifting, I would encourage you to learn to power clean because they are one of the best exercises to do.
            </p>

            <h2>Programming Details</h2>
            <p>
                Here we will run through the details of the program. If this doesn't interest you, no worries; if you sign up and use the app this is all taken care of for you.
            </p>
            <p>
                As you can see in the table above, the program is comprised of two workouts. Lifters will go to the gym at most every other day and alternate workouts each gym session. For instance, you might do Workout 1 on Monday, Workout 2 on Wednesday, Workout 1 on Friday, Workout 2 on Sunday, etc.
            </p>
            <p>
                When you start the program, you will pick arbitrarily easy weights for each lift. You will perform 3 sets of 5 reps for each left, with the exception of pullups which you will do 3 sets of as many as you can.
            </p>
            <p>
                Every time you go to the gym you will increase the amount of weight for each lift that you perform. At first, you will increase the weight on each lift by 20 lbs. You will continue to do this every workout until it becomes too difficult and you fail to complete your 3 sets of 5 reps. At this point, if there is no other reason for your failure, such as lack of sleep or being hungover, you reset the weight on the failed lift to 80% of what it was previously and you start to increase it by 10 lbs each time you perform it. You then repeat the above process, except when you fail again you reset and start increasing in 5 lb increments. If you fail a lift for a 4th time, then you are done with linear progression on it and it is time to increase volume.
            </p>
            <p>
                Because of the structure of the program, you will probably fail earlier on bench press and shoulder press than squats and deadlifts. In this case, you have two options: you can either continue the program for squats and deadlifts while simply adding more volume to the chest and shoulders, or you can switch programs entirely.
            </p>
            <p>
                Once you have failed thrice on all of your lifts, you have gotten all you can out of this beginner program and it is time to move on to intermediate programs. At this point you have several options. Your choice will depend on factors such as how often you want to work out, what your goals are, what equipment you have available, what you like doing, your age, etc. You can browse programs on <a href="https://thefitness.wiki/routines/">The Fitness Wiki</a>
            </p>


        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "./Footer.vue"
import Navbar from "./Navbar.vue"


export default {
    components: {
        Navbar,
        Footer
    }
}
</script>

<style scoped>
.content {
    max-width: 50em;
    margin: 60px auto;
    line-height: 1.5em;
}

h1, h2 {
    text-align: left;
}

p {
    text-align: left;
}

.tables {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.table {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 30px;
}

table {
    border-collapse: collapse;
}

th, td {
    border: 1px solid black;
    width: 10em;
}
</style>