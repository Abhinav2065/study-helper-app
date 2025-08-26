let data = {};

// Fetch the JSON data
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
    loadUI(); // Call your UI loading function after data is loaded
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
    // Fallback to empty data or handle error
    data = {};
    loadUI();
  });
    let studyData = JSON.parse(localStorage.getItem("studyData")) || {};

    function saveData() {
      localStorage.setItem("studyData", JSON.stringify(studyData));
      updateAnalytics();
    }

    function manualSave() {
      saveData();
      alert("Progress saved successfully ✅");
    }

    function toggleSubject(subject) {
      document.getElementById("days-"+subject).classList.toggle("hidden");
    }

    function toggleTimer(subject, day) {
      const key = subject+day;
      if (!studyData[key]) studyData[key] = {time:0, running:false, notes:"", problems:0};
      let entry = studyData[key];
      if (entry.running) {
        entry.running = false;
        entry.lastUpdate = null;
      } else {
        entry.running = true;
        entry.lastUpdate = Date.now();
        runTimer(subject, day);
      }
      saveData();
    }

    function resetTimer(subject, day) {
      const key = subject+day;
      if (!studyData[key]) return;
      studyData[key].time = 0;
      studyData[key].running = false;
      studyData[key].lastUpdate = null;
      document.getElementById(`time-${key}`).innerText = "0h 0m 0s";
      saveData();
    }

    function runTimer(subject, day) {
      const key = subject+day;
      let entry = studyData[key];
      if (entry.running) {
        let now = Date.now();
        entry.time += Math.floor((now - entry.lastUpdate)/1000);
        entry.lastUpdate = now;
        document.getElementById(`time-${key}`).innerText = formatTime(entry.time);
        saveData();
        setTimeout(()=>runTimer(subject, day),1000);
      }
    }

    function formatTime(sec) {
      let h = Math.floor(sec/3600);
      let m = Math.floor((sec%3600)/60);
      let s = sec%60;
      return `${h}h ${m}m ${s}s`;
    }

    function updateNotes(subject, day, val){
      const key = subject+day;
      if (!studyData[key]) studyData[key] = {time:0, running:false, notes:"", problems:0};
      studyData[key].notes = val;
      saveData();
    }

    function updateProblems(subject, day, val){
      const key = subject+day;
      if (!studyData[key]) studyData[key] = {time:0, running:false, notes:"", problems:0};
      studyData[key].problems = parseInt(val)||0;
      saveData();
    }

    function updateAnalytics(){
      let totalTime = 0, totalProblems=0;
      Object.values(studyData).forEach(e=>{
        totalTime += e.time||0;
        totalProblems += e.problems||0;
      });
      document.getElementById("totalTime").innerText = formatTime(totalTime);
      document.getElementById("totalProblems").innerText = totalProblems;
    }

    function loadUI(){
      const subjectsDiv = document.getElementById("subjects");
      for (let subject in data){
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<div class='subject-title' onclick="toggleSubject('${subject}')">${subject}</div><div id='days-${subject}' class='hidden'></div>`;
        subjectsDiv.appendChild(card);

        const daysDiv = card.querySelector(`#days-${subject}`);
        for (let day in data[subject]){
          const key = subject+day;
          let entry = studyData[key] || {time:0, running:false, notes:"", problems:0};
          const dayDiv = document.createElement("div");
          dayDiv.className = "day";
          dayDiv.innerHTML = `
            <strong>Date ${day}:</strong> ${data[subject][day]}<br>
            <span id="time-${key}">${formatTime(entry.time)}</span><br>
            <button onclick="toggleTimer('${subject}', '${day}')">Start/Pause</button>
            <button onclick="resetTimer('${subject}', '${day}')">Reset</button><br>
            Notes:<br><textarea oninput="updateNotes('${subject}','${day}',this.value)">${entry.notes}</textarea><br>
            Practice Problems:<input type='number' value='${entry.problems}' oninput="updateProblems('${subject}','${day}',this.value)">
          `;
          daysDiv.appendChild(dayDiv);
        }
      }
      updateAnalytics();
    }

    function addSubChap() {
        window.location.href = "update.html";
    }

    loadUI();