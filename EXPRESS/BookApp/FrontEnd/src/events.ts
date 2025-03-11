export const fetchBooks = async (genre: string = "") => {
    try {
        const queryParams = genre && genre !== "all" ? `?genre=${genre}` : "";
        const response = await fetch(`http://localhost:3000/api/booksFilters${queryParams}`);

        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }

        return await response.json(); // Return the books data
    } catch (error) {
        console.error("Error fetching books:", error);
        return []; // Return empty array if fetch fails
    }
};
