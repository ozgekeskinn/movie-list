const BASE_URL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;  // Vite, VITE_ ile başlayan ortam değişkenlerini import.meta.env üzerinden uygulama koduna aktarır.

async function request(endpoint){
    if(!ACCESS_TOKEN){
        throw new Error("TMDB erişim tokenı bulunamadı");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
    });

    if(!response.ok){
        throw new Error(
            `Film verileri alınamadı. Hata Kodu: ${response.status}`
        );
    }

    const data = await response.json();
    return data;
}

export async function getPopularMovies(page=1){
    const searchParameters = new URLSearchParams({
        language: "tr-TR",
        page: page.toString(),
    });

    return request(`/movie/popular?${searchParameters.toString()}`);
}

export async function getMovieDetails(id){
    if(!id){
        throw new Error("Film ID'si bulunamadı");
    }

    const searchParameters = new URLSearchParams({
        language: "tr-TR",
    });

    return request(`/movie/${id}?${searchParameters.toString()}`);
}

export async function searchMovies(query, page = 1) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        throw new Error("Aranacak film adı boş olamaz.");
    }

    const searchParameters = new URLSearchParams({
        query: trimmedQuery,
        language: "tr-TR",
        include_adult: "false",
        page: page.toString(),
    });

    return request(
        `/search/movie?${searchParameters.toString()}`
    );
}

export async function getTopRatedMovies(page = 1) {
    const searchParameters = new URLSearchParams({
        language: "tr-TR",
        page: page.toString(),
    });

    return request(
        `/movie/top_rated?${searchParameters.toString()}`
    );
}

export async function getUpcomingMovies(page = 1) {
    const searchParameters = new URLSearchParams({
        language: "tr-TR",
        page: page.toString(),
        region: "TR",
    });

    return request(
        `/movie/upcoming?${searchParameters.toString()}`
    );
}