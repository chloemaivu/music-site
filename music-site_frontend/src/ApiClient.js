import axios from "axios";
import { useState } from "react";

// login and registration backend url
const authURL = "http://localhost:3001/auth"

// Mongo general url
const URL = "http://localhost:3001"

// spotify backend api calls url
const spotifyURL = "http://localhost:3001/spotify"

let limit = 5;

export class ApiClient {

    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
    }
    
    authenticatedCall(method, url, data) {
        return axios({
            method,
            url,
            headers: {
                authorization: this.tokenProvider(),
            },
            data,
        }).catch((err) => {
            if (err?.response.status === 401 || err?.response.status === 403 ) {
                this.logoutHandler();
            } else { throw err; }
        });
    }
    //////////////// MONGO \\\\\\\\\\\\\\\\\\\\\\\\\\\
    async login(username, password) {
        const response = await axios.post(`${authURL}/login`, {username, password});  
        return response        
    }

    async register(username, email, password, repeatpassword, picture) {
        const response = await axios.post(`${authURL}/register`, {username, email, password, repeatpassword, picture});
        return response
    }

    async getUserData(id) {
        const response = await axios.get(`${URL}/user/${id}`, {id});
        return response
    }

    async updateUserData(id, username, email, picture) {
        const response = await axios.post(`${URL}/user/${id}/update`, {id, username, email, picture})
        console.log(response)
    } 

    async updatePassword(id, current, update) {
        const response = await axios.post(`${URL}/user/${id}/password`, {id, current, update})
        console.log(response)
    }

    /////////////// SPOTIFY \\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async search(filter, search) {
        const response = await axios.get(`${spotifyURL}/${search}&${filter}&${limit}`);
        return response
    }

    async getArtist(uri) {
        const response = await axios.get(`${spotifyURL}/${uri}`);
        return response.data.data
    }
}