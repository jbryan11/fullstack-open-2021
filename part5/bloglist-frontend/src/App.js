import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);
  
	return (
		<div>
			{user === null ? (
				<Login data={(data)=>{setUser(data)}}/>
			) : (
				<div>
					<h2>blogs</h2>
          <h4>{user.name} logged in</h4>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
