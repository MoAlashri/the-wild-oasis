import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log("id:", id, "newCabin:", newCabin);
  Object.entries(newCabin).forEach(([k, v]) =>
    console.log(k, typeof v, v)
  );
  const hasImagePath =
    typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

  let imageName;
  let imagePath;

  if (hasImagePath) {
    imagePath = newCabin.image;
  } else {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // Create/Edit cabin
  let query = supabase.from("cabins");

  // CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error("Supabase error:", error.message, error.code, error.details);
    throw new Error("Cabin could not be " + (id ? "edited" : "created"));
  }

  if (hasImagePath) return data;

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    if (!id) {
      await supabase.from("cabins").delete().eq("id", data.id);
    }
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded" +
        (!id ? " and the cabin was not created" : "")
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}