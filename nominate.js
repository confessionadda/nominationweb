const form = document.getElementById("nominationForm");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const username = document.getElementById("username").value.trim();
  const year = document.getElementById("year").value;
  const branch = document.getElementById("branch").value;

  if (!username || !year || !branch) {
    alert("Please fill all fields correctly!");
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
    return;
  }

  try {
    const querySnapshot = await db.collection("nominations")
      .where("username", "==", username)
      .get();

    if (!querySnapshot.empty) {
      alert("❌ Ye banda already nominate ho chuka hai!");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
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

  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";
});

