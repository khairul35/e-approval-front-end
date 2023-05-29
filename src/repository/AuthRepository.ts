import Repository from './Repository';

export default {
    signIn(username: string, password: string) {
        return Repository.post(`auth/sign-in`, { username, password });
    },
    signUp(body) {
        return Repository.post(`auth/sign-up`, body);
    },
}
