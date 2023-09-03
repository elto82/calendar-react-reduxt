import calendarApi from "../../src/apis/calendarApi";

describe("Test calendarApi", () => {
  test("Debe tener la configuracion por defecto", () => {
    // console.log(calendarApi);
    // console.log(process.env);
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Debe tener el x-token en el header de todas las peticiones", async () => {
    const token = "ABC123";
    localStorage.setItem("token", token);

    const resp = await calendarApi.get("/auth");

    expect(resp.config.headers["x-token"]).toBe(token);
  });
});
