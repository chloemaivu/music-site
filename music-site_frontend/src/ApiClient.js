import axios from "axios";

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
    //////////////// MONGO \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

    async createPlaylist(name, description) {
        const id = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/createplaylist`, {id, name, description})
        return response.data
    }

    async appendPlaylist(id, uri) {
        console.log(id, uri)
        const response = await axios.post(`${URL}/appendPlaylist`, {id, uri})
        alert(response.data)
        return response.data    
    }

    async updateUserData(id, username, email, picture) {
        const response = await axios.post(`${URL}/user/${id}/update`, {id, username, email, picture})
        console.log(response)
        return response
    } 

    async updatePassword(id, current, update) {
        const response = await axios.post(`${URL}/user/${id}/password`, {id, current, update})
        console.log(response)
        return response
    }

    /////////////// SPOTIFY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    async search(filter, search) {
        const response = await axios.get(`${spotifyURL}/${search}&${filter}&${limit}`);
        return response
    }

    async getArtist(uri) {
        const response = await axios.get(`${spotifyURL}/artist/${uri}`);
        return response.data.data
    }

    async getAlbum(uri) {
        const response = await axios.get(`${spotifyURL}/album/${uri}`);
        console.log(response.data.data)
        return response.data.data
    }

    async getLyrics(uri) {
        const response = await axios.get(`${spotifyURL}/lyrics/${uri}`);
        return response.data
    }
}