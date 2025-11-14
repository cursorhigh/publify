export async function GET() {
  return Response.json([
    {
      title: "Water Supply Notice",
      body: "Water supply will be off from 4–6 PM today.",
    },
    {
      title: "Festival Traffic",
      body: "Heavy traffic expected in city tonight.",
    },
  ]);
}
