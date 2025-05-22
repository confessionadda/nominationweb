// Game name for this nomination page
const gameName = 'crushgirls'; // <-- change as needed per game

// Firebase setup
const firebaseConfig = {
  // your firebase config here
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form submit
document.getElementById('nominationForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const year = document.getElementById('year').value.trim();
  const branch = document.getElementById('branch').value.trim();

  if (!username || !year || !branch) {
    alert("Please fill all fields.");
    return;
  }

  db.collection('nominations').add({
    username: username,
    year: year,
    branch: branch,
    votes: 0,
    game: gameName, // ✅ VERY IMPORTANT
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert("Nomination submitted!");
    document.getElementById('nominationForm').reset();
  })
  .catch((error) => {
    console.error("Error submitting nomination: ", error);
    alert("Error submitting. Please try again.");
  });
});


