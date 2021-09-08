<template>
  <div class="container">
    <div class="button-holder">
      <button @click="showCard">{{ btnText }}</button>
    </div>
    <div class="card" v-if="show">
      <div class="inner-card">
        <div class="header" :style="bgColor">{{ randomHappening.name }}</div>
        <div class="date">
          {{ fromTo }}
        </div>
        <div class="talents">
          <div
            v-for="talent in randomHappening.talent"
            :key="talent"
            class="talent"
            :class="cols"
            :style="bgColor"
          >
            {{ talent }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { textualDate } from "../helpers";
export default {
  data() {
    return {
      show: false,
      happenings: null,
      randomHappening: null,
    };
  },

  methods: {
    showCard() {
      if (!this.show) {
        this.loadRandomHappening();
        console.log(this.randomHappening);
      }

      this.show = !this.show;
    },

    loadHappenings() {
      fetch("http://localhost:3000/happenings")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.happenings = data;
        });
    },
    loadRandomHappening() {
      this.randomHappening =
        this.happenings[Math.floor(Math.random() * this.happenings.length)];
    },
  },

  computed: {
    btnText() {
      return this.show ? "Hide" : "Show";
    },

    fromTo() {
      return `${textualDate(this.randomHappening.from)} - ${textualDate(
        this.randomHappening.to
      )} `;
    },
    cols() {
      return `cols_${this.randomHappening.talent.length}`;
    },

    bgColor() {
      return { backgroundColor: this.randomHappening.color };
    },
  },
  created() {
    this.loadHappenings();
  },
};
</script>

<style  lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  font-size: 62.5%;
}

body {
  background-color: black;
  font-weight: 400;
  line-height: 1.7;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;

  .container {
    width: 192rem;
    height: 95rem;
    background: #333;
    margin: 10rem auto;
    position: relative;

    .button-holder {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      button {
        padding: 1rem;
        width: 20rem;
        color: #fff;
        border: none;
        background: orangered;
        font-size: 2rem;
        font-weight: bold;
        border-radius: 0.5rem;
        cursor: pointer;

        &:hover {
          background: orchid;
          color: #f4f4f4;
        }
      }
    }

    .card {
      font-size: 2rem;

      color: #fff;
      text-shadow: 2px 2px #000;
      background: #fff;
      text-align: center;
      border-radius: 1.5rem;
      width: 90rem;
      margin: auto auto;
      padding: 0.4rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: slide-in 1s ease;

      .inner-card {
        background: #000;
        padding: 1rem;
        border-radius: inherit;

        .header {
          font-weight: bold;
          padding: 3.5rem 3rem;
          border-top-left-radius: inherit;
          border-top-right-radius: inherit;
          font-size: 3rem;
          text-transform: uppercase;
          line-height: 0.85;
        }
        .date {
          color: #000;
          background: #fff;
          text-shadow: none;
          text-transform: none;
          padding: 1.5rem 0;
          margin: 1rem 0;
        }
        .talents {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;

          .cols_1 {
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
          }
          .cols_2 {
            &:nth-of-type(1) {
              border-bottom-left-radius: 1rem;
              text-align: left;
            }

            &:nth-of-type(2) {
              border-bottom-right-radius: 1rem;
              text-align: right;
            }
          }

          .cols_3 {
            &:nth-of-type(1) {
              border-bottom-left-radius: 1rem;
              text-align: left;
            }
            &:nth-of-type(3) {
              border-bottom-right-radius: 1rem;
              text-align: right;
            }
          }

          .talent {
            flex: 1;
            padding: 4rem 1rem;
            word-break:break-all;
            font-size: 4rem;
          }
        }
      }
    }
  }

  @keyframes slide-in {

    0%{
      transform: translateX(-100%) scale(.5);
    }

    70%{
      transform: translateX(20%) scale(1.5);
    }

    100%{
      transform: translate(-50%, -50%) scale(1)
    }
    
  }
}
</style>