// 유저는 할일을 추가할 수 있어야한다.
// +버튼 누르면 할 일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 누르면 끝난걸로 간주하고 밑줄
// 2. true 면 끝난걸로 간주하고 밑줄 가기
// 3. fasle 면 안끝난거로 간주하고 그대로 
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 , 끝난 아이템만 진행중탭은, 진행중인 아이템만 보인다 전체는 다 보이게 
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 
// 각 할 일에 삭제와 체크버튼이 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let taskInput = document.getElementById("task-input");
// console.log(taskInput)
// 잘 들어갔는지 확인하려면 한번씩 colsole.log 로 실행시켜서 보기
let taskList = [];
let addButton = document.getElementById("add-button");

addButton.addEventListener("click",addTask)
// addEventListener 앞엔 이벤트, 뒤엔 함수 ! 



function addTask(){
    // console.log("click");
// 클릭 되는지 확인 중간중간씩 확인해봐야함 쭉 짜다가 어디서 막혔는지 발견하기 힘들기때문에 콘솔로 결과 확인하기 
let task = { 
  id:randomIDGenerate(),
  taskContent:taskInput.value,
  iscomplete:false,
  //끝났는지 안 끝났는지 묻는 것 기본값은 안 끝난거로 줘보자  
  // 아이템하나를 완료로 두고 싶은 데 몇번째 아이템을 끝내고 싶은지 컴퓨터한테 알려줘야한다
  // 그래서 아이템하나하나에 고유 id를 부여해야함 id는 주민번호같은거 하나하나 다 고유해야함
  // generate random id javascript 인터넷 검색 (나온함수 https://gist.github.com/CoralSilver/afd60a5a423168d0d4a0f996ad021384)
}
  taskList.push(task);
  console.log(taskList);
// console.log (taskList) 확인
render()
}
//  단순 string이 아닌 추가 정보 넣을 땐 객체가 필요하다
// 할일 하나하나 처럼 그 일 하나가 끝났는지 진행중인지 따로따로 보기 위해 객체지항 필요하다
// console.log (taskList)  하면 단순 ARR가 아닌 오브젝트가 들어가 있음
//  객체가 되어버려 값 쓰면 STRING 이 아니고 Object 라는 값만 추가 된다.
// object 출력이 아닌 객체 안에있는 taskContent 만 출력하게 바꿔야한다.
function render(){
      let resultHtml = "";
    //   밑에 줄을 보면 아 i를 하나하나씩 꺼내서 어떤걸 하려는구나 라고 생각되어야한다.
      for(let i = 0; i < taskList.length; i++){
        if(taskList[i].iscomplete==true){
          resultHtml +=` <div class="task task-background">
          <div class="task-done"> ${taskList[i].taskContent}</div>
          <div>
             <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
             <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
          </div>
       </div>`
        }else{ resultHtml +=` <div class="task">
        <div> ${taskList[i].taskContent}</div>
        <div>
           <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
           <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
     </div>`
// esle 는 false라면 
        }

      // render 값 하나 만드는데 만약에 iscomplete가 맞다면 밑줄을 그어주기 위해 calss taskdoen생성
 
// js에서 버튼자체에 클릭했을 때 주는 태그 :"onclick"

//  Html의 생성되는 task 를 아예 가져와서 얘네 자체가 계속 생길 수 있도록
// render 는 보여지는 추가생성되는 할일 
// 원래는 ${taskList[i]} 로 taskList 자체를 뽑아내는거였는데 
// 그 객체안에있는 text만 뽑아내기위해 taskList[i].taskContent 로 바꾸어 taskContent 값만 가져오게 해야한다ㅣ

      }
     
        document.getElementById("task-board").innerHTML = resultHtml
    }

 


 function toggleComplete(id){ 
     for( let i=0; i<taskList.length; i++){
      if(taskList[i].id==id){
        taskList[i].iscomplete= !taskList[i].iscomplete;
        break; 
        // for문이 더이상돌아가지 않게 
        // true flase 왔다갔다 할 수있도록 바꿔줘야함 list를 했다고 체크했다가 다시 풀수 있어야함
        // ! 표는 아니다 (반대값을 들고온다) 만약 taskList[i].iscomplete 값이 true 면 false 가 
        // 돌아오고 false 면 true 값이 돌아온다. 스위치 처럼 쓰인다.
      }
     }
     render();
     console.log(taskList)
    }
    
    function deleteTask(id){
      for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
          taskList.splice(i, 1);
           break; 
        }
      }
       render();
    }
       
      

      

    function randomIDGenerate(){
      return '_' + Math.random().toString(36).substr(2, 9);
    }

    // 버튼에 이벤트를 주는 법2가지 
    // 1.addButton.addEventListener("click",addTask) 처럼 addEvent  를 주는 것 
    // 2.onclick 처럼 버튼 자체에 직접적으로 주는 것 onclick 뒤에 함수를 주는 것