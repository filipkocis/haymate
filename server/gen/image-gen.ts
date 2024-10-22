import * as fal from "npm:@fal-ai/serverless-client"
import prompts from "./prompts.json" with { type: "json" };

fal.config({
  credentials: Deno.env.get("FAL_CREDENTIALS")!,
});

async function generateRand(rounds: number, numImages: number) {
  for (let i = 0; i < rounds; i++) {
    const pi = Math.floor(Math.random() * prompts.prompts.length)
    const prompt = prompts.prompts[pi];

    console.log(`${i}/${rounds} Using prompt ${pi}`)
    await genAndStoreImages(prompt, numImages)
  }
}

async function generateSeq() {
  let i = 0;
  for (const prompt of prompts.prompts) {
    console.log("Using prompt " + i++);
    await genAndStoreImages(prompt, 2)
  }
}

async function genAndStoreImages(prompt: string, numImages: number) {
  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt,
      image_size: "portrait_4_3",
      num_inference_steps: 4,
      num_images: numImages,
    },
    logs: true,
    onQueueUpdate: (update: any) => {
      if (update.status === "IN_PROGRESS") {
        update.logs.map((log: any) => log.message).forEach(console.log);
      }
    },
  }) as any;

  for (const image of result.images) {
    await saveImageFromFal(image.url);
  }
}

async function saveImageFromFal(url: string) {
  const name = url.split("/").pop();
  console.log("Saving: " + name);

  try {
    const res = await fetch(url);
    const imageBytes = new Uint8Array(await res.arrayBuffer());
    await Deno.writeFile(`../images/${name}`, imageBytes);
  } catch (e) {
    console.error(e)
  }
}
