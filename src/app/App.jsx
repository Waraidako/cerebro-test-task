import { useState, useEffect } from 'react'
import './App.css'
import Post from '../components/post.jsx';

let fetched = false;

export default function App() {
    const [ users, setUsers ] = useState([[]]);
    const [ posts, setPosts ] = useState([[]]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (endpoint) => {
        if (!fetched) {
            try {
                const request = await fetch(endpoint, {})
                const data = await request.json()
                if (endpoint.endsWith('/users')) {
                    const userArray = [];
                    for (let i = 0; i < data.length; i++) {
                        const user = data[i];
                        userArray.push([user.id, user.name, user.username]);
                    }
                    setUsers(userArray);
                } else if (endpoint.endsWith('/posts')) {
                    const postsArray = [];
                    for (let i = 0; i < data.length; i++) {
                        const post = data[i];
                        postsArray.push([post.id, post.userId, post.title, post.body])
                    }
                    setPosts(postsArray);
                } else console.error('Error fetching JSON data: invalid endpoint')
                fetched = true;
            } catch (error) {
                console.error('Error fetching JSON data: ', error);
            } finally {
                setLoading(false);
            }
        }
    }
    useEffect(() => {
        fetchData('https://jsonplaceholder.typicode.com/posts')
        fetchData('https://jsonplaceholder.typicode.com/users')
    });

    if (loading) { return(<div className="flex max-w-180 mx-auto justify-center mt-5">Loading, please wait... 100%</div>); }

    if (!posts || !users) { return(<div className="flex max-w-180 mx-auto justify-center mt-5">Something went wrong</div>); }

    return (
    <div className="h-screen overflow-y-auto scrollbar-stable">
        <div className="max-w-180 flex-col mx-auto">
            {
                posts.map((post, index) => (
                    <Post key={index} user={users[parseInt(post[1]) - 1]} post={post} />
                ))
            }
        </div>
    </div>
    )
}