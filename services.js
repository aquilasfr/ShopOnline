export const fetchCheckoutById = async (id) => {
    const api = `http://localhost:3000/checkout/${id}`;
    const response = await fetch(api);
    const responseJson = await response.json();

    return responseJson.checkout;
}