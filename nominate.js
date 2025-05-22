// nomination.js

const gameName = 'crushgirls'; // Change as needed

document.getElementById('nominateForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const year = document.getElementById('year').value;
  const branch = document.getElementById('branch').value;

  if (!username || !year || !branch) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // 🔍 Check if this username already exists in nominations for this game
    const snapshot = await db.collection('nominations')
      .where('username', '==', username)
      .where('game', '==', gameName)
      .get();

    if (!snapshot.empty) {
      alert("❌ This username is already nominated for this game.");
      return;
    }

    // ✅ Add new nomination
    await db.collection('nominations').add({
      username,
      year,
      branch,
      votes: 0,
      game: gameName
    });

    alert("✅ Nomination submitted successfully!");
    document.getElementById('nominateForm').reset();
  } catch (error) {
    console.error("Error nominating:", error);
    alert("⚠️ Error submitting nomination. Please try again.");
  }
});




