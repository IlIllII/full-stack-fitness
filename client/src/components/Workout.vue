<template>
    <div class="main">
        <div id="workout-A" v-if="workoutHistory.lastWorkout == 'B'">
            
            <div class="workout-container">
                <h1>Workout A</h1>

                <div class="exercise-container">
                    <h2>Deadlift</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="deadliftWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="deadliftSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="deadliftReps" class="text-input" type="text">
                    </div>

                    <label for="">Failed?</label>
                    <input v-model="deadliftFail" type="checkbox" name="" id="">
                </div>

                <div class="exercise-container">
                    <h2>Shoulder Press</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="pressWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="pressSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="pressReps" class="text-input" type="text">
                    </div>

                    <label for="">Failed?</label>
                    <input v-model="pressFail" type="checkbox" name="" id="">
                </div>

                <div class="exercise-container">
                    <h2>Pullups</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="pullupWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="pullupSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="pullupReps" class="text-input" type="text">
                    </div>
                </div>

                <hr>
                <button @click="submitA">Submit</button>
            </div>

        </div>
        <div id="workout-B" v-if="workoutHistory.lastWorkout == 'A'">
            
            <div class="workout-container">
                <h1>Workout B</h1>

                <div class="exercise-container">
                    <h2>Squat</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="squatWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="squatSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="squatReps" class="text-input" type="text">
                    </div>

                    <label for="">Failed?</label>
                    <input v-model="squatFail" type="checkbox" name="" id="">
                </div>

                <div class="exercise-container">
                    <h2>Bench Press</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="benchWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="benchSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="benchReps" class="text-input" type="text">
                    </div>

                    <label for="">Failed?</label>
                    <input v-model="benchFail" type="checkbox" name="" id="">
                </div>

                <div class="exercise-container">
                    <h2>Row</h2>

                    <div class="label-container">
                        <label for="">Weight</label>
                        <input v-model="rowWeight" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Sets</label>
                        <input v-model="rowSets" class="text-input" type="text">
                    </div>

                    <div class="label-container">
                        <label for="">Reps</label>
                        <input v-model="rowReps" class="text-input" type="text">
                    </div>

                    <label for="">Failed?</label>
                    <input v-model="rowFail" type="checkbox" name="" id="">
                </div>

                <hr>
                <button @click="submitB">Submit</button>
            </div>

        </div>
    </div>
    
</template>


<script>
import API from "../services/Api";

