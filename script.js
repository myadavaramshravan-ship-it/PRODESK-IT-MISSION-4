const form = document.getElementById("coverForm");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const skills = document.getElementById("skills").value;

  output.value = "Generating...";

  try {
    const response = await fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        role,
        company,
        skills,
      }),
    });

    const data = await response.json();

    output.value = data.letter;

  } catch (error) {
    output.value = "Error generating cover letter.";
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value);

  copyBtn.innerText = "Copied!";

  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 2000);
});