const DOC_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlYpCjrxEikqpTLC3jPb-Nfd4oIcct9KcZeXKbxWhtJ5ssSBerzjaPuLYfeCdfZ4pnhxAVP73mcSdj/pub?output=csv";

async function getBanCount(username) {
  const res = await fetch(DOC_URL);
  const text = await res.text();

  const rows = text
    .trim()
    .split("\n")
    .map((r) => r.split(","));
  console.log(rows);
  const headers = rows[0];
  const usernameIndex = headers.indexOf("Username");
  const bansIndex = headers.indexOf("Bans");

  const dataRow = rows.find(
    (r) => r[usernameIndex]?.toLowerCase() === username.toLowerCase(),
  );

  if (dataRow) {
    const bans = parseInt(dataRow[bansIndex], 10);
    console.log(`${username} has ${bans} bans`);
    return bans;
  } else {
    console.log(`${username} not found.`);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");
  const result = document.getElementById("result");
  console.log("YO");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const output = await getBanCount(username);

    result.textContent = output;
  });
});
