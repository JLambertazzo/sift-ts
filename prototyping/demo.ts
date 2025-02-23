import sift from './basic'

enum Role {
    Admin = 'admin',
    Moderator = 'mod',
    Basic = 'basic'
}

type User = {username: string, role: Role}

const sampleUsers: User[] = [{username: 'user1', role: Role.Admin}, {username: 'user2', role: Role.Basic}]

sampleUsers
    .filter(sift({role: Role.Admin}))
    .map((user) => user.role)
//                      ^?





