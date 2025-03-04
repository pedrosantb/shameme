import { api } from './index'

export async function newRoast(goal){

    try{
        const { data } = await api.post('/roast', {
            goal: goal,
        });

        console.log(data);

        return data;
    } catch (err) {
        return {"error": err.message}
    }
}