import useFetch from "../hooks/useFetch";

const Users = () => {
    const { data, error } = useFetch("http://localhost:3001/users");

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div>
            <h3>Users (Hook)</h3>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
