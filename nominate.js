const form = document.getElementById("nominationForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const year = document.getElementById("year").value;
  const branch = document.getElementById("branch").value;

  if (!username || !year || !branch) {
    alert("Please fill all fields correctly!");
    return;
  }

  try {
    const querySnapshot = await db.collection("nominations")
      .where("username", "==", username)
      .get();

    if (!querySnapshot.empty) {
      alert("❌ Ye banda already nominate ho chuka hai!");
      return;
    }

    await db.collection("nominations").add({
      username,
      year,
      branch,
      votes: 0
    });

    alert("✅ Nomination submitted successfully!");
    form.reset();
  } catch (error) {
    console.error("Error adding nomination: ", error);
    alert("Something went wrong. Check Firebase setup.");
  }
});
