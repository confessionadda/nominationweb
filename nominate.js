document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('nominationForm');
  const db = firebase.firestore();

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username');
    const yearInput = document.getElementById('year');
    const branchInput = document.getElementById('branch');

    // Normalize inputs
    const username = usernameInput.value.trim().toLowerCase();
    const year = yearInput.value.trim();
    const branch = branchInput.value.trim();
    const game = 'crushgirls';

    // Basic validation
    if (!username || !year || !branch) {
      alert('⚠️ Please fill in all fields!');
      return;
    }

    // Unique document ID based on game + normalized username
    const docId = `${game}_${username}`;
    const docRef = db.collection('nominations').doc(docId);

    // Prevent multiple rapid clicks
    form.querySelector('button[type="submit"]').disabled = true;

    docRef.get().then((doc) => {
      if (doc.exists) {
        alert('❌ This user has already been nominated for this game.');
        throw new Error('Duplicate nomination');
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
    .then(() => {
      alert('✅ Nomination submitted successfully!');
      form.reset();
    })
    .catch((error) => {
      if (error.message !== 'Duplicate nomination') {
        console.error('❌ Error submitting nomination:', error);
        alert('Something went wrong. Check console and Firestore rules.');
      }
    })
    .finally(() => {
      // Re-enable the submit button
      form.querySelector('button[type="submit"]').disabled = false;
    });
  });
});



