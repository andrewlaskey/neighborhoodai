import Airtable from "airtable";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appkWnHbz7wdymW3m"
  );

  const community = await base("Community")
    .find(id)
    .then((record) => {
      return record;
    });

  if (!community) {
    return {
      status: 404,
      body: {
        message: "Community not found",
      },
    };
  }

  return {
    id: community.id,
    ...community.fields,
  };
});
