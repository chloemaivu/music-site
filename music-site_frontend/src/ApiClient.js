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

    ////// ACCOUNT ////////////////////////////////////////////////////////////
    async login(username, password) {
        const response = await axios.post(`${authURL}/login`, {username, password});  
        return response.data     
    }

    async register(username, email, password, repeatpassword, picture) {
        const response = await axios.post(`${authURL}/register`, {username, email, password, repeatpassword, picture});
        return response.data
    }

    async deleteUser(id, createdAt, password) {
        const userID = window.localStorage.currentUserID
        const response = await axios.post(`${authURL}/delete`, {id, userID, createdAt, password})
        return response.data
    }

    /////// USER DATA //////////////////////////////////////////////////////////////////

    async getUserData(id) {
        const response = await axios.get(`${URL}/user/${id}`, {id});
        return response
    }

    async getPlaylists(id) {
        const response = await axios.get(`${URL}/getplaylists/${id}`);
        return response.data
    }
    async getAllPlaylists() {
        const response = await axios.get(`${URL}/getallplaylists`)
        return response.data
    }

    async createPlaylist(name, description, privacy) {
        const id = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/createplaylist`, {id, name, description, privacy})
        return response.data
    }

    async appendPlaylist(id, uri) {
        const response = await axios.post(`${URL}/appendPlaylist`, {id, uri})
        return response.data    
    }

    async highlightPlaylist(id) {
        const userID = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/highlightplaylist/${id}`, {userID})
        return response.data 
    }

    async removeTrack(playlistID, trackURI) {
        const userID = "USERID::" + window.localStorage.currentUserID
        const response = await axios.post(`${URL}/deletetrack/${playlistID}`, {userID, trackURI})
        return response.data
    }

    async deletePlaylist(playlistID) {
        const userID = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/deleteplaylist/${playlistID}`, {userID})
        return response.data
    }

    async updateUserData(id, username, email, picture) {
        const response = await axios.post(`${URL}/user/${id}/update`, {id, username, email, picture})
        return response.data
    } 

    async setBio(id, bio) {
        const response = await axios.post(`${URL}/user/${id}/bio`, {bio})
        return response.data
    }

    async updatePassword(id, current, update) {
        const response = await axios.post(`${URL}/user/${id}/password`, {id, current, update})
        return response.data
    }    

    //////////////// Community Page \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

    async getAllPosts() {
        const response = await axios.get(`${URL}/getallposts/`);
        return response.data
    }

    async createPost(playlistID) {
        const userID = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/createpost/${playlistID}`, {userID})
        return response.data
    }

    async deletePost(id) {
        const response = await axios.post(`${URL}/deletepost/${id}`)
        return response.data
    }

    async postComment(postID, username, comment) {
        const response = await axios.post(`${URL}/post/${postID}/addcomment`, {username, comment})
        return response.data
    }

    async deleteComment(postID, comment) {
        const userID = window.localStorage.currentUserID;
        const response = await axios.post(`${URL}/post/${postID}/deletecomment/`, {userID, comment})
        alert(response.data)
        return response.data
    }

    async likePost(postID) {
        const userID = window.localStorage.currentUserID
        const response = await axios.post(`${URL}/post/${postID}/like`, {userID})
        if (response.data === "Cannot like a post more than once") {
            alert(response.data)
        } else {
            return response.data
        }
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

    async getAlbums(arr) {
        const response = await axios.get(`${spotifyURL}/albums/${arr}`)
        return response.data
    }

    async getTracks(arr) {
        const response = await axios.get(`${spotifyURL}/tracks/${arr}`)
        return response.data
    }

    async getLyrics(uri) {
        const response = await axios.get(`${spotifyURL}/lyrics/${uri}`);
        return response.data
    }
}
