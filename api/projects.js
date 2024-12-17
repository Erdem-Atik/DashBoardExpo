const BASE_URL = "https://eliyte-backend.abut.workers.dev/projects";

/**
 * Yeni proje oluşturur
 * @param {string} token - Authorization token
 * @param {object} projectData - Proje verileri
 * @returns {object} API yanıtı
 */
export async function createProject(token, projectData) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(projectData),
    redirect: "follow",
  };

  try {
    const response = await fetch(BASE_URL, requestOptions);
    const result = await response.json();
    return result; // Başarılı mı başarısız mı çağıran kodda kontrol edilir
  } catch (error) {
    console.error("Proje oluşturma hatası:", error);
    throw error;
  }
}

/**
 * Tüm projeleri getirir
 * @param {string} token - Authorization token
 * @returns {array} Proje listesi
 */
export async function getProjects(token) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(BASE_URL, requestOptions);
    const result = await response.json();
    return result.projects || [];
  } catch (error) {
    console.error("Projeleri alma hatası:", error);
    throw error;
  }
}
