let hero = { left: 540, top: 700 };
let missiles = [];
let enemies = [
  { left: 200, top: 100 },
  { left: 300, top: 100 },
  { left: 400, top: 100 },
  { left: 500, top: 100 },
  { left: 600, top: 100 },
  { left: 700, top: 100 },
  { left: 800, top: 100 },
  { left: 900, top: 100 },
  { left: 200, top: 175 },
  { left: 300, top: 175 },
  { left: 400, top: 175 },
  { left: 500, top: 175 },
  { left: 600, top: 175 },
  { left: 700, top: 175 },
  { left: 800, top: 175 },
  { left: 900, top: 175 },
];

document.onkeydown = function move_hero(a) {
  console.log(a.keyCode);
  const left_key = 37;
  const right_key = 39;
  const space_bar = 32;
  if (a.keyCode == left_key && hero.left > 0) {
    hero.left = hero.left - 10;
    document.querySelector('#hero').style.left = hero.left;
  }
  if (a.keyCode == right_key && hero.left < 1150) {
    hero.left = hero.left + 10;
    document.querySelector('#hero').style.left = hero.left;
  }
  if (a.keyCode == space_bar) {
    missiles.push({
      left: hero.left + 20,
      top: hero.top - 20,
    });
    draw_missiles();
  }
};

function draw_enemies() {
  document.querySelector('#enemies').innerHTML = ``;
  enemies.forEach((a) => {
    // console.log(a);
    document.querySelector('#enemies').innerHTML += `
    <div class="enemy" style="left: ${a.left}; top: ${a.top}"></div>
    `;
  });
}

function draw_missiles() {
  document.querySelector('#missiles').innerHTML = '';
  missiles.forEach((a) => {
    console.log(a);
    document.querySelector('#missiles').innerHTML += `
    <div class="missile1" style= "left: ${a.left}; top: ${a.top}"></div>
    `;
  });
}
function update_missiles_position() {
  missiles = missiles.map((a) => ({ ...a, top: a.top - 30 }));
}

function update_enemies_position() {
  enemies = enemies.map((a) => ({ ...a, top: a.top + 10 }));
}

function check_collision() {
  for (enemy = 0; enemy < enemies.length; enemy++) {
    for (missile = 0; missile < missiles.length; missile++) {
      if (
        missiles[missile].top >= enemies[enemy].top &&
        missiles[missile].top <= enemies[enemy].top + 50 &&
        missiles[missile].left >= enemies[enemy].left &&
        missiles[missile].left <= enemies[enemy].left + 50
      ) {
        enemies.splice(enemy, 1);
        missiles.splice(missile, 1);
      }
    }
  }
}

function game_end() {
  if (enemies.length === 0) {
    const container = document.querySelector('#background');
    const result = document.createElement('div');
    result.className = 'result';
    result.innerText = 'You Won 🏆';
    container.append(result);
    clearInterval(clear_all);
    document.onkeydown = null;
  } else {
    for (enemy = 0; enemy < enemies.length; enemy++) {
      if (enemies[enemy].top >= hero.top - 40) {
        container = document.querySelector('#background');
        result = document.createElement('div');
        result.className = 'result';
        result.innerText = 'You Lost 🤦';
        container.append(result);
        clearInterval(clear_all);
        document.onkeydown = null;
      }
    }
  }
}
clear_all = setInterval(() => {
  draw_enemies();
  draw_missiles();
  update_missiles_position();
  update_enemies_position();
  check_collision();
  game_end();
}, 1000 / 2);

// let hero = {
//   left: 575,
//   top: 700,
// };
// let missiles = [];
// let enemies = [
//   { left: 200, top: 100 },
//   { left: 300, top: 100 },
//   { left: 400, top: 100 },
//   { left: 500, top: 100 },
//   { left: 600, top: 100 },
//   { left: 700, top: 100 },
//   { left: 800, top: 100 },
//   { left: 900, top: 100 },
//   { left: 200, top: 175 },
//   { left: 300, top: 175 },
//   { left: 400, top: 175 },
//   { left: 500, top: 175 },
//   { left: 600, top: 175 },
//   { left: 700, top: 175 },
//   { left: 800, top: 175 },
//   { left: 900, top: 175 },
// ];

// document.onkeydown = function moveHero(event) {
//   const left = 37;
//   const right = 39;
//   const up = 38;
//   const down = 40;
//   const space = 32;
//   console.log(event.keyCode);
//   if (event.keyCode === left && hero.left > 10) {
//     hero.left = hero.left - 15;
//     document.querySelector('#hero').style.left = hero.left;
//   }
//   if (event.keyCode === right && hero.left < 1140) {
//     hero.left = hero.left + 15;
//     document.querySelector('#hero').style.left = hero.left;
//   }
//   if (event.keyCode === up && hero.top > 240) {
//     hero.top = hero.top - 15;
//     document.querySelector('#hero').style.top = hero.top;
//   }
//   if (event.keyCode === down && hero.top < 720) {
//     hero.top = hero.top + 15;
//     document.querySelector('#hero').style.top = hero.top;
//   }

//   if (event.keyCode === space) {
//     missiles.push({
//       left: hero.left,
//       top: hero.top - 20,
//     });
//     drawMissiles();
//   }
// };

// function drawEnemies() {
//   document.querySelector('#enemies').innerHTML = '';
//   enemies.forEach((pos) => {
//     document.querySelector('#enemies').innerHTML += `
//         <div class="enemy" style="left:${pos.left}; top: ${pos.top}"></div>
//         `;
//   });
// }
// function drawMissiles() {
//   // document.querySelector('#missiles').innerHTML = '';
//   missiles.forEach((pos) => {
//     console.log(pos);
//     document.querySelector('#missiles').innerHTML = `
//     <div class="missile1" style="left:${pos.left}; top:${pos.top}"></div>`;
//   });
// }

// drawEnemies();
