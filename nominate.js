document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('nominationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim().toLowerCase();
    const year = document.getElementById('year').value.trim();
    const branch = document.getElementById('branch').value.trim();
    const game = 'crushgirls';

    if (!username || !year || !branch) {
      alert('Please fill in all fields!');
      return;
    }

    const docId = `${game}_${username}`;

    const docRef = db.collection('nominations').doc(docId);

    docRef.get().then((doc) => {
      if (doc.exists) {
        alert('❌ This user has already been nominated for this game.');
        return;
      }

      return docRef.set({
        username,
        year,
        branch,
        votes: 0,
        game,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then((res) => {
      if (res !== undefined) {
        alert('✅ Nomination submitted successfully!');
        form.reset();
      }
    })
    .catch((error) => {
      console.error('❌ Error submitting nomination:', error);
      alert('Something went wrong. Check console and Firestore rules.');
    });
  });
});






