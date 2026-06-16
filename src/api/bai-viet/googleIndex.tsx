import axios from "axios";
type UpdateIndexResult = {
  success: boolean;
  result?: any; // Adjust type as needed based on your API response
  error?: string;
};
export async function updateGoogleIndex(slug: string): Promise<UpdateIndexResult> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL ?? "https://api.taxinhanh247.pro.vn"}/api/index-url`,
      { slug },
    );
    return { success: true, result: response.data };
  } catch (error) {
    console.log("Error updating Google index:", error);
    return {
      success: false,
      error: "Failed to update Google index",
    };
  }
}
