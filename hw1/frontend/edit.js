
const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });
// const diaryId = window.diaryId;
const enterButton = document.querySelector("#enter-button");
const cancelButton = document.querySelector("#cancel-button");

  async function getDiarys() {
    const response = await instance.get("/todos");
    return response.data;
  }
async function updateDiary(id, diary) {
    const response = await instance.put(`/todos/${id}`, diary);
    return response.data;
  }

const urlParams = new URLSearchParams(window.location.search);
const diaryId = urlParams.get('id');
function istheone(diary) {
  return diary.id ===  diaryId;
}
async function main() {
 
  
  const diaryData = await getDiarys();
  const editting = diaryData.find(istheone);
  document.getElementById('title').value = editting.title;
  document.getElementById('content').value = editting.content;
  document.getElementById('mood').value = editting.mood;
  document.getElementById('tag').value = editting.tag;

}

main();
  
enterButton.addEventListener("click", async () => {
  const titleInput = document.querySelector("#title");
  const contentInput = document.querySelector("#content");
  const moodselect = document.querySelector("#mood");
  const tagselect = document.querySelector("#tag");
  const title = titleInput.value;
  const content = contentInput.value;
  const mood =  moodselect.value;
  const tag = tagselect.value;

  const newdiary = await updateDiary(diaryId,{title, content, mood, tag});
  window.location.href = `index.html`;
});

cancelButton.addEventListener("click", async () => {
  
  window.location.href = `index.html`;
  
});
