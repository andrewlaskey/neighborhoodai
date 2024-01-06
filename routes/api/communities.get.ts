import Airtable from "airtable";

export default defineEventHandler(async (event) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    "appkWnHbz7wdymW3m"
  );
  const communities = [];

  await base("Community")
    .select({
      maxRecords: 10,
      view: "Grid view",
    })
    .eachPage(function page(records, fetchNextPage) {
      console.log("records", records);
      communities.push(
        ...records.map((record) => ({
          id: record.id,
          ...record.fields,
        }))
      );

      fetchNextPage();
    });

  return communities;
});
