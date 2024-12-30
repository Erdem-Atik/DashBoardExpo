const BASE_URL = "https://eliyte-backend.abut.workers.dev";

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
    const response = await fetch(`${BASE_URL}/projects`, requestOptions);
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
    const response = await fetch(`${BASE_URL}/projects`, requestOptions);
    const result = await response.json();
    console.log(result);
    return result.projects || [];
  } catch (error) {
    console.error("Projeleri alma hatası:", error);
    throw error;
  }
}

export async function getSpecProjects(projectId = "") {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Eğer token gerekecekse
  // myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({ _id: projectId });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${BASE_URL}/projects/search`, requestOptions);

    if (!response.ok) {
      const errorMessage = await response.json;
      console.error("API Hata Yanıtı:", errorMessage);
      throw new Error(`Hata: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    console.log("API Yanıtı:", result);
    return result;
  } catch (error) {
    console.error("Proje arama/getirme hatası:", error);
    throw error;
  }
}

/**
 * Proje arama veya detay getirme
 * @param {string} [token] - Authorization token (eklenebilir)
 * @param {string} [projectId] - Proje ID'si (boşsa tüm projeleri getirir)
 * @returns {object} Proje listesi veya detay
 */
export async function searchProjects(projectId = "") {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Eğer token gerekecekse
  // myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = JSON.stringify({});

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${BASE_URL}/projects/search`, requestOptions);

    if (!response.ok) {
      const errorMessage = await response.json;
      console.error("API Hata Yanıtı:", errorMessage);
      throw new Error(`Hata: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    console.log("API Yanıtı:", result);
    return result;
  } catch (error) {
    console.error("Proje arama/getirme hatası:", error);
    throw error;
  }
}

/**
 * Proje günceller
 * @param {string} token - Authorization token
 * @param {string} projectId - Güncellenecek projenin ID'si
 * @param {object} updatedData - Güncelleme verileri
 * @returns {object} API yanıtı
 */
export async function updateProject(projectId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const body = JSON.stringify({}); // Boş bir gövde gönderiliyor

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: body, // Gövde ekleniyor
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BASE_URL}/projects/${projectId}`,
      requestOptions
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("API Hata Yanıtı:", errorMessage);
      throw new Error(`Hata: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    console.log("Güncelleme başarılı:", result);
    return result;
  } catch (error) {
    console.error("Proje güncelleme hatası:", error);
    throw error;
  }
}

/**
 * Proje siler
 * @param {string} token - Authorization token
 * @param {string} projectId - Silinecek projenin ID'si
 * @returns {object} API yanıtı
 */

export async function deleteProject(projectId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE", // Silme için DELETE kullanılır
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      `${BASE_URL}/projects/${projectId}`,
      requestOptions
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      return { success: true }; // Silme işlemi başarılı
    } else {
      const error = await response.json();
      return { success: false, error }; // Hata mesajı döner
    }
  } catch (error) {
    console.error("Proje silme hatası:", error);
    throw error;
  }
}
