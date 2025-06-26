const clientId = 'RGHQjqSOSsWznCWqBSzAqMFricITIGwi';
const clientSecret = 'x0zAJHhpAozJqXZO';

let cachedToken = null;
let tokenExpiry = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpiry) return cachedToken;

  const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
  });

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = now + data.expires_in * 1000;
  return cachedToken;
}

export async function getHotelsByCity(cityCode) {
  const token = await getAccessToken();

  const res = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  return data.data;
}

export async function getHotelDetails(hotelId){
  const token = await getAccessToken();

  const res = await fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await res.json();
  console.log(data);
  return data.data ;
}