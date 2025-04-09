export default function Post({ user, post }) {
    if (!post || !user) {
        console.error('No post found');
        return null;
    }
    // User: string[] structure: [0] - id, [1] - name, [2] - nickname
    // Post: string[] structure: [0] - id, [1] - userId, [2] - title, [3] - body
    const name = user[1];
    const nickname = user[2];
    const title = post[2];
    const body = post[3];
    return (
        <div className={"post flex-col justify-items-center m-3 p-0.5 rounded-[7px] backdrop-brightness-150"}>
            <div className="flex-col mt-4 mb-4 ml-3 mr-3">
                <div className="post-author rounded bg-black/15 w-full pl-2">{name} <span className="nickname flex-row items-center">@{nickname}</span></div>
                <div className="post-title pt-2.5 pb-2 text-2xl font-bold font-sans flex justify-center text-center">{title}</div>
                <div className="post-body font-sans pl-2">{body}</div>
            </div>
        </div>
    )
}