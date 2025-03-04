import { api } from './index'

export async function addUserSevice(user){
    try {
        const response = await api.post("/user/", {
          email: user.primaryEmailAddress?.emailAddress,
          username: user.username || `${user.firstName}${user.lastName}`,
          phone: user.primaryPhoneNumber?.phoneNumber || null,
        });

        return response;


      } catch (err) {
        return {"Error creating user": err.message};
      }

}