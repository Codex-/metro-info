const API_URL =
  'http://rtt.metroinfo.org.nz/rtt/public/utility/file.aspx?ContentType=SQLXML&Name=JPRoutePositionET&PlatformTag=';

export async function fetchPlatform(platformNumber: number): Promise<string> {
  try {
    const apiResponse = await fetch(API_URL + platformNumber.toString());
    const responseText = await apiResponse.text();

    return responseText;
  } catch (err) {
    return 'Error: ' + err.message;
  }
}
