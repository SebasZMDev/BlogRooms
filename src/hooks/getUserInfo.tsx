import { useUser } from "../App"

export const getUserInfo = () => {
    const { usersList } = useUser();

    const getThisUser = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user;
    }

    const getUsername = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.username;
    }

    const getUserPFP = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.pfp;
    }

    const getUserPosts = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.posts;
    }
    const getUserThisPost = (ID: string, PostID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.posts.find(element=> element.id === PostID);
    }

    return { getThisUser, getUsername, getUserPFP, getUserPosts, getUserThisPost};
}
