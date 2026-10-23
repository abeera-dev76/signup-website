
const form = document.getElementById("signupForm");
const statusText = document.getElementById("status");
const submitButton = form.querySelector('button[type="submit"]');

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwaK6kseK0Gc4Nlo8r0Wt8ymepo61haDKMcPa_ENFFBskhKC_kGYleex-VRgt4DT4QuhA/exec";

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();
  const message = form.elements["message"].value.trim();

  if (!name || !email || !message) {
    statusText.textContent = "Please fill in all fields.";
    return;
  }

  submitButton.disabled = true;
  statusText.textContent = "Submitting...";

  try {
    await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    });

    statusText.textContent =
      "Request sent. Check your Google Sheet to confirm.";
    form.reset();

  } catch (error) {
    console.error("Submission error:", error);
    statusText.textContent =
      "Request failed. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
