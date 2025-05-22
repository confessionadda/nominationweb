// Nomination form submit handler
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('nominationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const year = document.getElementById('year').value.trim();
    const branch = document.getElementById('branch').value.trim();

    const game = 'crushgirls'; // Change this as needed

    if (!username || !year || !branch) {
      alert('Please fill in all fields!');
      return;
    }

    db.collection('nominations').add({
      username: username,
      year: year,
      branch: branch,
      votes: 0,
      game: game,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      alert('Nomination submitted successfully!');
      form.reset();
    })
    .catch((error) => {
      console.error('Error submitting nomination:', error);
      alert('Something went wrong. Please try again.');
    });
  });
});



