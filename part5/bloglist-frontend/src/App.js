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
	useEffect(() => {
		let loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			setUser(loggedUser);
		}
	}, []);
  function handleLogout(event) {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
	const BlogComponent = () => (
		<div>
			<h2>blogs</h2>
			<h4>{user.name} logged in</h4>
      <button onClick={handleLogout}>Logout</button>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
	return (
		<div>
			{user === null ? (
				<Login
					data={(data) => {
						setUser(data);
					}}
				/>
			) : (
				<BlogComponent/>
			)}
		</div>
	);
};

export default App;
