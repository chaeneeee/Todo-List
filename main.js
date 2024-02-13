// 유저는 할일을 추가할 수 있어야한다.
// +버튼 누르면 할 일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 , 끝난 아이템만 진행중탭은, 진행중인 아이템만 보인다 전체는 다 보이게 
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 
// 각 할 일에 삭제와 체크버튼이 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.

let taskInput = document.getElementById("task-input");
// console.log(taskInput)
// 잘 들어갔는지 확인하려면 한번씩 colsole.log 로 실행시켜서 보기

let addButton = document.getElementById("add-button");
addButton.addEventListener("click",addTask)
// addEventListener 앞엔 이벤트, 뒤엔 함수 ! 

let taskList = []

function addTask(){
    // console.log("click");
// 클릭 되는지 확인 중간중간씩 확인해봐야함 쭉 짜다가 어디서 막혔는지 발견하기 힘들기때문에 콘솔로 결과 확인하기 
let taskContent = taskInput.value
taskList.push(taskContent)
// console.log (taskList) 확인
render()
}

function render(){
      let resultHtml = "";
    //   밑에 줄을 보면 아 i를 하나하나씩 꺼내서 어떤걸 하려는구나 라고 생각되어야한다.
      for(let i = 0; i < taskList.length; i++){
    resultHtml +=` <div class="task">
    <div> ${taskList[i]}</div>
    <div>
       <button>Check</button>
       <button>Delete</button>
    </div>
 </div>`
//  Html의 생성되는 task 를 아예 가져와서 얘네 자체가 계속 생길 수 있도록
      }
      document.getElementById("task-board").innerHTML = resultHtml


    }
