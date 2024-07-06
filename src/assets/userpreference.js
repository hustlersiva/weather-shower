// userPreferences.js
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const addFavoriteCity = async (userId, city) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const favoriteCities = userDoc.data().favoriteCities || [];
      if (!favoriteCities.includes(city)) {
        favoriteCities.push(city);
        await updateDoc(userRef, { favoriteCities });
      }
    }
  } catch (error) {
    console.error("Error adding favorite city:", error);
  }
};

const getFavoriteCities = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data().favoriteCities || [];
    }
    return [];
  } catch (error) {
    console.error("Error retrieving favorite cities:", error);
    return [];
  }
};

export { addFavoriteCity, getFavoriteCities };
