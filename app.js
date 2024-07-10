function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min )) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      currentHeals: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
       return {width: '0%'};
      }
      return {width: this.monsterHealth + '%'};
    },
    playerBarStyles() {
      if(this.playerHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.playerHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
    mayUseHealing() {
      return this.currentHeals >= 5;
    }
  },
  watch: {
    playerHealth(value) {
      if(value <=0 && this.monsterHealth <= 0) {
        //Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        //Player Lost
        this.winner = 'monster';

      }
    },
    monsterHealth(value) {
      if(value <=0 && this.playerHealth <= 0) {
        //Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        //Monster Lost
        this.winner = 'player';

      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.currentHeals = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.addLogMessage('player', 'attacked', damage);
      this.attackPlayer();
    },
    attackPlayer() {
      const damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.addLogMessage('monster', 'attacked', damage);

    },
    specialAttackMonster() {
      this.currentRound++;
      const damage = getRandomValue(10, 22);
      this.monsterHealth -= damage;
      this.addLogMessage('player', 'superAttack', damage);

      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      this.currentHeals++;
      const heal = getRandomValue(8, 20);
      if (this.playerHealth + heal >= 100) {
        this.playerHealth = 100;
      }
      this.playerHealth += heal;
      this.addLogMessage('player', 'heal', heal);
      this.attackPlayer();
    },
    surrender() {
      this.winner ='monster';
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    }
  }
})

app.mount('#game')