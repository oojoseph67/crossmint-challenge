import { Megaverse } from "./megaverse";
import { MegaverseV2 } from "./megaverseV2";
import { Cell, GoalData } from "./types";
import goalData from "./json/goal.json";

async function main() {
  const { goal } = goalData as GoalData;
  const candidateId = "36c43289-51ed-40ef-a4e1-aed3c483631a";
  const size = 11;

  const megaverse = new Megaverse(candidateId, size);

  /** CHALLENGE 1 CODE */
  /**
   *
   */

  //   console.log("deleting existing polyanets");
  //   await megaverse.deleteAllPolyanets();
  //   console.log("deletion completed.");

  //   console.log("creating new polyanets");
  //   await megaverse.createXShape();

  //   console.log("X-shape creation completed.");

  /** CHALLENGE 1 CODE */

  /** CHALLENGE 2 CODE */
  /**
   *
   */
  const megaverseV2 = new MegaverseV2(candidateId, goal);

  //   console.log("Fetching goal...");
  //   await megaverseV2.fetchGoal();

  // console.log("Deleting existing Megaverse...");
  // await megaverseV2.deleteMegaverse();

  console.log("Creating new Megaverse...");
  await megaverseV2.createMegaverse();

  // console.log("Megaverse creation completed.");

  /** CHALLENGE 2 CODE */
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
