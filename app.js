function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
    },
    specialAttackMonster() {
      this.currentRound++;
      const damage = getRandomValue(10, 22);
      this.monsterHealth -= damage;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const heal = getRandomValue(8, 20);
      if (this.playerHealth + heal > 100) {
        this.playerHealth = 100;
      }
      this.playerHealth += heal;
      this.attackPlayer();
    }
  }
})

app.mount('#game')