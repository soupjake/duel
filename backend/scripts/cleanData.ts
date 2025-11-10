import fs from "fs"
import path from "path"

type CleanUser = {

}

async function loadAndCleanData(dirPath: string) {
  const files = fs.readdirSync(dirPath).filter((f: string) => f.endsWith(".json"));
  const cleanedData: CleanUser[] = [];

  console.log(`Found ${files.length} files. Processing...`);

  let count = 0

  for (const file of files) {
    if (count > 1) {
      break;
    }
    
    try {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf8");
      const parsed = JSON.parse(raw);

      console.log("weee", parsed)

      
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(`Processed ${cleanedData.length} valid users.`);
  return cleanedData;
}


async function saveToFile(data: CleanUser[], outPath: string) {
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`Saved cleaned data to ${outPath}`);
}

(async function main() {
  const cleanedData = await loadAndCleanData("../../data/mixed");

  await saveToFile(cleanedData, "../../data/cleaned_data.json");
})();
