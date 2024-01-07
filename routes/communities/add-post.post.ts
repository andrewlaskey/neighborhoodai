import Airtable from "airtable";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appkWnHbz7wdymW3m"
  );

  const communities = await base("Community")
    .select({
      filterByFormula: `{Name} = "${body.communityName}"`,
    })
    .firstPage()
    .then((records) => {
      return records.map((record) => ({
        id: record.id,
        ...record.fields,
      }));
    });

  if (communities.length === 0) {
    return {
      status: 404,
      body: {
        message: "Community not found",
      },
    };
  }

  await base("Posts")
    .create({
      UserName: body.userName,
      Body: body.body,
      Created: new Date().toISOString(),
      Community: [communities.at(0).id],
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
