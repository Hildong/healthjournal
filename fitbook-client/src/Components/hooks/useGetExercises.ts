import axios from "axios";

const useGetExercises = async () => {
    const {data} = await axios.get("https://api.api-ninjas.com/v1/exercises?muscle=shoulders", 
    {
        withCredentials: false, 
        headers: { 'X-Api-Key': 'IDmKw6Bhcqu5df3BgCmTfQ==Tvh0lyP5EEm5tdtQ'}
    })
    console.log(data)
    return data
}

export default useGetExercises