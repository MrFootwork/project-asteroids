var se=n=>{throw TypeError(n)};var ie=(n,e,t)=>e.has(n)||se("Cannot "+t);var f=(n,e,t)=>(ie(n,e,"read from private field"),t?t.call(n):e.get(n)),w=(n,e,t)=>e.has(n)?se("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t);var a=(n,e,t)=>(ie(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();var u,G,ce,de,j,ue,U,pe,me;class Qe{constructor({spaceshipElement:e,gameScreen:t,keys:i,state:s}){w(this,u);this.gameScreen=t,this.element=e,this.keys=i,this.isAccelerating=!1,this.isDecelerating=!1,this.state=s,this.power={shield:35,thruster:35,weapon:30},this.powerDisplayShield=this.gameScreen.querySelector("#ship .power-bars .power.shield"),this.powerDisplayThruster=this.gameScreen.querySelector("#ship .power-bars .power.thruster"),this.powerDisplayWeapon=this.gameScreen.querySelector("#ship .power-bars .power.weapon"),this.ANGLE_OFFSET=Math.PI/2,this.BASE_SPEED=8,this.ROTATIONAL_BASE_SPEED=.2,this.health=100,this.position={x:0,y:0},this.velocity={x:0,y:0},this.rotaionalVelocity=0,this.orientation=0,this.thrustOrientation=0,this.dimension={width:e.clientWidth,height:e.clientHeight},this.hasHitTheEdge=!1,this.thrustImageIsSet=!1,this.thrustElement=null}update(){a(this,u,pe).call(this),a(this,u,ce).call(this),a(this,u,de).call(this),a(this,u,j).call(this),a(this,u,ue).call(this),a(this,u,me).call(this),a(this,u,U).call(this),a(this,u,G).call(this)}deflectFromObstacle(){this.hasHitTheEdge&&(this.velocity.x=-this.velocity.x,this.velocity.y=-this.velocity.y,this.hasHitTheEdge=!1),a(this,u,j).call(this);const e=.9;this.velocity.x*=e,this.velocity.y*=e,a(this,u,U).call(this),a(this,u,G).call(this)}getCurrentVelocity(){return{x:Math.cos(this.orientation-this.ANGLE_OFFSET),y:Math.sin(this.orientation-this.ANGLE_OFFSET)}}getCollisionShape(){return{x:this.position.x+this.element.clientWidth/2,y:this.position.y+this.element.clientHeight/2,radius:this.element.clientWidth/2}}setPosition(e){if(!e){this.position.x=(gameScreen.clientWidth-this.element.clientWidth||70)/2,this.position.y=(gameScreen.clientHeight-this.element.clientHeight||70)/2;return}this.position.x=e.x,this.position.y=e.y}setVelocity(e){if(!e){this.velocity.x=0,this.velocity.y=0;return}this.velocity.x=e.x,this.velocity.y=e.y}addPowerTo(e){const i=Object.keys(this.power);if(this.power[e]===100){this.renderPowerDisplay();return}if(this.power[e]>90){this.power[e]=100;for(const s of i)s!==e&&(this.power[s]=0);this.renderPowerDisplay();return}for(const s of i)if(this.power[s]<=0&&s!==e){this.power[e]+=10;for(const o of i)o!==s&&o!==e&&(this.power[o]-=10);this.renderPowerDisplay();return}this.power[e]+=10;for(const s of i)s!==e&&(this.power[s]-=10/(i.length-1));this.renderPowerDisplay()}renderPowerDisplay(){this.powerDisplayShield.style.width=`${this.power.shield}%`,this.powerDisplayThruster.style.width=`${this.power.thruster}%`,this.powerDisplayWeapon.style.width=`${this.power.weapon}%`}}u=new WeakSet,G=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.element.style.transform=`rotate(${this.orientation}rad)`;const e=this.thrustElement.classList,t="thrusting";this.isAccelerating?e.add(t):e.remove(t)},ce=function(){if(!this.thrustImageIsSet){const e=document.createElement("div");this.element.appendChild(e),e.classList.add("thrust-image-container"),this.thrustElement=e,this.thrustImageIsSet=!0}},de=function(){this.isAccelerating=this.keys.arrowUp.pressed,this.isDecelerating=this.keys.arrowDown.pressed},j=function(){let e=0;this.keys.arrowLeft.pressed&&(e=-1),this.keys.arrowRight.pressed&&(e=1);const t=.03;this.rotaionalVelocity+=e*t;const i=.8;this.rotaionalVelocity*=i;const s=this.ROTATIONAL_BASE_SPEED;this.rotaionalVelocity>s&&(this.rotaionalVelocity=s),this.rotaionalVelocity<-s&&(this.rotaionalVelocity=-s),this.orientation+=this.rotaionalVelocity},ue=function(){let e=0;this.isAccelerating&&(e=.05+.15*this.power.thruster/100);const t=e*Math.cos(this.orientation-this.ANGLE_OFFSET),i=e*Math.sin(this.orientation-this.ANGLE_OFFSET);this.velocity.x+=t,this.velocity.y+=i;const s=.99;this.velocity.x*=s,this.velocity.y*=s,this.isDecelerating&&(this.velocity.x*=.94,this.velocity.y*=.94);const o=Math.sqrt(this.velocity.x**2+this.velocity.y**2),h=this.BASE_SPEED;o>h&&(this.velocity.x=this.velocity.x/o*h,this.velocity.y=this.velocity.y/o*h)},U=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},pe=function(){this.dimension.width||(this.dimension.width=this.element.clientWidth,this.dimension.height=this.element.clientHeight)},me=function(){const e=this.position.x<0||this.position.x+this.dimension.width>this.gameScreen.clientWidth||this.position.y<0||this.position.y+this.dimension.height>this.gameScreen.clientHeight;this.hasHitTheEdge=e};var L,ye,ge,fe;class Ze{constructor({gameScreen:e,spaceshipElement:t,position:i,velocity:s,projectileElement:o,orientation:h,damage:d=40}){w(this,L);this.gameScreen=e,this.spaceshipElement=t,this.element=o,this.width=d/2,this.damage=d,this.position=i,this.velocity=s,this.orientation=h,this.hasBeenRenderedOnce=!1,this.isOutside=!1,this.hasHitTarget=!1}update(){a(this,L,ge).call(this),a(this,L,fe).call(this),a(this,L,ye).call(this)}getCollisionShape(){return{x:this.position.x+this.width/2+20,y:this.position.y+this.width/2+20,radius:this.width/2}}}L=new WeakSet,ye=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.hasBeenRenderedOnce||(this.element.style.width=`${this.width}px`,this.element.style.transform=`
        translateX(${(this.spaceshipElement.clientWidth-this.width)/2}px)
        translateY(${(this.spaceshipElement.clientHeight-this.width)/2}px)
        rotate(${this.orientation}rad)
        translateY(-${(this.spaceshipElement.clientHeight-this.width+30)/2}px)
      `,this.hasBeenRenderedOnce=!0)},ge=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},fe=function(){const e=this.gameScreen.getBoundingClientRect(),t=this.element.getBoundingClientRect(),i=t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom;this.isOutside=i};const et="health-bar-container",tt="health-bar",st=.7,oe=.3;var C,we;class it{constructor({totalValue:e,currentValue:t=e,parentObject:i}){w(this,C);this.total=e,this.currentValue=t,this.parent=i,this.hasRenderedOnce=!1,this.container=null,this.bar=null}update(e){this.currentValue=e}render(){this.hasRenderedOnce||a(this,C,we).call(this),this.bar.style.width=`${this.currentValue*100/this.total}%`;const e=oe<this.currentValue/this.total&&this.currentValue/this.total<=st,t=this.currentValue/this.total<=oe;e&&(this.bar.style.backgroundColor="orange"),t&&(this.bar.style.backgroundColor="red")}}C=new WeakSet,we=function(){this.container=document.createElement("div"),this.bar=document.createElement("div"),this.container.classList.add(et),this.bar.classList.add(tt),this.container.appendChild(this.bar),this.parent.element.appendChild(this.container),this.container.style.width=`${this.parent.width/2}px`,this.container.style.top=`${this.parent.width-15}px`,this.container.style.left=`${this.parent.width/2-this.container.clientWidth/2}px`,this.hasRenderedOnce=!0};var g,Se,ve,Ee,Le,be;class ot{constructor({position:e,velocity:t,width:i,element:s,gameScreen:o}){w(this,g);this.gameScreen=o,this.element=s,this.image=s.querySelector("img"),this.position=e,this.velocity=t,this.width=i,this.ROTATIONAL_SPEED=-.04+Math.random()*.08,this.damage=Math.round(i/3),this.orientation=0,this.isOutside=!1,this.hasCollided=!1,this.hasEnteredScreen=!1,this.hasBeenRenderedOnce=!1,this.health=Math.round(i),this.healthBar=new it({totalValue:this.health,parentObject:this})}update(){a(this,g,ve).call(this),a(this,g,Ee).call(this),this.hasEnteredScreen&&a(this,g,be).call(this),this.hasEnteredScreen||a(this,g,Le).call(this),a(this,g,Se).call(this)}getCollisionShape(){return{x:this.position.x+this.width/2,y:this.position.y+this.width/2,radius:this.width/2}}}g=new WeakSet,Se=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.image.style.transform=`rotate(${this.orientation}rad)`,this.hasBeenRenderedOnce||(this.element.style.width=`${this.width}px`,this.image.style.width=`${this.width}px`,this.hasBeenRenderedOnce=!0)},ve=function(){this.orientation+=this.ROTATIONAL_SPEED},Ee=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},Le=function(){const e=this.position.x+this.width>=20&&this.position.x<=this.gameScreen.clientWidth-20&&this.position.y+this.width>=20&&this.position.y<=this.gameScreen.clientHeight-20;this.hasEnteredScreen=e},be=function(){const e=this.position.x+this.width<20||this.position.x>this.gameScreen.clientWidth-20||this.position.y+this.width<20||this.position.y>this.gameScreen.clientHeight-20;this.isOutside=e};const H={1:{initialAsteroids:3,spawnRate:5e3,speedMultiplier:1,startPosition:null,asteroidSpeed:1.5},2:{initialAsteroids:5,spawnRate:4e3,speedMultiplier:1.2,startPosition:null,asteroidSpeed:2},3:{initialAsteroids:7,spawnRate:3e3,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2},4:{initialAsteroids:15,spawnRate:2e3,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2},5:{initialAsteroids:20,spawnRate:1500,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2.5},6:{initialAsteroids:25,spawnRate:1e3,speedMultiplier:2,startPosition:null,asteroidSpeed:2.5}},R={pause:{message:`
      <p class="pause">PAUSE ⏱</p>
      <p>Take a break! You deserve it. 🍵</p>
      <p>Click on CONTINUE, press P or the PAUSE Button</p>
      <p>whenever you are ready.</p>
    `,preset:"pause"},lose:{message:`
      <p class="lose">DEFEAT 💀</p>
      <p>Don't give up! You can do it.</p>
      <p>Wanna try this level again? 💪🏻</p>
    `,preset:"lose"},win:{message:`
      <p class="win">VICTORY ✌🏻</p>
      <p>Good job! Was this level to easy?</p>
      <p>Now let's move on to the next one.</p	>
      <p>Can you handle even more asteroids? ☄</p>
    `,preset:"win"}},nt="mrfootwork.github.io",at="project-asteroids";function M(){return window.location.hostname===nt?`/${at}/`:""}const K=60,rt=Math.round(1e3/K),ne=200,ae=70,re=1,D=100,N={shield:35,thruster:35,weapon:30};var E,P,q,O,r,z,Te,xe,Ae,Y,Pe,Oe,X,ke,Ie,J,Q,Z,He;class ht{constructor({gameScreen:e,state:t,statistics:i}){w(this,r);w(this,E,new Audio("assets/sounds/rocket-thrust.wav"));w(this,P,new Audio("assets/sounds/rock-break.mp3"));w(this,q,new Audio("assets/sounds/metal-clang.mp3"));w(this,O,new Audio("assets/sounds/hit-against-wall.mp3"));this.keys={arrowUp:{pressed:!1},arrowDown:{pressed:!1},arrowLeft:{pressed:!1},arrowRight:{pressed:!1},space:{pressed:!1}},this.gameScreen=e,this.state=t,this.statistics=i,this.currentFrame=0,this.gameloopIntervalID=null,this.wasEnded=!1,this.isPaused=!1,this.currentLevelID=re,this.currentLevel=H[this.currentLevelID],this.remainingTime=ae,this.spaceship=new Qe({spaceshipElement:a(this,r,He).call(this),gameScreen:e,keys:this.keys,state:t}),this.player={health:3,score:0,hasWon:!1,shots:0,shotsHit:0,escapedTargets:0},this.frameAtObstacleHit=null,this.HIT_OBSTACLE_DURATION=40,this.projectiles=[],this.fireRate=ne,this.lastFired=null,this.asteroids=[],this.baseAsteroidSpeed=this.currentLevel.asteroidSpeed,f(this,E).volume=.2,f(this,E).loop=!0,this.gameUI=this.gameScreen.querySelector("#gameUI"),this.uiChildren=this.gameScreen.querySelectorAll("#gameUI>div"),console.log("🚀 ~ Game ~ constructor ~ this.uiChildren:",this.uiChildren)}start(){requestAnimationFrame(()=>{timeDisplay.textContent=this.getFormattedRemainingTime(),a(this,r,Q).call(this),a(this,r,Z).call(this),a(this,r,J).call(this)}),this.screenSize={width:this.gameScreen.clientWidth,height:this.gameScreen.clientHeight},this.currentLevel=H[this.currentLevelID],a(this,r,Oe).call(this,this.currentLevel.initialAsteroids),requestAnimationFrame(()=>a(this,r,z).call(this)),console.warn("game at start: ",this)}reset(){clearInterval(this.gameloopIntervalID),this.gameloopIntervalID=null,this.currentFrame=0,this.remainingTime=ae,this.spaceship.power.shield=N.shield,this.spaceship.power.thruster=N.thruster,this.spaceship.power.weapon=N.weapon,this.spaceship.renderPowerDisplay(),this.uiChildren.forEach(e=>e.style.backgroundColor="hsla(200, 75%, 50%, 0.2)"),this.player.hasWon||(this.currentLevelID=re),this.player.hasWon&&H[this.currentLevelID+1]&&++this.currentLevelID,this.currentLevel=H[this.currentLevelID],[this.asteroids,this.projectiles].forEach((e,t)=>{const i=[".asteroid",".projectile"];for(let o=e.length-1;o>=0;o--)e[o].element.remove(),e.splice(o,1);const s=document.querySelectorAll(i[t]);for(const o of s)o.remove()}),this.wasEnded=!1,this.isPaused=!1,this.player.health=D,this.player.score=0,this.player.shots=0,this.player.shotsHit=0,this.player.escapedTargets=0,this.player.hasWon=!1,this.spaceship.setPosition(this.currentLevel.startPosition),this.spaceship.setVelocity(),this.spaceship.orientation=0,this.spaceship.update(),this.fireRate=ne,this.lastFired=null,this.baseAsteroidSpeed=this.currentLevel.asteroidSpeed}resizeScreen(){this.screenSize={width:this.gameScreen.clientWidth,height:this.gameScreen.clientHeight}}onKeyDown(e){switch(e.code){case"ArrowUp":case"KeyW":this.keys.arrowUp.pressed=!0,this.state.sfxOn&&!this.isPaused&&f(this,E).play();break;case"ArrowDown":case"KeyS":this.keys.arrowDown.pressed=!0;break;case"ArrowLeft":case"KeyA":this.keys.arrowLeft.pressed=!0;break;case"ArrowRight":case"KeyD":this.keys.arrowRight.pressed=!0;break;case"Space":this.keys.space.pressed=!0;break}}onKeyUp(e,t){switch(e.code){case"ArrowUp":case"KeyW":this.keys.arrowUp.pressed=!1,f(this,E).pause(),f(this,E).currentTime=0;break;case"ArrowDown":case"KeyS":this.keys.arrowDown.pressed=!1;break;case"ArrowLeft":case"KeyA":this.keys.arrowLeft.pressed=!1;break;case"ArrowRight":case"KeyD":this.keys.arrowRight.pressed=!1;break;case"Space":this.keys.space.pressed=!1;break;case"KeyJ":this.spaceship.addPowerTo("shield");break;case"KeyK":this.spaceship.addPowerTo("thruster");break;case"KeyL":this.spaceship.addPowerTo("weapon");break;case"KeyP":case"Pause":this.toggleMusicVolume(t),this.showModal(R.pause),this.togglePause();break}}togglePause(){if(!this.isPaused){a(this,r,Y).call(this),this.isPaused=!0;return}if(this.isPaused){a(this,r,z).call(this),this.isPaused=!1,this.state.modal.element.close();return}}toggleMusicVolume(e){this.state.musicLow||(e.volume-=.2),this.state.musicLow&&(e.volume+=.2),this.state.musicLow=!this.state.musicLow}getFormattedRemainingTime(){const e=Math.floor(Math.max(this.remainingTime,0)/60),t=(Math.max(this.remainingTime,0)%60).toString().padStart(2,"0");return`${e}:${t}`}showModal({message:e,preset:t="lose"}){const i=this.state.modal.element,s=i.querySelector("p#modalMessage"),o=i.querySelector("#positive"),h=i.querySelector("#negative");s.innerHTML=e,t==="win"&&(d(),s.classList.add("win"),o.innerHTML="Continue",h.innerHTML="Leave Game"),t==="lose"&&(d(),s.classList.add("lose"),o.innerHTML="Try Again",h.innerHTML="Leave Game"),t==="pause"&&(d(),s.classList.add("pause"),o.innerHTML="Continue",h.innerHTML="Leave Game");function d(){s.classList.value="",o.classList.value="",h.classList.value=""}i.showModal(),o.blur(),h.blur()}}E=new WeakMap,P=new WeakMap,q=new WeakMap,O=new WeakMap,r=new WeakSet,z=function(){this.gameloopIntervalID=setInterval(()=>{if(this.currentFrame++,a(this,r,J).call(this),this.wasEnded){a(this,r,Y).call(this),this.player.health<=0?(this.gameScreen.parentElement.style.backgroundColor="black",this.gameScreen.classList.add("shake"),this.showModal(R.lose)):this.showModal(R.win);return}a(this,r,xe).call(this)},rt)},Te=function(){le({spaceshipVelocity:this.spaceship.velocity,backgroundElement:backgroundImageSolid,decelerationFactor:.03}),le({spaceshipVelocity:this.spaceship.velocity,backgroundElement:backgroundImageTransparent,decelerationFactor:{x:.02,y:.08}})},xe=function(){a(this,r,Ae).call(this),this.spaceship.hasHitTheEdge||this.frameAtObstacleHit?a(this,r,Pe).call(this):this.spaceship.update(),a(this,r,Te).call(this),a(this,r,Ie).call(this),a(this,r,ke).call(this);e:for(let e=this.projectiles.length-1;e>=0;e--){const t=this.projectiles[e];t:for(let i=this.asteroids.length-1;i>=0;i--){const s=this.asteroids[i];if(he(t.getCollisionShape(),s.getCollisionShape())){f(this,P).currentTime=0,this.state.sfxOn&&f(this,P).play(),s.health-=t.damage,s.healthBar.update(s.health),s.healthBar.render(),t.hasHitTarget=!0,s.health<=0&&(this.player.score++,a(this,r,Q).call(this),s.element.remove(),this.asteroids.splice(i,1));break t}}if(t.hasHitTarget&&this.player.shotsHit++,t.isOutside||t.hasHitTarget){t.element.remove(),this.projectiles.splice(e,1);continue e}t.update()}for(let e=this.asteroids.length-1;e>=0;e--){const t=this.asteroids[e],i=he(this.spaceship.getCollisionShape(),t.getCollisionShape());if(i){this.player.health&&this.state.sfxOn&&f(this,q).play(),t.hasCollided=!0,this.player.health-=Math.round(t.damage*(1.05-this.spaceship.power.shield/100)),a(this,r,Z).call(this);const o=.7,h=.3,d=h<this.player.health/D&&this.player.health/D<=o,S=this.player.health/D<=h;d&&this.uiChildren.forEach(m=>m.style.backgroundColor="hsla(50, 80%, 60%, 0.2)"),S&&this.uiChildren.forEach(m=>m.style.backgroundColor="hsla(0, 75%, 60%, 0.4)")}if(i&&!this.player.health)break;const s=t.hasEnteredScreen&&t.isOutside;if(s&&this.player.escapedTargets++,s||t.hasCollided||t.health<=0||i){t.element.remove(),this.asteroids.splice(e,1);continue}t.update()}},Ae=function(){const e=this.remainingTime<=0,t=this.player.health<=0;e&&!t&&(this.player.hasWon=!0),(e||t)&&(this.wasEnded=!0)},Y=function(){clearInterval(this.gameloopIntervalID),this.gameloopIntervalID=null},Pe=function(){this.frameAtObstacleHit||(this.frameAtObstacleHit=this.currentFrame),this.spaceship.hasHitTheEdge&&this.state.sfxOn&&this.gameScreen.clientWidth&&(f(this,O).volume=.5,f(this,O).play()),this.spaceship.deflectFromObstacle(),this.currentFrame-this.frameAtObstacleHit>=this.HIT_OBSTACLE_DURATION&&(this.frameAtObstacleHit=null)},Oe=function(e){for(let t=0;t<e;t++)a(this,r,X).call(this)},X=function(){let e={x:null,y:null};const t=50+Math.floor(Math.random()*150),i=["top","right","bottom","left"][Math.floor(Math.random()*4)];let s=null;const o=.3,h=o*Math.random()-o/2;let d=null;const S=1/1.1;switch(i){case"top":e.x=Math.floor(Math.random()*this.screenSize.width),e.y=0-t,d=(e.x/this.screenSize.width-.5)*S,s=(.5+h+d)*Math.PI;break;case"right":e.x=this.screenSize.width+100,e.y=Math.floor(Math.random()*this.screenSize.height),d=(e.y/this.screenSize.height-.5)*S,s=(1+h+d)*Math.PI;break;case"bottom":e.x=Math.floor(Math.random()*this.screenSize.width),e.y=this.screenSize.height,d=(e.x/this.screenSize.width-.5)*S,s=(1.5+h-d)*Math.PI;break;case"left":e.x=0-t,e.y=Math.floor(Math.random()*this.screenSize.height),d=(e.y/this.screenSize.height-.5)*S,s=(2+h-d)*Math.PI;break}const m=.2+Math.random()*this.baseAsteroidSpeed*this.currentLevel.speedMultiplier,F={x:m*Math.cos(s),y:m*Math.sin(s)},y=document.createElement("div");y.className="asteroid";const p=document.createElement("img");p.src=`${M()}assets/images/asteroid.png`,y.appendChild(p),this.gameScreen.appendChild(y);const T=new ot({position:e,velocity:F,width:t,element:y,gameScreen:this.gameScreen});this.asteroids.push(T)},ke=function(){this.currentFrame*K%this.currentLevel.spawnRate===0&&a(this,r,X).call(this)},Ie=function(){const e=Date.now();if(this.keys.space.pressed&&e-this.lastFired>=this.fireRate){this.lastFired=e;const t=new Audio("assets/sounds/laser-gun-shot.mp3");this.state.sfxOn&&(t.volume=.3,t.play());const i=document.createElement("div");i.className="projectile",this.gameScreen.appendChild(i);const s=new Ze({gameScreen:this.gameScreen,position:{x:this.spaceship.position.x,y:this.spaceship.position.y},velocity:{x:8*this.spaceship.getCurrentVelocity().x,y:8*this.spaceship.getCurrentVelocity().y},projectileElement:i,orientation:this.spaceship.orientation,spaceshipElement:this.spaceship.element,damage:5+Math.round(35*this.spaceship.power.weapon/100)});this.player.shots++,this.projectiles.push(s)}},J=function(){this.currentFrame%K===0&&(this.remainingTime--,timeDisplay.textContent=this.getFormattedRemainingTime())},Q=function(){scoreDisplay.textContent=Math.max(this.player.score,0)},Z=function(){livesDisplay.textContent=Math.max(this.player.health,0)},He=function(){const e=document.createElement("div");e.id="spaceship";const t=document.createElement("img");return t.src=`${M()}assets/images/spaceship.png`,e.appendChild(t),this.gameScreen.appendChild(e),e};function he(n,e){const t=e.x-n.x,i=e.y-n.y;return Math.sqrt(t**2+i**2)<n.radius+e.radius}function le({spaceshipVelocity:n,backgroundElement:e,decelerationFactor:t}){typeof t=="number"&&(t={x:t,y:t});const i=window.getComputedStyle(e),s=i.backgroundPosition.includes(", "),o=s?1:0,[h,d]=s?i.backgroundPosition.split(", ")[o].split(" "):i.backgroundPosition.split(" "),S=parseFloat(h)+n.x*t.x,m=parseFloat(d)+n.y*t.y;e.style.backgroundPosition=`${s?"50% 50%, ":""}${S}% ${m}%`}var B,De;class lt{constructor(){w(this,B);this.games=[],this.currentRawGame=null}addGame(e){this.currentRawGame=e,a(this,B,De).call(this,e)}}B=new WeakSet,De=function(e){const t={timestamp:new Date,won:e.player.hasWon,level:e.currentLevelID,kills:e.player.score,escapedTargets:e.player.escapedTargets,shotsHit:e.player.shotsHit,shots:e.player.shots,accuracy:e.player.shotsHit/e.player.shots,health:Math.max(e.player.health,0)};this.games.push(t)};window.onload=()=>{var n={intro:{isPlaying:!1},musicOn:!0,sfxOn:!0,musicLow:!1,modal:{element:null}};const e=document.querySelector("#musicControlPanel"),t=document.querySelector(".icon-button.music"),i=document.querySelector(".icon-button.sfx"),s=document.querySelector("#gameModal"),o=s.querySelector("p#modalMessage"),h=s.querySelector("#positive"),d=s.querySelector("#negative");n.modal.element=s;const S=document.querySelector("#introOverlay"),m=document.querySelector("#introScreen"),F=document.querySelector("#skipIntroInstruction"),y=document.querySelector("#videoPlayer");y.muted=!0;const p=document.getElementById("musicPlayer"),T=document.querySelector("#musicPlayer source"),_=document.querySelector("#homeScreen"),Re=document.querySelector("#startButton"),Me=document.querySelector("#newGameButton");document.querySelector("#settingsButton"),document.querySelector("#exitButton");const x=document.querySelector("#gameScreen");document.querySelector("#backgroundImageSolid"),document.querySelector("#backgroundImageTransparent");const Ce=document.querySelector("#gameOverButton"),qe=document.querySelector("#pauseButton");document.querySelector("#timeDisplay"),document.querySelector("#scoreDisplay"),document.querySelector("#livesDisplay");const k=document.querySelector("#resultScreen"),Be=document.querySelector("#resultSubTitle"),Fe=document.querySelector("#toHomeButton"),_e=document.querySelector("#restartButton"),$=document.querySelector("#buttonHoverSoundPlayer"),$e=document.querySelectorAll("button:not(:disabled)"),We=document.querySelectorAll("audio.sfx"),ee=new Audio("assets/sounds/sci-fi-click.wav");ee.volume=.4;const A=new lt,l=new ht({gameScreen:x,state:n,statistics:A});d.addEventListener("click",te),h.addEventListener("click",()=>{if(o.classList.contains("pause")){l.toggleMusicVolume(p),l.togglePause(),s.close();return}o.classList.contains("win")&&(A.addGame(l),console.log(A)),l.reset(),s.close(),l.start()}),m.addEventListener("click",Ve),m.addEventListener("keyup",Ne),Ue(),Re.addEventListener("click",W),Me.addEventListener("click",()=>{l.currentLevelID=1,W()}),Fe.addEventListener("click",I),_e.addEventListener("click",W),$e.forEach(c=>{c.addEventListener("mouseenter",()=>{n.sfxOn&&($.currentTime=0,$.play())}),c.addEventListener("click",()=>{n.sfxOn&&($.currentTime=0,ee.play())})}),t.addEventListener("click",c=>{n.musicOn=!n.musicOn,p.paused?p.play():p.pause(),c.target.blur()}),i.addEventListener("click",c=>{n.sfxOn=!n.sfxOn,We.forEach(b=>{b.pause(),b.currentTime=0}),c.target.blur()}),y.addEventListener("ended",()=>{console.log("The video has finished playing!"),I()});function Ve(){n.intro.isPlaying&&(y.pause(),p.pause(),I()),p.volume=.6,p.play().catch(c=>console.error("Playback error:",c)),y.src=`${M()}assets/videos/asteroids-migration.mp4`,y.playbackRate=.7,y.play(),S.classList.add("fade-out-overlay"),setTimeout(()=>{F.classList.add("show-skip-intro-instruction")},500),setTimeout(()=>{console.log("next Video"),y.src=`${M()}assets/videos/asteroid-approaching-earth.mp4`},8820),n.intro.isPlaying=!0}function Ne(c){(c.code==="Space"||c.code==="Escape"||c.code==="Enter")&&I()}function W(){x.classList.remove("shake"),je(),T.src.split("/").at(-1)!=="stardust-ambient.mp3"&&(T.src="assets/sounds/stardust-ambient.mp3",p.load()),n.musicLow=!1,p.volume=.3,n.musicOn&&p.play(),_.style.display="none",x.style.display="block",k.style.display="none"}function te(){k.style.backgroundImage=l.player.hasWon?"url('assets/images/result-victory.jpg')":"url('assets/images/result-defeat.jpg')",l.isPaused||l.togglePause(),A.addGame(l),console.log(A),Ge();const c=l.player.hasWon?"assets/sounds/achievement.mp3":"assets/sounds/defeat-background.mp3";T.src=c,p.load(),n.musicOn&&p.play(),s.open&&s.close(),_.style.display="none",x.style.display="none",k.style.display="flex",x.classList.remove("shake"),console.log(l)}function I(){p.volume=.3,T.src="assets/sounds/metropolis-of-the-future.mp3",p.load(),n.musicOn&&p.play(),_.style.display="flex",x.style.display="none",k.style.display="none",m.style.display="none",e.classList.add("show")}function Ge(){const c=document.querySelector("#statistics");console.log("Rendering statistics...");const b=A.games.sort(({timestamp:V},{timestamp:v})=>v-V);Be.textContent=b[0].won?"You won!":"You lost!";const Ke=`
			<table>
				<!-- Table Caption -->
				<caption>How you have done in each level</caption>
				
				<!-- Table Head (Column Headers) -->
				<thead>
					<tr>
						<th scope="col" scope="row">Level</th>
						<td scope="col">✔ Completed</td>
						<td scope="col">⌚ Time</td>
						<td scope="col">🌠 Kills</td>
						<td scope="col">💩 Missed Targets</td>
						<td scope="col">🔫 Shots</td>
						<td scope="col">🎯 Accuracy</td>
						<td scope="col">🩺 Health</td>
					</tr>
				</thead>
				
				<!-- Table Body (Main Data) -->
				<tbody>
					${b.reduce((V,v)=>{const ze=v.won?"✅":"❌",Ye=new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"2-digit",month:"short",year:"2-digit",hour:"2-digit",minute:"2-digit"}).format(v.timestamp),Xe=`${Math.round(v.accuracy*100)}%`,Je=`
				<tr>
					<th scope="row">${v.level}</th>
					<td>${ze}</td>
					<td>${Ye}</td>
					<td>${v.kills}</td>
					<td>${v.escapedTargets}</td>
					<td>${v.shots}</td>
					<td>${Xe}</td>
					<td>${v.health}%</td>
				</tr>	
			`;return V+Je},"")}
				</tbody>
				
				<!-- Table Footer -->
				<!-- <tfoot>
					<tr>
						<th scope="row">Total</th>
						<td colspan="3">Footer data or total calculation here</td>
					</tr>
				</tfoot> -->
			</table>
		`;c.innerHTML=Ke}function je(){requestAnimationFrame(()=>{l&&l.reset()}),requestAnimationFrame(()=>{l.start()})}function Ue(){window.addEventListener("resize",l.resizeScreen),Ce.addEventListener("click",te),qe.addEventListener("click",c=>{l.togglePause(),l.toggleMusicVolume(p);const b=!l.isPaused;console.log("isPaused: ",b),l.isPaused&&l.showModal(R.pause),c.target.blur()}),document.addEventListener("keydown",c=>l.onKeyDown(c)),document.addEventListener("keyup",c=>{l.onKeyUp(c,p)})}};
