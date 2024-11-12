var te=o=>{throw TypeError(o)};var se=(o,e,t)=>e.has(o)||te("Cannot "+t);var f=(o,e,t)=>(se(o,e,"read from private field"),t?t.call(o):e.get(o)),S=(o,e,t)=>e.has(o)?te("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);var a=(o,e,t)=>(se(o,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();var u,N,he,le,j,ce,U,de,ue;class Xe{constructor({spaceshipElement:e,gameScreen:t,keys:i,state:s}){S(this,u);this.gameScreen=t,this.element=e,this.keys=i,this.isAccelerating=!1,this.isDecelerating=!1,this.state=s,this.ANGLE_OFFSET=Math.PI/2,this.SPEED=8,this.ROTATIONAL_SPEED=.2,this.health=100,this.position={x:0,y:0},this.velocity={x:0,y:0},this.rotaionalVelocity=0,this.orientation=0,this.thrustOrientation=0,this.dimension={width:e.clientWidth,height:e.clientHeight},this.hasHitTheEdge=!1,this.thrustImageIsSet=!1,this.thrustElement=null}update(){a(this,u,de).call(this),a(this,u,he).call(this),a(this,u,le).call(this),a(this,u,j).call(this),a(this,u,ce).call(this),a(this,u,ue).call(this),a(this,u,U).call(this),a(this,u,N).call(this)}deflectFromObstacle(){this.hasHitTheEdge&&(this.velocity.x=-this.velocity.x,this.velocity.y=-this.velocity.y,this.hasHitTheEdge=!1),a(this,u,j).call(this);const e=.9;this.velocity.x*=e,this.velocity.y*=e,a(this,u,U).call(this),a(this,u,N).call(this)}getCurrentVelocity(){return{x:Math.cos(this.orientation-this.ANGLE_OFFSET),y:Math.sin(this.orientation-this.ANGLE_OFFSET)}}getCollisionShape(){return{x:this.position.x+this.element.clientWidth/2,y:this.position.y+this.element.clientHeight/2,radius:this.element.clientWidth/2}}setPosition(e){if(!e){this.position.x=(gameScreen.clientWidth-this.element.clientWidth||70)/2,this.position.y=(gameScreen.clientHeight-this.element.clientHeight||70)/2;return}this.position.x=e.x,this.position.y=e.y}setVelocity(e){if(!e){this.velocity.x=0,this.velocity.y=0;return}this.velocity.x=e.x,this.velocity.y=e.y}}u=new WeakSet,N=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.element.style.transform=`rotate(${this.orientation}rad)`;const e=this.thrustElement.classList,t="thrusting";this.isAccelerating?e.add(t):e.remove(t)},he=function(){if(!this.thrustImageIsSet){const e=document.createElement("div");this.element.appendChild(e),e.classList.add("thrust-image-container"),this.thrustElement=e,this.thrustImageIsSet=!0}},le=function(){this.isAccelerating=this.keys.arrowUp.pressed,this.isDecelerating=this.keys.arrowDown.pressed},j=function(){let e=0;this.keys.arrowLeft.pressed&&(e=-1),this.keys.arrowRight.pressed&&(e=1);const t=.03;this.rotaionalVelocity+=e*t;const i=.8;this.rotaionalVelocity*=i;const s=this.ROTATIONAL_SPEED;this.rotaionalVelocity>s&&(this.rotaionalVelocity=s),this.rotaionalVelocity<-s&&(this.rotaionalVelocity=-s),this.orientation+=this.rotaionalVelocity},ce=function(){let e=0;this.isAccelerating&&(e=.2);const t=e*Math.cos(this.orientation-this.ANGLE_OFFSET),i=e*Math.sin(this.orientation-this.ANGLE_OFFSET);this.velocity.x+=t,this.velocity.y+=i;const s=.99;this.velocity.x*=s,this.velocity.y*=s,this.isDecelerating&&(this.velocity.x*=.94,this.velocity.y*=.94);const n=Math.sqrt(this.velocity.x**2+this.velocity.y**2),h=this.SPEED;n>h&&(this.velocity.x=this.velocity.x/n*h,this.velocity.y=this.velocity.y/n*h)},U=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},de=function(){this.dimension.width||(this.dimension.width=this.element.clientWidth,this.dimension.height=this.element.clientHeight)},ue=function(){const e=this.position.x<0||this.position.x+this.dimension.width>this.gameScreen.clientWidth||this.position.y<0||this.position.y+this.dimension.height>this.gameScreen.clientHeight;this.hasHitTheEdge=e};var L,pe,me,ye;class Je{constructor({gameScreen:e,spaceshipElement:t,position:i,velocity:s,projectileElement:n,orientation:h,damage:d=40}){S(this,L);this.gameScreen=e,this.spaceshipElement=t,this.element=n,this.width=20,this.damage=d,this.position=i,this.velocity=s,this.orientation=h,this.hasBeenRenderedOnce=!1,this.isOutside=!1,this.hasHitTarget=!1}update(){a(this,L,me).call(this),a(this,L,ye).call(this),a(this,L,pe).call(this)}getCollisionShape(){return{x:this.position.x+this.width/2+20,y:this.position.y+this.width/2+20,radius:this.width/2}}}L=new WeakSet,pe=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.hasBeenRenderedOnce||(this.element.style.width=`${this.width}px`,this.element.style.transform=`
        translateX(${(this.spaceshipElement.clientWidth-this.width)/2}px)
        translateY(${(this.spaceshipElement.clientHeight-this.width)/2}px)
        rotate(${this.orientation}rad)
        translateY(-${(this.spaceshipElement.clientHeight-this.width+30)/2}px)
      `,this.hasBeenRenderedOnce=!0)},me=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},ye=function(){const e=this.gameScreen.getBoundingClientRect(),t=this.element.getBoundingClientRect(),i=t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom;this.isOutside=i};const Qe="health-bar-container",Ze="health-bar",et=.7,ie=.3;var F,ge;class tt{constructor({totalValue:e,currentValue:t=e,parentObject:i}){S(this,F);this.total=e,this.currentValue=t,this.parent=i,this.hasRenderedOnce=!1,this.container=null,this.bar=null}update(e){this.currentValue=e}render(){this.hasRenderedOnce||a(this,F,ge).call(this),this.bar.style.width=`${this.currentValue*100/this.total}%`;const e=ie<this.currentValue/this.total&&this.currentValue/this.total<=et,t=this.currentValue/this.total<=ie;e&&(this.bar.style.backgroundColor="orange"),t&&(this.bar.style.backgroundColor="red")}}F=new WeakSet,ge=function(){this.container=document.createElement("div"),this.bar=document.createElement("div"),this.container.classList.add(Qe),this.bar.classList.add(Ze),this.container.appendChild(this.bar),this.parent.element.appendChild(this.container),this.container.style.width=`${this.parent.width/2}px`,this.container.style.top=`${this.parent.width-15}px`,this.container.style.left=`${this.parent.width/2-this.container.clientWidth/2}px`,this.hasRenderedOnce=!0};var g,fe,Se,we,ve,Ee;class st{constructor({position:e,velocity:t,width:i,element:s,gameScreen:n}){S(this,g);this.gameScreen=n,this.element=s,this.image=s.querySelector("img"),this.position=e,this.velocity=t,this.width=i,this.ROTATIONAL_SPEED=-.04+Math.random()*.08,this.damage=Math.round(i/6),this.orientation=0,this.isOutside=!1,this.hasCollided=!1,this.hasEnteredScreen=!1,this.hasBeenRenderedOnce=!1,this.health=Math.round(i),this.healthBar=new tt({totalValue:this.health,parentObject:this})}update(){a(this,g,Se).call(this),a(this,g,we).call(this),this.hasEnteredScreen&&a(this,g,Ee).call(this),this.hasEnteredScreen||a(this,g,ve).call(this),a(this,g,fe).call(this)}getCollisionShape(){return{x:this.position.x+this.width/2,y:this.position.y+this.width/2,radius:this.width/2}}}g=new WeakSet,fe=function(){this.element.style.left=`${this.position.x}px`,this.element.style.top=`${this.position.y}px`,this.image.style.transform=`rotate(${this.orientation}rad)`,this.hasBeenRenderedOnce||(this.element.style.width=`${this.width}px`,this.image.style.width=`${this.width}px`,this.hasBeenRenderedOnce=!0)},Se=function(){this.orientation+=this.ROTATIONAL_SPEED},we=function(){this.position.x+=this.velocity.x,this.position.y+=this.velocity.y},ve=function(){const e=this.position.x+this.width>=20&&this.position.x<=this.gameScreen.clientWidth-20&&this.position.y+this.width>=20&&this.position.y<=this.gameScreen.clientHeight-20;this.hasEnteredScreen=e},Ee=function(){const e=this.position.x+this.width<20||this.position.x>this.gameScreen.clientWidth-20||this.position.y+this.width<20||this.position.y>this.gameScreen.clientHeight-20;this.isOutside=e};const I={1:{initialAsteroids:3,spawnRate:5e3,speedMultiplier:1,startPosition:null,asteroidSpeed:1.5},2:{initialAsteroids:5,spawnRate:4e3,speedMultiplier:1.2,startPosition:null,asteroidSpeed:2},3:{initialAsteroids:7,spawnRate:3e3,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2.5},4:{initialAsteroids:15,spawnRate:2e3,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2.5},5:{initialAsteroids:20,spawnRate:1500,speedMultiplier:1.5,startPosition:null,asteroidSpeed:2.5},6:{initialAsteroids:25,spawnRate:1e3,speedMultiplier:2,startPosition:null,asteroidSpeed:3}},C={pause:{message:`
      <p class="pause">PAUSE ⏱</p>
      <p>Take a break! You deserve it. 🍵</p>
      <p>Click on CONTINUE, press P or the PAUSE Button</p>
      <p>whenever you are ready.</p>
    `,preset:"pause"},loose:{message:`
      <p class="loose">DEFEAT 💀</p>
      <p>Don't give up! You can do it.</p>
      <p>Wanna try this level again? 💪🏻</p>
    `,preset:"loose"},win:{message:`
      <p class="win">VICTORY ✌🏻</p>
      <p>Good job! Was this level to easy?</p>
      <p>Now let's move on to the next one.</p	>
      <p>Can you handle even more asteroids? ☄</p>
    `,preset:"win"}},it="mrfootwork.github.io",ot="project-asteroids";function D(){return window.location.hostname===it?`/${ot}/`:""}const R=60,nt=Math.round(1e3/R),oe=1e3,ne=1,M=100;var E,A,q,k,r,z,Le,be,xe,K,Te,Ae,Y,ke,Oe,X,J,Q,Pe;class at{constructor({gameScreen:e,state:t,statistics:i}){S(this,r);S(this,E,new Audio("assets/sounds/rocket-thrust.wav"));S(this,A,new Audio("assets/sounds/rock-break.mp3"));S(this,q,new Audio("assets/sounds/metal-clang.mp3"));S(this,k,new Audio("assets/sounds/hit-against-wall.mp3"));this.keys={arrowUp:{pressed:!1},arrowDown:{pressed:!1},arrowLeft:{pressed:!1},arrowRight:{pressed:!1},space:{pressed:!1}},this.gameScreen=e,this.state=t,this.statistics=i,this.currentFrame=0,this.gameloopIntervalID=null,this.wasEnded=!1,this.isPaused=!1,this.currentLevelID=ne,this.currentLevel=I[this.currentLevelID],this.remainingTime=oe,this.spaceship=new Xe({spaceshipElement:a(this,r,Pe).call(this),gameScreen:e,keys:this.keys,state:t}),this.player={health:3,score:0,hasWon:!1,shots:0,shotsHit:0,escapedTargets:0},this.frameAtObstacleHit=null,this.HIT_OBSTACLE_DURATION=40,this.projectiles=[],this.fireRate=R/2,this.lastFired=null,this.asteroids=[],this.baseAsteroidSpeed=1.5,f(this,E).volume=.2,f(this,E).loop=!0,this.gameUI=this.gameScreen.querySelector("#gameUI"),this.uiChildren=this.gameScreen.querySelectorAll("#gameUI>div"),console.log("🚀 ~ Game ~ constructor ~ this.uiChildren:",this.uiChildren)}start(){requestAnimationFrame(()=>{timeDisplay.textContent=this.getFormattedRemainingTime(),a(this,r,J).call(this),a(this,r,Q).call(this),a(this,r,X).call(this)}),this.screenSize={width:this.gameScreen.clientWidth,height:this.gameScreen.clientHeight},this.currentLevel=I[this.currentLevelID],a(this,r,Ae).call(this,this.currentLevel.initialAsteroids),requestAnimationFrame(()=>a(this,r,z).call(this)),console.warn("game at start: ",this)}reset(){clearInterval(this.gameloopIntervalID),this.gameloopIntervalID=null,this.currentFrame=0,this.remainingTime=oe,this.uiChildren.forEach(e=>e.style.backgroundColor="hsla(200, 75%, 50%, 0.2)"),this.player.hasWon||(this.currentLevelID=ne),this.player.hasWon&&I[this.currentLevelID+1]&&++this.currentLevelID,this.currentLevel=I[this.currentLevelID],[this.asteroids,this.projectiles].forEach((e,t)=>{const i=[".asteroid",".projectile"];for(let n=e.length-1;n>=0;n--)e[n].element.remove(),e.splice(n,1);const s=document.querySelectorAll(i[t]);for(const n of s)n.remove()}),this.wasEnded=!1,this.isPaused=!1,this.player.health=M,this.player.score=0,this.player.shots=0,this.player.shotsHit=0,this.player.escapedTargets=0,this.player.hasWon=!1,this.spaceship.setPosition(this.currentLevel.startPosition),this.spaceship.setVelocity(),this.spaceship.orientation=0,this.spaceship.update(),this.fireRate=Math.round(1e3/12),this.lastFired=null,this.baseAsteroidSpeed=this.currentLevel.asteroidSpeed}resizeScreen(){this.screenSize={width:this.gameScreen.clientWidth,height:this.gameScreen.clientHeight}}onKeyDown(e){switch(e.code){case"ArrowUp":case"KeyW":this.keys.arrowUp.pressed=!0,this.state.sfxOn&&!this.isPaused&&f(this,E).play();break;case"ArrowDown":case"KeyS":this.keys.arrowDown.pressed=!0;break;case"ArrowLeft":case"KeyA":this.keys.arrowLeft.pressed=!0;break;case"ArrowRight":case"KeyD":this.keys.arrowRight.pressed=!0;break;case"Space":this.keys.space.pressed=!0;break}}onKeyUp(e,t){switch(e.code){case"ArrowUp":case"KeyW":this.keys.arrowUp.pressed=!1,f(this,E).pause(),f(this,E).currentTime=0;break;case"ArrowDown":case"KeyS":this.keys.arrowDown.pressed=!1;break;case"ArrowLeft":case"KeyA":this.keys.arrowLeft.pressed=!1;break;case"ArrowRight":case"KeyD":this.keys.arrowRight.pressed=!1;break;case"Space":this.keys.space.pressed=!1;break;case"KeyP":case"Pause":this.toggleMusicVolume(t),this.showModal(C.pause),this.togglePause();break}}togglePause(){if(!this.isPaused){a(this,r,K).call(this),this.isPaused=!0;return}if(this.isPaused){a(this,r,z).call(this),this.isPaused=!1,this.state.modal.element.close();return}}toggleMusicVolume(e){this.state.musicLow||(e.volume-=.2),this.state.musicLow&&(e.volume+=.2),this.state.musicLow=!this.state.musicLow}getFormattedRemainingTime(){const e=Math.floor(Math.max(this.remainingTime,0)/60),t=(Math.max(this.remainingTime,0)%60).toString().padStart(2,"0");return`${e}:${t}`}showModal({message:e,preset:t="loose"}){const i=this.state.modal.element,s=i.querySelector("p#modalMessage"),n=i.querySelector("#positive"),h=i.querySelector("#negative");s.innerHTML=e,t==="win"&&(d(),s.classList.add("win"),n.innerHTML="Continue",h.innerHTML="Leave Game"),t==="loose"&&(d(),s.classList.add("loose"),n.innerHTML="Try Again",h.innerHTML="Leave Game"),t==="pause"&&(d(),s.classList.add("pause"),n.innerHTML="Continue",h.innerHTML="Leave Game");function d(){s.classList.value="",n.classList.value="",h.classList.value=""}i.showModal(),n.blur(),h.blur()}}E=new WeakMap,A=new WeakMap,q=new WeakMap,k=new WeakMap,r=new WeakSet,z=function(){this.gameloopIntervalID=setInterval(()=>{if(this.currentFrame++,a(this,r,X).call(this),this.wasEnded){a(this,r,K).call(this),this.player.health<=0?(this.gameScreen.parentElement.style.backgroundColor="black",this.gameScreen.classList.add("shake"),this.showModal(C.loose)):this.showModal(C.win);return}a(this,r,be).call(this)},nt)},Le=function(){re({spaceshipVelocity:this.spaceship.velocity,backgroundElement:backgroundImageSolid,decelerationFactor:.03}),re({spaceshipVelocity:this.spaceship.velocity,backgroundElement:backgroundImageTransparent,decelerationFactor:.02})},be=function(){a(this,r,xe).call(this),this.spaceship.hasHitTheEdge||this.frameAtObstacleHit?a(this,r,Te).call(this):this.spaceship.update(),a(this,r,Le).call(this),a(this,r,Oe).call(this),a(this,r,ke).call(this);e:for(let e=this.projectiles.length-1;e>=0;e--){const t=this.projectiles[e];t:for(let i=this.asteroids.length-1;i>=0;i--){const s=this.asteroids[i];if(ae(t.getCollisionShape(),s.getCollisionShape())){f(this,A).currentTime=0,this.state.sfxOn&&f(this,A).play(),s.health-=t.damage,s.healthBar.update(s.health),s.healthBar.render(),t.hasHitTarget=!0,s.health<=0&&(this.player.score++,a(this,r,J).call(this),s.element.remove(),this.asteroids.splice(i,1));break t}}if(t.hasHitTarget&&this.player.shotsHit++,t.isOutside||t.hasHitTarget){t.element.remove(),this.projectiles.splice(e,1);continue e}t.update()}for(let e=this.asteroids.length-1;e>=0;e--){const t=this.asteroids[e],i=ae(this.spaceship.getCollisionShape(),t.getCollisionShape());if(i){this.player.health&&this.state.sfxOn&&f(this,q).play(),t.hasCollided=!0,this.player.health-=t.damage,a(this,r,Q).call(this);const n=.7,h=.3,d=h<this.player.health/M&&this.player.health/M<=n,w=this.player.health/M<=h;d&&this.uiChildren.forEach(m=>m.style.backgroundColor="hsla(50, 80%, 60%, 0.2)"),w&&this.uiChildren.forEach(m=>m.style.backgroundColor="hsla(0, 75%, 60%, 0.4)")}if(i&&!this.player.health)break;const s=t.hasEnteredScreen&&t.isOutside;if(s&&this.player.escapedTargets++,s||t.hasCollided||t.health<=0||i){t.element.remove(),this.asteroids.splice(e,1);continue}t.update()}},xe=function(){const e=this.remainingTime<=0,t=this.player.health<=0;e&&!t&&(this.player.hasWon=!0),(e||t)&&(this.wasEnded=!0)},K=function(){clearInterval(this.gameloopIntervalID),this.gameloopIntervalID=null},Te=function(){this.frameAtObstacleHit||(this.frameAtObstacleHit=this.currentFrame),this.spaceship.hasHitTheEdge&&this.state.sfxOn&&this.gameScreen.clientWidth&&(f(this,k).volume=.5,f(this,k).play()),this.spaceship.deflectFromObstacle(),this.currentFrame-this.frameAtObstacleHit>=this.HIT_OBSTACLE_DURATION&&(this.frameAtObstacleHit=null)},Ae=function(e){for(let t=0;t<e;t++)a(this,r,Y).call(this)},Y=function(){let e={x:null,y:null};const t=50+Math.floor(Math.random()*150),i=["top","right","bottom","left"][Math.floor(Math.random()*4)];let s=null;const n=.3,h=n*Math.random()-n/2;let d=null;const w=1/1.1;switch(i){case"top":e.x=Math.floor(Math.random()*this.screenSize.width),e.y=0-t,d=(e.x/this.screenSize.width-.5)*w,s=(.5+h+d)*Math.PI;break;case"right":e.x=this.screenSize.width+100,e.y=Math.floor(Math.random()*this.screenSize.height),d=(e.y/this.screenSize.height-.5)*w,s=(1+h+d)*Math.PI;break;case"bottom":e.x=Math.floor(Math.random()*this.screenSize.width),e.y=this.screenSize.height,d=(e.x/this.screenSize.width-.5)*w,s=(1.5+h-d)*Math.PI;break;case"left":e.x=0-t,e.y=Math.floor(Math.random()*this.screenSize.height),d=(e.y/this.screenSize.height-.5)*w,s=(2+h-d)*Math.PI;break}const m=.2+Math.random()*this.baseAsteroidSpeed*this.currentLevel.speedMultiplier,$={x:m*Math.cos(s),y:m*Math.sin(s)},y=document.createElement("div");y.className="asteroid";const p=document.createElement("img");p.src=`${D()}assets/images/asteroid.png`,y.appendChild(p),this.gameScreen.appendChild(y);const x=new st({position:e,velocity:$,width:t,element:y,gameScreen:this.gameScreen});this.asteroids.push(x)},ke=function(){this.currentFrame*R%this.currentLevel.spawnRate===0&&a(this,r,Y).call(this)},Oe=function(){const e=Date.now();if(this.keys.space.pressed&&e-this.lastFired>=this.fireRate){this.lastFired=e;const t=new Audio("assets/sounds/laser-gun-shot.mp3");this.state.sfxOn&&(t.volume=.3,t.play());const i=document.createElement("div");i.className="projectile",this.gameScreen.appendChild(i);const s=new Je({gameScreen:this.gameScreen,position:{x:this.spaceship.position.x,y:this.spaceship.position.y},velocity:{x:8*this.spaceship.getCurrentVelocity().x,y:8*this.spaceship.getCurrentVelocity().y},projectileElement:i,orientation:this.spaceship.orientation,spaceshipElement:this.spaceship.element});this.player.shots++,this.projectiles.push(s)}},X=function(){this.currentFrame%R===0&&(this.remainingTime--,timeDisplay.textContent=this.getFormattedRemainingTime())},J=function(){scoreDisplay.textContent=Math.max(this.player.score,0)},Q=function(){livesDisplay.textContent=Math.max(this.player.health,0)},Pe=function(){const e=document.createElement("div");e.id="spaceship";const t=document.createElement("img");return t.src=`${D()}assets/images/spaceship.png`,e.appendChild(t),this.gameScreen.appendChild(e),e};function ae(o,e){const t=e.x-o.x,i=e.y-o.y;return Math.sqrt(t**2+i**2)<o.radius+e.radius}function re({spaceshipVelocity:o,backgroundElement:e,decelerationFactor:t}){const i=window.getComputedStyle(e),s=i.backgroundPosition.includes(", "),n=s?1:0,[h,d]=s?i.backgroundPosition.split(", ")[n].split(" "):i.backgroundPosition.split(" "),w=parseFloat(h)+o.x*t,m=parseFloat(d)+o.y*t*3;e.style.backgroundPosition=`${s?"50% 50%, ":""}${w}% ${m}%`}var B,He;class rt{constructor(){S(this,B);this.games=[],this.currentRawGame=null}addGame(e){this.currentRawGame=e,a(this,B,He).call(this,e)}}B=new WeakSet,He=function(e){const t={timestamp:new Date,won:e.player.hasWon,level:e.currentLevelID,kills:e.player.score,escapedTargets:e.player.escapedTargets,shotsHit:e.player.shotsHit,shots:e.player.shots,accuracy:e.player.shotsHit/e.player.shots,health:Math.max(e.player.health,0)};this.games.push(t)};window.onload=()=>{var o={intro:{isPlaying:!1},musicOn:!0,sfxOn:!0,musicLow:!1,modal:{element:null}};const e=document.querySelector("#musicControlPanel"),t=document.querySelector(".icon-button.music"),i=document.querySelector(".icon-button.sfx"),s=document.querySelector("#gameModal"),n=s.querySelector("p#modalMessage"),h=s.querySelector("#positive"),d=s.querySelector("#negative");o.modal.element=s;const w=document.querySelector("#introOverlay"),m=document.querySelector("#introScreen"),$=document.querySelector("#skipIntroInstruction"),y=document.querySelector("#videoPlayer");y.muted=!0;const p=document.getElementById("musicPlayer"),x=document.querySelector("#musicPlayer source"),V=document.querySelector("#homeScreen"),Ie=document.querySelector("#startButton"),Me=document.querySelector("#newGameButton");document.querySelector("#settingsButton"),document.querySelector("#exitButton");const T=document.querySelector("#gameScreen");document.querySelector("#backgroundImageSolid"),document.querySelector("#backgroundImageTransparent");const Ce=document.querySelector("#gameOverButton"),Re=document.querySelector("#pauseButton");document.querySelector("#timeDisplay"),document.querySelector("#scoreDisplay"),document.querySelector("#livesDisplay");const O=document.querySelector("#resultScreen"),De=document.querySelector("#resultSubTitle"),Fe=document.querySelector("#toHomeButton"),qe=document.querySelector("#restartButton"),_=document.querySelector("#buttonHoverSoundPlayer"),Be=document.querySelectorAll("button:not(:disabled)"),$e=document.querySelectorAll("audio.sfx"),Z=new Audio("assets/sounds/sci-fi-click.wav");Z.volume=.4;const P=new rt,c=new at({gameScreen:T,state:o,statistics:P});d.addEventListener("click",ee),h.addEventListener("click",()=>{if(n.classList.contains("pause")){c.toggleMusicVolume(p),c.togglePause(),s.close();return}c.reset(),s.close(),c.start()}),m.addEventListener("click",Ve),m.addEventListener("keyup",_e),Ne(),Ie.addEventListener("click",W),Me.addEventListener("click",()=>{c.currentLevelID=1,W()}),Fe.addEventListener("click",H),qe.addEventListener("click",W),Be.forEach(l=>{l.addEventListener("mouseenter",()=>{o.sfxOn&&(_.currentTime=0,_.play())}),l.addEventListener("click",()=>{o.sfxOn&&(_.currentTime=0,Z.play())})}),t.addEventListener("click",l=>{o.musicOn=!o.musicOn,p.paused?p.play():p.pause(),l.target.blur()}),i.addEventListener("click",l=>{o.sfxOn=!o.sfxOn,$e.forEach(b=>{b.pause(),b.currentTime=0}),l.target.blur()}),y.addEventListener("ended",()=>{console.log("The video has finished playing!"),H()});function Ve(){o.intro.isPlaying&&(y.pause(),p.pause(),H()),p.volume=.6,p.play().catch(l=>console.error("Playback error:",l)),y.src=`${D()}assets/videos/asteroids-migration.mp4`,y.playbackRate=.7,y.play(),w.classList.add("fade-out-overlay"),setTimeout(()=>{$.classList.add("show-skip-intro-instruction")},500),setTimeout(()=>{console.log("next Video"),y.src=`${D()}assets/videos/asteroid-approaching-earth.mp4`},8820),o.intro.isPlaying=!0}function _e(l){(l.code==="Space"||l.code==="Escape"||l.code==="Enter")&&H()}function W(){T.classList.remove("shake"),Ge(),x.src.split("/").at(-1)!=="stardust-ambient.mp3"&&(x.src="assets/sounds/stardust-ambient.mp3",p.load()),o.musicLow=!1,p.volume=.3,o.musicOn&&p.play(),V.style.display="none",T.style.display="block",O.style.display="none"}function ee(){O.style.backgroundImage=c.player.hasWon?"url('assets/images/result-victory.jpg')":"url('assets/images/result-defeat.jpg')",c.isPaused||c.togglePause(),P.addGame(c),console.log(P),We();const l=c.player.hasWon?"assets/sounds/achievement.mp3":"assets/sounds/defeat-background.mp3";x.src=l,p.load(),o.musicOn&&p.play(),s.open&&s.close(),V.style.display="none",T.style.display="none",O.style.display="flex",T.classList.remove("shake"),console.log(c)}function H(){p.volume=.3,x.src="assets/sounds/metropolis-of-the-future.mp3",p.load(),o.musicOn&&p.play(),V.style.display="flex",T.style.display="none",O.style.display="none",m.style.display="none",e.classList.add("show")}function We(){const l=document.querySelector("#statistics");console.log("Rendering statistics...");const b=P.games.sort(({timestamp:G},{timestamp:v})=>v-G);De.textContent=b[0].won?"You won!":"You lost!";const je=`
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
					${b.reduce((G,v)=>{const Ue=v.won?"✅":"❌",ze=new Intl.DateTimeFormat("en-GB",{weekday:"short",day:"2-digit",month:"short",year:"2-digit",hour:"2-digit",minute:"2-digit"}).format(v.timestamp),Ke=`${Math.round(v.accuracy*100)}%`,Ye=`
				<tr>
					<th scope="row">${v.level}</th>
					<td>${Ue}</td>
					<td>${ze}</td>
					<td>${v.kills}</td>
					<td>${v.escapedTargets}</td>
					<td>${v.shots}</td>
					<td>${Ke}</td>
					<td>${v.health}%</td>
				</tr>	
			`;return G+Ye},"")}
				</tbody>
				
				<!-- Table Footer -->
				<!-- <tfoot>
					<tr>
						<th scope="row">Total</th>
						<td colspan="3">Footer data or total calculation here</td>
					</tr>
				</tfoot> -->
			</table>
		`;l.innerHTML=je}function Ge(){requestAnimationFrame(()=>{c&&c.reset()}),requestAnimationFrame(()=>{c.start()})}function Ne(){window.addEventListener("resize",c.resizeScreen),Ce.addEventListener("click",ee),Re.addEventListener("click",l=>{c.togglePause(),c.toggleMusicVolume(p);const b=!c.isPaused;console.log("isPaused: ",b),c.isPaused&&c.showModal(C.pause),l.target.blur()}),document.addEventListener("keydown",l=>c.onKeyDown(l)),document.addEventListener("keyup",l=>{c.onKeyUp(l,p)})}};