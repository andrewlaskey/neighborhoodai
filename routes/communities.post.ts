import Airtable from "airtable";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appkWnHbz7wdymW3m"
  );

  await base("Community")
    .create({
      Name: body.name,
      Description: body.description,
    })
    .then((record) => {
      console.log("record id", record.getId());
    })
    .catch((err) => {
      return {
        status: 500,
        body: {
          message: err.message,
        },
      };
    });
  return { updated: true };
});
