import { UserType } from "../App";


const user1: UserType = {
    id: "U" + (100),
    email: 'correo1@gmail.com',
    username: 'Han Solo',
    password: 'contraseñaaaaa',
    userInfo: {
        pfp: "/images/default-pfp.jpg",
        banner: "/images/default-banner.jpg",
        description: "",
        posts: [
            {
                id: 'P100',
                userID: "U100",
                eparent: null,
                content: "This is my first post!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'text'
            }
        ],
        likes: []
    }
};

// Usuario 2: GatosFan
const user2: UserType = {
    id: "U" + (200),
    email: 'correo2@gmail.com',
    username: 'GatosFan',
    password: 'contraseñaaaaa',
    userInfo: {
        pfp: "/images/default-pfp.jpg",
        banner: "/images/default-banner.jpg",
        description: "",
        posts: [
            {
                id: 'P200',
                userID: "U200",
                eparent: null,
                content: "I love cats so much!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'comment'
            },
            {
                id: 'P201',
                userID: "U200",
                eparent: null,
                content: "Here’s a picture of my cat!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'image'
            },
            {
                id: 'P202',
                userID: "U200",
                eparent: null,
                content: "Cats > Dogs, prove me wrong.",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'text'
            }
        ],
        likes: []
    }
};

// Usuario 3: Adolfo
const user3: UserType = {
    id: "U" + (300),
    email: 'correo3@gmail.com',
    username: 'Adolfo',
    password: 'contraseñaaaaa',
    userInfo: {
        pfp: "/images/default-pfp.jpg",
        banner: "/images/default-banner.jpg",
        description: "",
        posts: [
            {
                id: 'P300',
                userID: "U300",
                eparent: null,
                content: "I’m ready for the weekend!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'text'
            },
            {
                id: 'P301',
                userID: "U300",
                eparent: null,
                content: "Anyone up for some hiking?",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'question'
            },
            {
                id: 'P302',
                userID: "U300",
                eparent: null,
                content: "Here’s my favorite hiking spot.",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'image'
            }
        ],
        likes: []
    }
};

// Usuario 4: Vault Boy
const user4: UserType = {
    id: "U" + (400),
    email: 'correo4@gmail.com',
    username: 'Vault Boy',
    password: 'contraseñaaaaa',
    userInfo: {
        pfp: "/images/default-pfp.jpg",
        banner: "/images/default-banner.jpg",
        description: "",
        posts: [
            {
                id: 'P400',
                userID: "U400",
                eparent: null,
                content: "I just finished Fallout again.",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'comment'
            },
            {
                id: 'P401',
                userID: "U400",
                eparent: null,
                content: "Best post-apocalyptic game ever!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'text'
            },
            {
                id: 'P402',
                userID: "U400",
                eparent: null,
                content: "Here's my vault setup!",
                media: null,
                score: [],
                negscore: [],
                repost: [],
                comments: [],
                fecha: '2024-09-18',
                postType: 'image'
            }
        ],
        likes: []
    }
};

// Exportar la lista de usuarios
export const BotsList = [user1, user2, user3, user4];

const Extra = () => {
    return <div></div>;
}

export default Extra;
