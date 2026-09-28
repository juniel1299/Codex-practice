  (()=>{
  const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
  const score=document.querySelector('#score'),status=document.querySelector('#status'),start=document.querySelector('#start');
  const color=document.querySelector('#snake-color');
  const N=20,S=canvas.width/N,keys={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
  let snake,dir,next,food,timer,playing=false,turned=false;
  const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
  function placeFood(){
    const empty=[];
    for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(!snake.some(p=>same(p,[x,y])))empty.push([x,y]);
    food=empty[Math.floor(Math.random()*empty.length)];
  }
  function draw(){
    ctx.clearRect(0,0,400,400);
    ctx.strokeStyle='#20363c';
    for(let i=1;i<N;i++){ctx.beginPath();ctx.moveTo(i*S,0);ctx.lineTo(i*S,400);ctx.moveTo(0,i*S);ctx.lineTo(400,i*S);ctx.stroke()}
    if(food){ctx.fillStyle='#ff9e7d';ctx.beginPath();ctx.arc(food[0]*S+S/2,food[1]*S+S/2,7,0,Math.PI*2);ctx.fill()}
    snake.forEach(([x,y],i)=>{ctx.fillStyle=color.value;ctx.fillRect(x*S+1,y*S+1,S-2,S-2);if(!i){ctx.strokeStyle='#fff';ctx.strokeRect(x*S+3,y*S+3,S-6,S-6)}});
  }
  function reset(){snake=[[8,10],[7,10],[6,10]];dir=[1,0];next=dir;turned=false;score.textContent=0;placeFood();draw()}
  function finish(message){clearInterval(timer);playing=false;status.textContent=message;start.textContent='다시 시작'}
  function tick(){
    dir=next;turned=false;
    const head=[snake[0][0]+dir[0],snake[0][1]+dir[1]],eat=same(head,food);
    const body=eat?snake:snake.slice(0,-1);
    if(head.some(v=>v<0||v>=N)||body.some(p=>same(p,head))){finish('게임 종료! 최종 점수: '+score.textContent);return}
    snake.unshift(head);
    if(eat){score.textContent=snake.length-3;placeFood()}else snake.pop();
    draw();if(!food)finish('축하합니다! 보드를 모두 채웠어요.');
  }
  function begin(){clearInterval(timer);reset();playing=true;status.textContent='먹이를 먹고 길게 자라보세요!';start.textContent='다시 시작';timer=setInterval(tick,120)}
  function turn(d){if(!playing||turned||same(d,dir)||d[0]===-dir[0]&&d[1]===-dir[1])return;next=d;turned=true}
  document.addEventListener('keydown',e=>{
    if(e.target.tagName==='INPUT')return;
    const d=keys[e.key]||keys[e.key.toLowerCase()];
    if(d){e.preventDefault();turn(d)}
    if(e.code==='Space'&&e.target.tagName!=='BUTTON'){e.preventDefault();begin()}
  });
  document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>turn(b.dataset.dir.split(',').map(Number))));
  color.addEventListener('input',draw);
  start.addEventListener('click',begin);reset();
  })();
