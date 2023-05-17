export default async people => {
    const URL = `https://swapi.dev/api/people/${people}?format=json`
    let data = {}
    try {
        const response = await fetch(URL);
        if (!response.ok) throw 'Error en la llamada';
        data = await response.json()
    }
    catch (error) { console.log(error) }
    finally { return data }
}