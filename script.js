function searchChild(e) {
  e.preventDefault();
  const name = document.getElementById("searchName").value.toLowerCase();
  localStorage.setItem("searchName", name);
  window.location.href = "results.html";
}

function uploadChild(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const location = document.getElementById("location").value;
  const photo = document.getElementById("photo").files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const data = JSON.parse(localStorage.getItem("children") || "[]");
    data.push({
      name, age, location,
      image: reader.result
    });
    localStorage.setItem("children", JSON.stringify(data));
    alert("Child uploaded!");
    window.location.href = "index.html";
  };
  reader.readAsDataURL(photo);
}
if (input === "sowmika") {
  result.textContent = "✅ Child found: Sowmika (ID: 001)";
}
document.getElementById("missingForm").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const name = document.getElementById("fullname").value;
  alert(`Thank you, ${name}. Your report has been submitted.`);
});

if (window.location.pathname.includes("results.html")) {
  const name = localStorage.getItem("searchName");
  const data = JSON.parse(localStorage.getItem("children") || "[]");

  const resultsDiv = document.getElementById("results");
  const results = data.filter(child => child.name.toLowerCase().includes(name));

  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No matching child found.</p>";
  } else {
    results.forEach(child => {
      resultsDiv.innerHTML += `
        <div>
          <img src="${child.image}" alt="Child Image"><br>
          <strong>Name:</strong> ${child.name} <br>
          <strong>Age:</strong> ${child.age} <br>
          <strong>Location:</strong> ${child.location}
        </div><hr>`;
    });
  }
}
