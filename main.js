const DOC_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSlYpCjrxEikqpTLC3jPb-Nfd4oIcct9KcZeXKbxWhtJ5ssSBerzjaPuLYfeCdfZ4pnhxAVP73mcSdj/pub?output=csv";

async function getBanCount(username) {
  const res = await fetch(DOC_URL);
  const text = await res.text();

  const rows = text
    .trim()
    .split("\n")
    .map((r) => r.split(","));
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

getBanCount("Test Testsson").then(console.warn);
