// Function to get checked values from checkbox groups with details
function getCheckedValuesWithDetails(name, past = false, isInjury = false) {
  return Array.from(
    document.querySelectorAll(`input[name="${name}"]:checked`)
  ).map((checkbox) => {
    const symptom = checkbox.value;
    if (isInjury) {
      // For past injuries, retrieve notes from the textarea
      const notes =
        document.querySelector(`textarea[name="${symptom}_notes"]`)?.value ||
        "";
      return `${symptom} (${notes})`;
    } else {
      const prefix = past ? "past_" : "";
      const frequency =
        document.querySelector(`select[name="${prefix}${symptom}_frequency"]`)
          ?.value || "";
      const location =
        document.querySelector(`input[name="${prefix}${symptom}_location"]`)
          ?.value || "";
      const intensity =
        document.querySelector(`input[name="${prefix}${symptom}_intensity"]`)
          ?.value || "";
      return `${symptom} (Frequency: ${frequency}, Location: ${location}, Intensity: ${intensity})`;
    }
  });
}

async function postClient() {
  const data = {
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    street: document.getElementById("street_address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zip: document.getElementById("zip").value,
    emergency_contact: document.getElementById("emergency_contact_name").value,
    emergency_contact_phone: document.getElementById("emergency_contact_phone")
      .value,
    heard_about_us: document.getElementById("referral").value,
    current_symptoms:
      getCheckedValuesWithDetails("current_symptoms").join(", "),
    past_symptoms: getCheckedValuesWithDetails("past_symptoms", true).join(
      ", "
    ),
    past_injuries: getCheckedValuesWithDetails(
      "past_injuries",
      true,
      true
    ).join(", "),
    past_surgeries: document.getElementById("past_surgeries").value,
    form_data:
      `Current Symptoms: ${getCheckedValuesWithDetails("current_symptoms").join(
        ", "
      )}\n\n` +
      `Past Symptoms: ${getCheckedValuesWithDetails("past_symptoms", true).join(
        ", "
      )}\n\n` +
      `Past Injuries: ${getCheckedValuesWithDetails(
        "past_injuries",
        true,
        true
      ).join(", ")}\n\n` +
      `Past Surgeries: ${document.getElementById("past_surgeries").value}`,
  };

  console.log("data:", JSON.stringify(data));
  // Replace with your API Gateway URL
  const apiUrl =
    "https://rojwnqs7nuz5qzoydq6f3qk3te0ucghe.lambda-url.us-east-2.on.aws/";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    alert("form submitted!");
  }
}

function toggleOtherReferral() {
  var referral = document.getElementById("referral");
  var otherReferral = document.getElementById("otherReferral");

  if (referral.value === "other") {
    otherReferral.classList.remove("hidden");
  } else {
    otherReferral.classList.add("hidden");
  }
}

function toggleSymptomDetails(checkbox, detailsId) {
  var details = document.getElementById(detailsId);
  if (checkbox.checked) {
    details.classList.remove("hidden");
  } else {
    details.classList.add("hidden");
  }
}
