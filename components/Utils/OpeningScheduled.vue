<template>
    <div class="day-selector" :id="'day-' + openinghour.day">
        <div class="day-header flex items-center" v-on:click="openThisDay()">
            <UtilsSwitch @changedState="selectDay($event)" type="big" :isactive="openinghour.hours.length > 0" />
            <div class="day-texts flex items-center">
                <span class="fontsize-sm-bold cinza">{{ findDay() }}</span>
                <span class="spacer">&nbsp;</span>
                <div class="day-hour flex items-center" v-for="(hour, index) in hours">
                    <span class="fontsize-sm cinza">{{ hour.initial_date }} - {{ hour.final_date }}</span>
                    <span class="spacer" v-if="index < (openinghour.hours.length - 1)">&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="day-hours">
            <div v-for="(hour, index) in hours" class="flex flex-col md:flex-row md:items-center">
                <input type="time" class="flex-auto" v-model="hour.initial_date">
                <span class="until fontsize-sm preto text-center md:text-left">até</span>
                <input type="time" class="flex-auto" v-model="hour.final_date">
                <div class="hour-buttons">
                    &nbsp;
                    <font-awesome v-if="index == (hours.length - 1)" icon="circle-plus" class="verde-escuro" v-on:click="addHour()" />
                    <font-awesome v-else icon="trash" class="vermelho-suave" v-on:click="removeHour(index)" />
                </div>
            </div>
            <button type="button" class="btn btn-primary float-none md:float-right" v-on:click="selectDay('button')">Salvar</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ["openinghour"],
    data() {
        return {
            hours: [],
            switchValue: false,
            thisDayElementId: '#day-' + this.openinghour.day
        }
    },
    methods: {
        addHour: function () {
            let newHour = {
                initial_date: "",
                final_date: ""
            }

            this.hours.push(newHour);
        },
        removeHour: function (indexToRemove) {
            this.hours.splice(indexToRemove, 1);
        },
        selectDay: function (switchValue) {
            this.switchValue = switchValue;

            if (switchValue == false) {
                this.hours = [];
            }

            if (switchValue == true) {
                this.openThisDay();
                this.addHour();
                return;
            }

            if (switchValue == "button" && this.haveInvalidValue()) {
                $(this.thisDayElementId).addClass("selected-error");
                return;
            } else {
                $(this.thisDayElementId).removeClass("selected-error");
            }

            let newOpeningHour = this.openinghour;
            newOpeningHour.hours = this.hours;

            this.closeDays();
            this.$emit("changed", newOpeningHour);
        },
        haveInvalidValue: function () {
            let invalidValue = false;

            if (this.openinghour.hours.length == 0 && this.hours.length == 0) {
                return true;
            }

            if (this.openinghour.hours.length != 0) {
                for (let i = 0; i < this.openinghour.hours.length; i++) {
                    if (this.openinghour.hours[i].initial_date == "" || this.openinghour.hours[i].final_date == "" || (this.openinghour.hours[i].initial_date == this.openinghour.hours[i].final_date)) {
                        invalidValue = true;
                    }
                }
            } else {
                for (let i = 0; i < this.hours.length; i++) {
                    if (this.hours[i].initial_date == "" || this.hours[i].final_date == "" || (this.hours[i].initial_date == this.hours[i].final_date)) {
                        invalidValue = true;
                    }
                }
            }

            return invalidValue;
        },
        findDay: function () {
            let dayString = "";

            switch (this.openinghour.day) {
                case 1:
                    dayString = "Domingo";
                    break;
                case 2:
                    dayString = "Segunda-feira";
                    break;
                case 3:
                    dayString = "Terça-feira";
                    break;
                case 4:
                    dayString = "Quarta-feira";
                    break;
                case 5:
                    dayString = "Quinta-feira";
                    break;
                case 6:
                    dayString = "Sexta-feira";
                    break;
                case 7:
                    dayString = "Sábado";
                    break;
                default:
                    dayString = "Dia inválido";
            }

            return dayString;
        },
        openThisDay: function () {
            this.closeDays();

            if (this.openinghour.hours.length || this.switchValue) {
                $(this.thisDayElementId).addClass("selected");
            }
        },
        closeDays: function () {
            $(".day-selector").each((index, item) => {
                let currentItem = $(item);
                let inputs = currentItem.find("input[type='time']");
                let hasEmptyValue = false;
                
                inputs.each((index, item) => {
                    let currentInput = $(item);

                    if (currentInput.val().trim() == "") {
                        hasEmptyValue = true;
                    }
                })

                if (currentItem.hasClass("selected-error") || hasEmptyValue) {
                    currentItem.removeClass("selected-error");
                    currentItem.find("#switch-input").click();
                }
            })

            $(".day-selector").removeClass("selected");
        }
    },
    mounted() {
        this.hours = this.openinghour.hours.length !== 0 ? [...this.openinghour.hours] : this.hours;
    }
}
</script>
<style scoped>
input, button {
    margin-right: 0 !important;
    max-width: initial !important;
}

.spacer {
    width: 4px;
    height: 4px;
    min-width: 4px;
    min-height: 4px;
    max-width: 4px;
    max-height: 4px;
    border-radius: 50%;
    background: var(--cinza);
    margin: 0 var(--space-4);
}

.day-selector {
    width: 100%;
    border: 1px solid var(--cinza-medio);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    margin: var(--space-4) 0;
    cursor: pointer;
    transition: all 0.4s;
    max-height: 53px;
    overflow: hidden;
}

.selected {
    border: 1px solid var(--verde-escuro);
    max-height: 2000px;
}

.selected-error {
    border: 1px solid var(--vermelho-suave);
}

.until {
    margin: 0 var(--space-4);
}

.day-hours > div, .day-hours button {
    margin-top: var(--space-4);
}

.hour-buttons {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
    justify-self: center;
}

@media (max-width: 768px) {
    .hour-buttons {
        margin-top: var(--space-3);

        & svg {
            display: flex;
            width: calc(100% - 24px);
            justify-content: center;
            padding: var(--space-4);
            margin-top: -11px;
            background-color: var(--cinza-claro);
            border-radius: var(--radius-md);
            cursor: pointer;
            transition: background-color 0.4s;
        }

            & svg:hover {
                background-color: var(--cinza-medio);
            }
    }

    .day-hours > div {
        margin-top: var(--space-8);
    }
}
</style>