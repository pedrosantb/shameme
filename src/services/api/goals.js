import { api } from './index'

export async function getAllGoals(){

    try {
        const { data } = await api.get('/goal/user/')
        
        if(data.error){
            return {"error": "An error occurred"}
        }

        return data.response;

    } catch (err) {
        return {"error": err.message}
    }
}