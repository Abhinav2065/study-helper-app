let data = {};

// Fetch the JSON data
fetch('data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData;
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
    // Fallback to empty data or handle error
    data = {};
  });




document.addEventListener('DOMContentLoaded', function() {
    const subject = document.getElementById('subject');
    const subject_ch = document.getElementById('subject_ch');
    const chapter_ch = document.getElementById('chapter_ch');


    form.addEventListener('submit_sub', function(event){
        const subject_input = subject.value;
    

    });
    
    form.addEventListener('submit_ch', function(event){
        const subject_input = subject_ch.value;
        const chapter_input = chapter_ch.value;
  

    });

});