export default {
    // data() {
    //     return {
    //         workoutHistory: "",
    //     }
    // },
    data() {
        return {
            workoutHistory: "",

            benchWeight: 0,
            benchSets: 3,
            benchReps: 5,
            benchFail: false,

            pressWeight: 0,
            pressSets: 0,
            pressReps: 0,
            pressFail: false,

            squatWeight: 0,
            squatSets: 0,
            squatReps: 0,
            squatFail: false,

            deadliftWeight: 0,
            deadliftSets: 0,
            deadliftReps: 0,
            deadliftFail: false,

            rowWeight: 0,
            rowSets: 0,
            rowReps: 0,
            rowFail: false,

            pullupWeight: 0,
            pullupSets: 0,
            pullupReps: 0,

        }
    },
    async mounted() {
        console.log("loading data")
        try {
            console.log("Loading data...")
            let username = window.localStorage.getItem("username")
            if (!username) {
                this.$router.push("/login")
            }
            await fetch(API.baseURL + "/workout" + "/" + username, {
                method: "GET",
                mode: "cors",
                headers: {authorization: `Bearer ${window.localStorage.getItem("token")}`},
            }).then((res) => res.json()).then((data) => {
                console.log(data);
                this.workoutHistory = data.workoutHistory;
                let hx = this.workoutHistory;
                console.log(hx.lastWorkout)

                if (hx.bench[hx.bench.length - 1].failed == true) {
                    this.benchWeight = Math.round((hx.bench[hx.bench.length - 1].weight * 0.8)/10) * 10
                } else {
                    this.benchWeight = hx.bench[hx.bench.length - 1].weight + (2.5 * 2 ** Math.max(2 - hx.benchFails, 0))
                }
                this.benchSets = 3
                this.benchReps = 5
                this.benchFail = false
                
                if (hx.press[hx.press.length - 1].failed == true) {
                    this.pressWeight = Math.round((hx.press[hx.press.length - 1].weight * 0.8)/10) * 10
                } else {
                    this.pressWeight = hx.press[hx.press.length - 1].weight + (2.5 * 2 ** Math.max(2 - hx.pressFails, 0))
                }
                this.pressSets = 3
                this.pressReps = 5
                this.pressFail = false

                if (hx.squat[hx.squat.length - 1].failed == true) {
                    this.squatWeight = Math.round((hx.squat[hx.squat.length - 1].weight * 0.8)/10) * 10
                } else {
                    this.squatWeight = hx.squat[hx.squat.length - 1].weight + (2.5 * 2 ** Math.max(2 - hx.squatFails, 0))
                }
                this.squatSets = 3
                this.squatReps = 5
                this.squatFail = false

                if (hx.deadlift[hx.deadlift.length - 1].failed == true) {
                    this.deadliftWeight = Math.round((hx.deadlift[hx.deadlift.length - 1].weight * 0.8)/10) * 10
                } else {
                    this.deadliftWeight = hx.deadlift[hx.deadlift.length - 1].weight + (2.5 * 2 ** Math.max(2 - hx.deadliftFails, 0))
                }
                this.deadliftSets = 3
                this.deadliftReps = 5
                this.deadliftFail = false

                if (hx.row[hx.row.length - 1].failed == true) {
                    this.rowWeight = Math.round((hx.row[hx.row.length - 1].weight * 0.8)/10) * 10
                } else {
                    this.rowWeight = hx.row[hx.row.length - 1].weight + (2.5 * 2 ** Math.max(2 - hx.rowFails, 0))
                }
                this.rowSets = 3
                this.rowReps = 5
                this.rowFail = false

                this.pullupWeight = hx.pullups[hx.pullups.length - 1].weight
                this.pullupSets = 3
                this.pullupReps = 8

                this.workoutHistory.lastWorkout = hx.lastWorkout
            })

        } catch(err) {
            console.log(err);
        }
    },
    methods: {
        submitB() {
            let squat = {
                date: Date.now(),
                weight: this.squatWeight,
                sets: this.squatSets,
                reps: this.squatReps,
                failed: this.squatFail,
            }
            let bench = {
                date: Date.now(),
                weight: this.benchWeight,
                sets: this.benchSets,
                reps: this.benchReps,
                failed: this.benchFail,
            }
            let row = {
                date: Date.now(),
                weight: this.rowWeight,
                sets: this.rowSets,
                reps: this.rowReps,
                failed: this.rowFail,
            }

            this.workoutHistory.bench.push(bench)
            this.workoutHistory.squat.push(squat)
            this.workoutHistory.row.push(row)

            if (this.squatFail) {
                this.workoutHistory.squatFails += 1
            }
            if (this.benchFail) {
                this.workoutHistory.benchFails += 1
            }
            if (this.rowFail) {
                this.workoutHistory.rowFails += 1
            }
            this.workoutHistory.lastWorkout = "B";
            console.log(this.workoutHistory);

            fetch(API.baseURL + "/workout/" + window.localStorage.getItem("username"), {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(this.workoutHistory),
            }).then((res) => {
                console.log(res);
            })
            this.$router.push('/')
        },
        submitA() {
            let deadlift = {
                date: Date.now(),
                weight: this.deadliftWeight,
                sets: this.deadliftSets,
                reps: this.deadliftReps,
                failed: this.deadliftFail,
            }
            let press = {
                date: Date.now(),
                weight: this.pressWeight,
                sets: this.pressSets,
                reps: this.pressReps,
                failed: this.pressFail,
            }
            let pullups = {
                date: Date.now(),
                weight: this.pullupWeight,
                sets: this.pullupSets,
                reps: this.pullupReps,
            }

            this.workoutHistory.deadlift.push(deadlift)
            this.workoutHistory.press.push(press)
            this.workoutHistory.pullups.push(pullups)

            if (this.deadliftFail) {
                this.workoutHistory.deadliftFails += 1
            }
            if (this.pressFail) {
                this.workoutHistory.pressFails += 1
            }
            this.workoutHistory.lastWorkout = "A";
            console.log(this.workoutHistory);

            fetch(API.baseURL + "/workout/" + window.localStorage.getItem("username"), {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${window.localStorage.getItem("token")}`,
                },
                body: JSON.stringify(this.workoutHistory),
            }).then((res) => {
                console.log(res);
            })
            this.$router.push('/')
        },
    }
}
</script>



<style scoped>

.main {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.workout-container {
    max-width: 100%;
}

.label-container {
    margin: auto;
    max-width: 10em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.text-input {
    max-width: 5em;
}

</style>