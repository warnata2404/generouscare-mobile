import { supabase } from "@/lib/supabase";

export async function createNotification(
  title: string,
  message: string,
  type: "info" | "success" | "warning",
  category: "donation" | "expense" | "system",
) {
  const { data: authData } = await supabase.auth.getUser();

  console.log("NOTIFICATION USER:", authData.user?.id);

  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: authData.user?.id,
      title,
      message,
      type,
      category,
      is_read: false,
    })
    .select();

  console.log("NOTIFICATION RESULT:", data);

  console.log("NOTIFICATION ERROR:", error);
}
