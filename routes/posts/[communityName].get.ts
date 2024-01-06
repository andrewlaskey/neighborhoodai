import Airtable from "airtable";

export default defineEventHandler(async (event) => {
  const { communityName } = event.context.params;
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appkWnHbz7wdymW3m"
  );
  const posts = [];

  await base("Posts")
    .select({
      maxRecords: 10,
      view: "Grid view",
      filterByFormula: `Community = "${communityName}"`,
      fields: ["Created", "Body", "UserName"],
    })
    .eachPage(function page(records, fetchNextPage) {
      posts.push(
        ...records.map((record) => ({
          id: record.id,
          ...record.fields,
        }))
      );

      fetchNextPage();
    });

  return posts;
});
