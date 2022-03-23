export interface ReverseGeocoding {
  meta: {
    code: number
  },
  addresses: [
    {
      latitude: number,
      longitude: number,
      country: string,
      countryCode: string,
      countryFlag: string,
      state: string,
      stateCode: string,
      postalCode: string,
      city: string,
    }
  ]
}

const getGeolocation = () => {
  return new Promise<ReverseGeocoding>((resolve, reject) => {

    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords
        const response: ReverseGeocoding = await fetch(`https://api.radar.io/v1/geocode/reverse?coordinates=${latitude},${longitude}`, {
          method: 'GET',
          headers: {
            'Authorization': process.env.REACT_APP_RADAR_KEY as string
          }
        })
        .then(response => response.json())
        resolve(response)
      });
    } else {
      reject({error: true, message:'There was a problem obtaineing data'})
    }
  })
}

export default getGeolocation