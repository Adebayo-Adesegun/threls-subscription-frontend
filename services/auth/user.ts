import {useStorage } from "@vueuse/core";
import useAxios from "~/libs/useAxios";

const mockAuthDetails =  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTdiOTFiMmM4OWMwNGUyZjU0Nzc1OCIsImVtYWlsIjoiYWRtaW5AdGhyZWxzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MzI0MzQ5NiwiZXhwIjoxNzQzODQ4Mjk2fQ.ULDXUq18trE7etto6AU40vsUXPIhrlagP6fvaxAHNjI",
    "user": {
        "id": "67e7b91b2c89c04e2f547758",
        "name": "Admin User",
        "email": "admin@threls.com",
        "role": "admin",
        "created_at": "2025-03-29T09:10:51.450Z",
        "updated_at": "2025-03-29T09:10:51.450Z"
    }
};
export const userData = useStorage<any>("user", mockAuthDetails.user);
export const userToken = useStorage<string>("user_token", mockAuthDetails.access_token);

export const forceLogOut = () => {
    console.log('force logout')
}

export const getUserData = async () => {
    try {
       const req =  await useAxios().get("/api/user")
        const data = req.data
        userData.value = data
    } catch (error) {
        console.error(error)
        throw new Error("Failed to get user data")
    }

}