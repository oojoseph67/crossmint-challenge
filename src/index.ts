import { Megaverse } from "./megaverse";

async function main() {
  const candidateId = "36c43289-51ed-40ef-a4e1-aed3c483631a";
  const size = 11;

  const megaverse = new Megaverse(candidateId, size);

//   console.log("deleting existing polyanets");
//   await megaverse.deleteAllPolyanets();
//   console.log("deletion completed.");

  console.log("creating new polyanets");
  await megaverse.createXShape();

  console.log("X-shape creation completed.");
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
