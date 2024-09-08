import { useUser } from "../App"

export const getUserInfo = () => {
    const { usersList } = useUser();

    const userName = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.username;
    }

    const userPFP = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.pfp;
    }

    const userPosts = (ID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.posts;
    }
    const userThisPost = (ID: string, PostID: string) => {
        const user = usersList?.find(element => element.id === ID);
        return user?.userInfo.posts.find(element=> element.id === PostID);
    }

    return { userName, userPFP, userPosts, userThisPost};
}
