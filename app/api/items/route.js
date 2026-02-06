import { getDb } from "@/lib/db";

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let query = {};

    if (category && category !== "All") {
      query.category = {
        $regex: new RegExp(`^${escapeRegex(category)}$`, "i"),
      };
    }

    if (search) {
      query.name = { $regex: new RegExp(escapeRegex(search), "i") };
    }

    const items = await db.collection("items").find(query).toArray();
    return Response.json({ items });
  } catch (error) {
    console.error("Items fetch error:", error);
    return Response.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
